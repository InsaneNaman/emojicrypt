"use client";

import { Copy, Key, Lock, Unlock, RefreshCw } from "lucide-react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { copyOutputText } from "./index.helpers";
import { useCopyToClipboard } from "usehooks-ts";

interface TextAndKeyInputProps {
	mode: string;
	inputText: string;
	setInputText: (val: string) => void;
	outputText: string;
	keyValue: string;
	setKeyValue: (val: string) => void;
	keyLocked: boolean;
	setKeyLocked: (val: boolean) => void;
	onGenerateKey: () => void;
}

export const TextAndKeyInput = ({
	mode,
	inputText,
	setInputText,
	outputText,
	keyValue,
	setKeyValue,
	keyLocked,
	setKeyLocked,
	onGenerateKey,
}: TextAndKeyInputProps) => {
	const [copiedText, copyToClipboard] = useCopyToClipboard();
	return (
		<div className="grid gap-6 mb-6">
			<div className="bg-muted/30 p-4 rounded-lg border">
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
							value={keyValue}
							onChange={(e) => !keyLocked && setKeyValue(e.target.value)}
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
						onClick={onGenerateKey}
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
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1">
					<Label htmlFor="inputText" className="mb-2 block text-lg font-medium">
						{mode === "encrypt" ? "Text to Encrypt 📝" : "Emoji to Decrypt 😀"}
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
							{mode === "encrypt" ? "Emoji Result 😀" : "Decrypted Text 📝"}
						</Label>
						<Button
							variant="ghost"
							size="sm"
							onClick={() =>
								copyOutputText({ text: outputText, copyToClipboard })
							}
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
		</div>
	);
};
