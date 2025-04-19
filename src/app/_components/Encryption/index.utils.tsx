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

export function generateRandomKeyString(length: number = 12): string {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

const emojiList = [
	"😀",
	"😁",
	"😂",
	"🤣",
	"😃",
	"😄",
	"😅",
	"😆",
	"😉",
	"😊",
	"😋",
	"😎",
	"😍",
	"😘",
	"🥰",
	"😗",
	"😙",
	"😚",
	"🙂",
	"🤗",
	"🤩",
	"🤔",
	"🤨",
	"😐",
	"😑",
	"😶",
	"🙄",
	"😏",
	"😣",
	"😥",
	"😮",
	"🤐",
	"😯",
	"😪",
	"😫",
	"🥱",
	"😴",
	"😌",
	"😛",
	"😜",
	"😝",
	"🤤",
	"😒",
	"😓",
	"😔",
	"😕",
	"🙃",
	"🤑",
	"😲",
	"☹️",
	"🙁",
	"😖",
	"😞",
	"😟",
	"😤",
	"😢",
	"😭",
	"😦",
	"😧",
	"😨",
	"😩",
	"🤯",
	"😬",
	"😰",
	"😱",
	"🥵",
	"🥶",
	"😳",
	"🤪",
	"😵",
	"🥴",
	"😠",
	"😡",
	"🤬",
	"😷",
	"🤒",
	"🤕",
	"🤢",
	"🤮",
	"🤧",
	"😇",
	"🥳",
	"🥺",
	"🤠",
	"🤡",
	"🤥",
	"🤫",
	"🤭",
	"🧐",
	"🤓",
	"😈",
	"👿",
	"👹",
	"👺",
	"💀",
	"👻",
	"👽",
	"🤖",
	"💩",
	"😺",
];
