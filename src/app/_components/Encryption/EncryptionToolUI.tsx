"use client";

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
import { TextAndKeyInput } from "./TextAndKeyInput";

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

						<TextAndKeyInput
							mode={mode}
							inputText={inputText}
							setInputText={setInputText}
							outputText={outputText}
							keyValue={keyValue}
							setKeyValue={setKeyValue}
							keyLocked={keyLocked}
							setKeyLocked={setKeyLocked}
							onGenerateKey={onGenerateKey}
						/>
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
