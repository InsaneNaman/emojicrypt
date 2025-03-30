// app/components/encryption/EncryptionToolContent.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import { toast } from "sonner";

import EncryptionToolUI from "./EncryptionToolUI";
import {
	convertToEmojis,
	convertFromEmojis,
	generateRandomKeyString,
} from "./index.utils";

export default function EncryptionToolContent() {
	const [mode, setMode] = useState("encrypt");
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [key, setKey] = useState("");
	const [keyLocked, setKeyLocked] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const encryptedText = searchParams.get("text");
		const urlKey = searchParams.get("key");

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
				toast({
					title: "Decryption Error 😕",
					description: "Could not decrypt the text with the provided key.",
					variant: "destructive",
				});
			}
		}
	}, [searchParams]);

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
			toast({
				title: "Missing Information 🧩",
				description: "Please provide both text and key to generate a URL.",
				variant: "destructive",
			});
			return;
		}

		const encrypted = CryptoJS.AES.encrypt(inputText, key).toString();
		const url = `${window.location.origin}?text=${encodeURIComponent(encrypted)}&key=${encodeURIComponent(key)}`;
		navigator.clipboard.writeText(url);

		toast({
			title: "URL Copied 🔗",
			description: "Shareable URL has been copied to clipboard.",
			icon: "🔗",
		});
	};

	const copyOutputText = () => {
		if (!outputText) return;
		navigator.clipboard.writeText(outputText);
		toast({
			title: "Copied 📋",
			description: "Text copied to clipboard.",
			icon: "📋",
		});
	};

	const generateRandomKey = () => {
		if (keyLocked) return;
		const generated = generateRandomKeyString();
		setKey(generated);
		toast({
			title: "Key Generated 🔑",
			description: "A random encryption key has been created.",
			icon: "🔑",
		});
	};

	const clearAll = () => {
		if (!keyLocked) {
			setInputText("");
			setOutputText("");
			setKey("");
		} else {
			toast({
				title: "Key Locked 🔒",
				description: "Unlock the key first to clear all fields.",
				variant: "destructive",
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
