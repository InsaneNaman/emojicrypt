"use client";

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
	HyperText,
	TextAnimate,
} from "@/components/ui";
import { Copy, Key, Lock, Unlock, Sparkles, RefreshCw } from "lucide-react";

type Props = {
	mode: string;
	setMode: (val: string) => void;
	inputText: string;
	setInputText: (val: string) => void;
	outputText: string;
	keyValue: string;
	setKeyValue: (val: string) => void;
	keyLocked: boolean;
	setKeyLocked: (val: boolean) => void;
	onGenerateKey: () => void;
	onCopyOutput: () => void;
	onGenerateURL: () => void;
	onClearAll: () => void;
};

export default function EncryptionToolUI({
	mode,
	setMode,
	inputText,
	setInputText,
	outputText,
	keyValue,
	setKeyValue,
	keyLocked,
	setKeyLocked,
	onGenerateKey,
	onCopyOutput,
	onGenerateURL,
	onClearAll,
}: Readonly<Props>) {
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
											onClick={onCopyOutput}
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
											onChange={(e) =>
												!keyLocked && setKeyValue(e.target.value)
											}
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
						</div>
					</Tabs>
				</CardContent>

				<CardFooter className="flex flex-wrap gap-3 justify-between">
					<Button variant="outline" onClick={onClearAll}>
						Clear All 🧹
					</Button>
					{mode === "encrypt" && (
						<Button onClick={onGenerateURL}>
							<Sparkles className="h-4 w-4 mr-2" />
							Generate Shareable Link 🔗
						</Button>
					)}
				</CardFooter>
			</Card>
		</main>
	);
}
