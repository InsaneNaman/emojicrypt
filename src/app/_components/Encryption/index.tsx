// app/components/encryption/EncryptionToolContent.tsx
"use client";

import { useState, useEffect } from "react";
import { useQueryState } from "@/lib/nuqs";
import CryptoJS from "crypto-js";
import { toast } from "sonner";

import EncryptionToolUI from "./EncryptionToolUI";
import {
	convertToEmojis,
	convertFromEmojis,
	generateRandomKeyString,
} from "./index.utils";

export default function EncryptionToolContent() {
	const [mode, setMode] = useQueryState("mode", {
		defaultValue: "encrypt",
		clearOnDefault: true,
	});
	const [encryptedText, setEncryptedText] = useQueryState("text");
	const [urlKey, setUrlKey] = useQueryState("key");
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [key, setKey] = useState("");
	const [keyLocked, setKeyLocked] = useState(false);

	useEffect(() => {
		if (encryptedText && urlKey) {
			setMode("decrypt");
			setInputText(encryptedText);
			setKey(urlKey);
			try {
				const decrypted = CryptoJS.AES.decrypt(encryptedText, urlKey).toString(
					CryptoJS.enc.Utf8,
				);
				setOutputText(decrypted);
			} catch {
				toast.error("Decryption Error", {
					description: "Could not decrypt the text with the provided key.",
				});
			}
		}
	}, [encryptedText, urlKey, setMode]);

	useEffect(() => {
		if (!inputText || !key) {
			setOutputText("");
			return;
		}

		try {
			if (mode === "encrypt") {
				const encrypted = CryptoJS.AES.encrypt(inputText, key).toString();
				const emojiText = convertToEmojis(encrypted);
				setOutputText(emojiText);
			} else {
				const normalText = convertFromEmojis(inputText);
				const decrypted = CryptoJS.AES.decrypt(normalText, key).toString(
					CryptoJS.enc.Utf8,
				);
				setOutputText(decrypted || inputText);
			}
		} catch {
			setOutputText("");
		}
	}, [inputText, key, mode]);

	const generateShareableUrl = () => {
		if (!inputText || !key) {
			toast.error("Missing Information", {
				description: "Please provide both text and key to generate a URL.",
			});
			return;
		}

		const encrypted = CryptoJS.AES.encrypt(inputText, key).toString();
		setEncryptedText(encrypted);
		setUrlKey(key);
		setMode("decrypt");

		toast.success("Shareable URL has been created.", {
			description: "Shareable URL has been created.",
		});
	};

	const copyOutputText = () => {
		if (!outputText) return;
		navigator.clipboard.writeText(outputText);
		toast.success("Copied", {
			description: "Text copied to clipboard.",
		});
	};

	const generateRandomKey = () => {
		if (keyLocked) return;
		const generated = generateRandomKeyString();
		setKey(generated);
		toast.success("Key Generated", {
			description: `A random encryption key "${key}" has been created.`,
		});
	};

	const clearAll = () => {
		if (!keyLocked) {
			setInputText("");
			setOutputText("");
			setKey("");
			toast.success("All Cleared", {
				description: "All fields have been cleared.",
			});
		} else {
			toast.error("Key Locked", {
				description: "Unlock the key first to clear all fields.",
			});
		}
	};

	return (
		<EncryptionToolUI
			mode={mode}
			setMode={setMode}
			inputText={inputText}
			setInputText={setInputText}
			outputText={outputText}
			keyValue={key}
			setKeyValue={setKey}
			keyLocked={keyLocked}
			setKeyLocked={setKeyLocked}
			onGenerateKey={generateRandomKey}
			onCopyOutput={copyOutputText}
			onGenerateURL={generateShareableUrl}
			onClearAll={clearAll}
		/>
	);
}
