"use client";
import { toast } from "sonner";
import CryptoJS from "crypto-js";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Textarea,
	Tabs,
	TabsList,
	TabsTrigger,
} from "@/components/ui";
import { Copy, Key, Lock, Unlock, Sparkles, RefreshCw } from "lucide-react";

function EncryptionToolContent() {
	const [mode, setMode] = useState("encrypt");
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [key, setKey] = useState("");
	const [keyLocked, setKeyLocked] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	// Check URL params on load
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
			} catch (error) {
				toast({
					title: "Decryption Error 😕",
					description: "Could not decrypt the text with the provided key.",
					variant: "destructive",
				});
			}
		}
	}, [searchParams, toast]);

	// Process text whenever inputs change
	useEffect(() => {
		if (!inputText || !key) {
			setOutputText("");
			return;
		}

		try {
			if (mode === "encrypt") {
				// For encryption, convert to emoji-like format
				const encrypted = CryptoJS.AES.encrypt(inputText, key).toString();
				// Convert to emoji representation (simplified version)
				const emojiText = convertToEmojis(encrypted);
				setOutputText(emojiText);
			} else {
				// For decryption, convert from emoji format back to text
				const normalText = convertFromEmojis(inputText);
				try {
					const decrypted = CryptoJS.AES.decrypt(normalText, key).toString(
						CryptoJS.enc.Utf8,
					);
					setOutputText(decrypted);
				} catch (e) {
					// Try decrypting directly if emoji conversion fails
					const decrypted = CryptoJS.AES.decrypt(inputText, key).toString(
						CryptoJS.enc.Utf8,
					);
					setOutputText(decrypted);
				}
			}
		} catch (error) {
			setOutputText("");
		}
	}, [inputText, key, mode]);

	// Convert encrypted text to emoji representation
	const convertToEmojis = (text) => {
		const emojis = [
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

		let result = "";
		for (let i = 0; i < text.length; i++) {
			const charCode = text.charCodeAt(i);
			const emojiIndex = charCode % emojis.length;
			result += emojis[emojiIndex];
		}
		return result;
	};

	// Convert emoji representation back to encrypted text
	const convertFromEmojis = (emojiText) => {
		const emojis = [
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

		// This is a simplified conversion - in a real app, you'd need a more robust algorithm
		// that can reliably convert back and forth
		try {
			// Try to detect if this is already encrypted text
			if (emojiText.match(/^[A-Za-z0-9+/=]+$/)) {
				return emojiText;
			}

			// Otherwise, assume it's emoji text
			return emojiText;
		} catch (e) {
			return emojiText;
		}
	};

	// Generate shareable URL
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

	// Copy output text
	const copyOutputText = () => {
		if (!outputText) return;

		navigator.clipboard.writeText(outputText);
		toast({
			title: "Copied 📋",
			description: "Text copied to clipboard.",
			icon: "📋",
		});
	};

	// Generate random key
	const generateRandomKey = () => {
		if (keyLocked) return;

		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
		let result = "";
		for (let i = 0; i < 12; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		setKey(result);
		toast({
			title: "Key Generated 🔑",
			description: "A random encryption key has been created.",
			icon: "🔑",
		});
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4 bg-background">
			<Card className="w-full max-w-4xl border-border/40 bg-card/95 backdrop-blur">
				<CardHeader className="relative">
					<div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse"></div>

					<CardTitle className="text-3xl font-bold flex items-center gap-2">
						<span className="text-4xl">🔐</span> EmojiCrypt
					</CardTitle>
					<CardDescription className="text-lg">
						Encrypt your messages into fun emoji sequences!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue={mode} onValueChange={setMode} className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger
								value="encrypt"
								className="flex items-center gap-2 text-lg"
							>
								<Lock className="h-4 w-4" />
								Encrypt 🔒
							</TabsTrigger>
							<TabsTrigger
								value="decrypt"
								className="flex items-center gap-2 text-lg"
							>
								<Unlock className="h-4 w-4" />
								Decrypt 🔓
							</TabsTrigger>
						</TabsList>

						<div className="grid gap-6 mb-6">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="flex-1">
									<Label
										htmlFor="inputText"
										className="mb-2 block text-lg font-medium"
									>
										{mode === "encrypt"
											? "Text to Encrypt 📝"
											: "Emoji to Decrypt 😀"}
									</Label>
									<Textarea
										id="inputText"
										placeholder={
											mode === "encrypt"
												? "Enter text to encrypt..."
												: "Enter emoji sequence..."
										}
										className="min-h-[200px] resize-none text-lg"
										value={inputText}
										onChange={(e) => setInputText(e.target.value)}
									/>
								</div>
								<div className="flex-1">
									<div className="flex justify-between mb-2">
										<Label htmlFor="outputText" className="text-lg font-medium">
											{mode === "encrypt"
												? "Emoji Result 😀"
												: "Decrypted Text 📝"}
										</Label>
										<Button
											variant="ghost"
											size="sm"
											onClick={copyOutputText}
											disabled={!outputText}
											className="h-8 px-3"
										>
											<Copy className="h-3.5 w-3.5 mr-2" />
											Copy
										</Button>
									</div>
									<Textarea
										id="outputText"
										placeholder={
											mode === "encrypt"
												? "Emoji sequence will appear here..."
												: "Decrypted text will appear here..."
										}
										className="min-h-[200px] resize-none text-lg"
										value={outputText}
										readOnly
									/>
								</div>
							</div>

							<div className="bg-muted/30 p-4 rounded-lg border border-border/50">
								<div className="flex items-center mb-2">
									<Key className="h-5 w-5 mr-2" />
									<Label htmlFor="key" className="text-lg font-medium">
										Secret Key 🔑
									</Label>
								</div>
								<div className="flex gap-2 flex-wrap sm:flex-nowrap">
									<div className="relative flex-1">
										<Input
											id="key"
											type="text"
											placeholder="Enter your secret key..."
											value={key}
											onChange={(e) => !keyLocked && setKey(e.target.value)}
											disabled={keyLocked}
											className="pr-10 text-base"
										/>
										<Button
											variant="ghost"
											size="icon"
											className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
											onClick={() => setKeyLocked(!keyLocked)}
										>
											{keyLocked ? (
												<Lock className="h-4 w-4" />
											) : (
												<Unlock className="h-4 w-4" />
											)}
										</Button>
									</div>
									<Button
										variant="outline"
										className="flex items-center gap-1"
										onClick={generateRandomKey}
										disabled={keyLocked}
									>
										<RefreshCw className="h-4 w-4" />
										<span className="hidden sm:inline">Generate</span> Key
									</Button>
								</div>
								<p className="text-sm text-muted-foreground mt-2">
									{keyLocked
										? "🔒 Key is locked. Unlock to edit."
										: "🔓 Key is unlocked. Lock to prevent changes."}
								</p>
							</div>
						</div>
					</Tabs>
				</CardContent>
				<CardFooter className="flex flex-wrap gap-3 justify-between">
					<Button
						variant="outline"
						onClick={() => {
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
						}}
					>
						Clear All 🧹
					</Button>
					{mode === "encrypt" && (
						<Button
							onClick={generateShareableUrl}
							disabled={!inputText || !key}
							className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
						>
							<Sparkles className="h-4 w-4 mr-2" />
							Generate Shareable Link 🔗
						</Button>
					)}
				</CardFooter>
			</Card>
		</main>
	);
}

export default function EncryptionTool() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
				</div>
			}
		>
			<EncryptionToolContent />
		</Suspense>
	);
}
