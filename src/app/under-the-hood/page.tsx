import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function HowItWorks() {
	return (
		<div className="container py-12">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
					<span className="text-4xl">🧩</span> How EmojiCrypt Works
				</h1>
				<p className="text-xl text-muted-foreground mb-10">
					Discover how we transform your messages into fun emoji sequences while
					keeping them secure.
				</p>

				<div className="grid gap-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<span className="text-3xl">🔑</span> Step 1: Create a Secret Key
							</CardTitle>
							<CardDescription>
								Every encryption needs a key to lock and unlock your message
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Your secret key is like a password that only you and your
								recipient know. It's used to scramble your message in a way that
								can only be unscrambled with the same key. You can create your
								own key or use our random key generator for extra security.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<span className="text-3xl">📝</span> Step 2: Enter Your Message
							</CardTitle>
							<CardDescription>
								Type the secret message you want to encrypt
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Enter any text you want to keep private. This could be a
								password, a secret note, or any sensitive information you don't
								want others to read. Our system will take this plain text and
								prepare it for encryption.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<span className="text-3xl">🔐</span> Step 3: Encryption Magic
							</CardTitle>
							<CardDescription>
								Your message gets transformed using advanced encryption
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Behind the scenes, EmojiCrypt uses AES (Advanced Encryption
								Standard) to encrypt your message. This is the same encryption
								standard used by governments and financial institutions. The
								encrypted data is then mapped to our emoji alphabet, creating a
								unique emoji sequence.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<span className="text-3xl">😀</span> Step 4: Emoji
								Transformation
							</CardTitle>
							<CardDescription>
								Your encrypted message becomes a sequence of emojis
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								The encrypted data is converted into a fun sequence of emojis.
								This not only makes your encrypted message look harmless and
								fun, but it also makes it easier to share on social media,
								messaging apps, and other platforms that support emojis.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<span className="text-3xl">🔗</span> Step 5: Share Securely
							</CardTitle>
							<CardDescription>
								Generate a link or copy the emoji sequence to share
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								You can either copy the emoji sequence directly or generate a
								shareable link. The link contains both the encrypted message and
								the key as parameters. Share the emoji sequence through any
								platform, but remember to share the key through a different,
								secure channel for maximum security.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								<span className="text-3xl">🔓</span> Step 6: Decryption
							</CardTitle>
							<CardDescription>
								The recipient decrypts the message using the same key
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								To read the original message, the recipient needs to paste the
								emoji sequence into the decrypt section and enter the same
								secret key. EmojiCrypt will convert the emojis back to encrypted
								text, then use the key to decrypt it back to the original
								message.
							</p>
						</CardContent>
					</Card>
				</div>

				<div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border/50">
					<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
						<span className="text-3xl">🛡️</span> Security Notes
					</h2>
					<ul className="space-y-2 text-muted-foreground">
						<li className="flex items-start gap-2">
							<span className="text-xl mt-0.5">✅</span>
							<span>
								All encryption happens in your browser - we never see your
								messages or keys
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-xl mt-0.5">✅</span>
							<span>
								For maximum security, share the key through a different channel
								than the emoji message
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-xl mt-0.5">✅</span>
							<span>Use complex, unique keys for important messages</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-xl mt-0.5">✅</span>
							<span>
								Remember that the security of your encrypted message is only as
								strong as your key
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
