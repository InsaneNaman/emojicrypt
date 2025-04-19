import { toast } from "sonner";
import { emojiList } from "./index.constants";

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

type CopyTextOptions = {
	text: string;
	successMessage?: string;
	description?: string;
	copyToClipboard: (text: string) => void;
};

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
