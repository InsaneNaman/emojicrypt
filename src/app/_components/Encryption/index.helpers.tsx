import { toast } from "sonner";
import { emojiList } from "./index.constants";

//types
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

export function convertToEmojis(text: string): string {
	const emojis = emojiList;
	let result = "";
	for (let i = 0; i < text.length; i++) {
		const charCode = text.charCodeAt(i);
		const emojiIndex = charCode % emojis.length;
		result += emojis[emojiIndex];
	}
	return result;
}

export function convertFromEmojis(emojiText: string): string {
	if (emojiText.match(/^[A-Za-z0-9+/=]+$/)) return emojiText;
	return emojiText; // Placeholder for actual reverse mapping logic
}

export function generateRandomKeyString(length = 12): string {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

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
	toast.success(successMessage, {
		description,
	});
};

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
	setEncryptedText(encrypted);
	setUrlKey(key);
	setMode("decrypt");
	toast.success("Shareable URL has been created.", {
		description: "Shareable URL has been created.",
	});
	copyToClipboard(encrypted);
};
