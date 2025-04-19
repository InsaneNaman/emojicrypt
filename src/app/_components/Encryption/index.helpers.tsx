// index.helpers.ts
import { toast } from "sonner";
import CryptoJS from "crypto-js";
import { base64ToEmojiMap, emojiToBase64Map } from "./index.constants";

// Types
type CopyTextOptions = {
	text: string;
	successMessage?: string;
	description?: string;
	copyToClipboard: (text: string) => void;
};

type GenerateKeyOptions = {
	keyLocked: boolean;
	setKey: (key: string) => void;
};

type ClearAllOptions = {
	keyLocked: boolean;
	setInputText: (text: string) => void;
	setOutputText: (text: string) => void;
	setKey: (key: string) => void;
};

type GenerateShareableUrlOptions = {
	inputText: string;
	key: string;
	setEncryptedText: (text: string) => void;
	setUrlKey: (key: string) => void;
	setMode: (mode: string) => void;
	copyToClipboard: (text: string) => void;
	currentUrl: string;
};

// ✅ Reversible Encoding
export const convertToEmojis = (base64: string): string => {
	return [...base64].map((char) => base64ToEmojiMap[char] || char).join("");
};

export const convertFromEmojis = (emojiStr: string): string => {
	return [...emojiStr]
		.map((emoji) => emojiToBase64Map[emoji] || emoji)
		.join("");
};

// ✅ Key Generator
export function generateRandomKeyString(length = 12): string {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

// ✅ Copy Handler
export const copyOutputText = ({
	text,
	successMessage = "Copied",
	description = "Text copied to clipboard.",
	copyToClipboard,
}: CopyTextOptions): void => {
	if (!text) {
		toast.error("No text to copy", {
			description: "Please enter some text to copy.",
		});
		return;
	}

	copyToClipboard(text);
	toast.success(successMessage, { description });
};

// ✅ Key Generator Handler
export const generateRandomKey = ({
	keyLocked,
	setKey,
}: GenerateKeyOptions): void => {
	if (keyLocked) {
		toast.error("Key Locked", {
			description: "Unlock the key first to generate a new one.",
		});
		return;
	}

	const generated = generateRandomKeyString();
	setKey(generated);
	toast.success("Key Generated", {
		description: `A random encryption key "${generated}" has been created.`,
	});
};

// ✅ Clear Handler
export const clearAll = ({
	keyLocked,
	setInputText,
	setOutputText,
	setKey,
}: ClearAllOptions): void => {
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

// ✅ URL Generator
export const generateShareableUrl = ({
	inputText,
	key,
	setEncryptedText,
	setUrlKey,
	setMode,
	copyToClipboard,
	currentUrl,
}: GenerateShareableUrlOptions): void => {
	if (!inputText || !key || !currentUrl) {
		toast.error("Missing Information", {
			description: "Please provide both text and key to generate a URL.",
		});
		return;
	}

	const encrypted = CryptoJS.AES.encrypt(inputText, key).toString();
	const emojiEncrypted = convertToEmojis(encrypted);
	const fullUrl = `${currentUrl}?text=${encodeURIComponent(emojiEncrypted)}&key=${encodeURIComponent(key)}&mode=decrypt`;

	setEncryptedText(emojiEncrypted);
	setUrlKey(key);
	setMode("decrypt");

	toast.success("Shareable URL has been created.", {
		description: "Copied encrypted URL to clipboard.",
	});
	copyToClipboard(fullUrl);
};

// ✅ Decryption Utility
export function decryptEmojiText(
	emojiEncrypted: string,
	key: string,
): string | null {
	try {
		const base64Text = convertFromEmojis(emojiEncrypted);
		const bytes = CryptoJS.AES.decrypt(base64Text, key);
		const decrypted = bytes.toString(CryptoJS.enc.Utf8);
		return decrypted || null;
	} catch (e) {
		console.error("Failed to decrypt:", e);
		return null;
	}
}
