"use client";
import { useState, useEffect } from "react";
import { useQueryState } from "@/lib/nuqs";
import CryptoJS from "crypto-js";
import { toast } from "sonner";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Tabs,
	TabsList,
	TabsTrigger,
	HyperText,
	TextAnimate,
} from "@/components/ui";
import { Sparkles, Lock, Unlock } from "lucide-react";
import { TextAndKeyInput } from "./index.components";
import {
	convertToEmojis,
	convertFromEmojis,
	generateRandomKey,
	clearAll,
	generateShareableUrl,
} from "./index.helpers";
import { useCopyToClipboard } from "usehooks-ts";
import { useCurrentUrl } from "@/hooks/useCurrentURL";
type Mode = "encrypt" | "decrypt";

export default function EncryptionTool() {
	const [mode, setMode] = useQueryState("mode", {
		defaultValue: "encrypt" as Mode,
		clearOnDefault: true,
	});

	const [_, setTextToCopy] = useCopyToClipboard();

	const [encryptedText, setEncryptedText] = useQueryState("text");
	const [urlKey, setUrlKey] = useQueryState("key");
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [key, setKey] = useState("");
	const [keyLocked, setKeyLocked] = useState(false);
	const currentUrl = useCurrentUrl();

	// Check if user is allowed to interact
	const isKeyReady = keyLocked && key.trim().length > 0;

	useEffect(() => {
		if (encryptedText && urlKey) {
			setMode("decrypt");
			setInputText(encryptedText);
			setKey(urlKey);
			setKeyLocked(true); // ✅ Auto lock the key when pre-filled via URL

			try {
				const base64 = convertFromEmojis(encryptedText);
				const decrypted = CryptoJS.AES.decrypt(base64, urlKey).toString(
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
		if (!inputText || !keyLocked || !key) {
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
				setOutputText(decrypted || "");
			}
		} catch {
			setOutputText("");
		}
	}, [inputText, key, keyLocked, mode]);

	const handleInputChange = (val: string) => {
		if (!isKeyReady) {
			toast.warning("Key Not Locked", {
				description: "Please enter and lock your secret key first.",
			});
			return;
		}
		setInputText(val);
	};

	const handleGenerateLink = () => {
		if (!isKeyReady) {
			toast.warning("Key Not Locked", {
				description: "Lock your key before generating a shareable link.",
			});
			return;
		}

		generateShareableUrl({
			inputText,
			key,
			setEncryptedText,
			setUrlKey,
			setMode,
			copyToClipboard: setTextToCopy,
			currentUrl: currentUrl || "",
		});
	};

	return (
		<main className="flex flex-col items-center justify-between p-4 mt-4 bg-background">
			<Card className="w-full max-w-4xl">
				<CardHeader>
					<CardTitle className="flex text-3xl font-bold justify-center items-center gap-2 my-2">
						<HyperText delay={1}>EmojiCrypt</HyperText>
					</CardTitle>
					<CardDescription className="text-lg flex justify-center items-center">
						<TextAnimate animation="blurInUp" by="character" once>
							{`${mode === "encrypt" ? "Encrypt" : "Decrypt"} your messages into fun emoji sequences!`}
						</TextAnimate>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue={mode} onValueChange={setMode} className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6 h-11">
							<TabsTrigger value="encrypt" className="text-base font-medium">
								<Lock className="h-4 w-4 mr-2" />
								Encrypt
							</TabsTrigger>
							<TabsTrigger value="decrypt" className="text-base font-medium">
								<Unlock className="h-4 w-4 mr-2" />
								Decrypt
							</TabsTrigger>
						</TabsList>
						<TextAndKeyInput
							mode={mode}
							inputText={inputText}
							setInputText={handleInputChange}
							outputText={outputText}
							keyValue={key}
							setKeyValue={setKey}
							keyLocked={keyLocked}
							setKeyLocked={setKeyLocked}
							onGenerateKey={() => generateRandomKey({ keyLocked, setKey })}
						/>
					</Tabs>
				</CardContent>
				<CardFooter className="flex flex-wrap gap-3 justify-between">
					<Button
						variant="outline"
						onClick={() =>
							clearAll({ keyLocked, setInputText, setOutputText, setKey })
						}
					>
						Clear All 🧹
					</Button>
					{mode === "encrypt" && currentUrl && (
						<Button onClick={handleGenerateLink}>
							<Sparkles className="h-4 w-4 mr-2" />
							Generate Shareable Link 🔗
						</Button>
					)}
				</CardFooter>
			</Card>
		</main>
	);
}
