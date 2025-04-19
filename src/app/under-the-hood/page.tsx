import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Info,
	Puzzle,
	Key,
	Pencil,
	Lock,
	Smile,
	Link,
	Unlock,
	Shield,
	Check,
} from "lucide-react";

export default function HowItWorks() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="container py-12">
				<div className="max-w-3xl mx-auto flex flex-col items-center">
					<div className="mb-12 p-6 bg-muted/30 rounded-lg border border-border/50 w-full">
						<h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
							<Info className="w-8 h-8 text-primary" /> About EmojiCrypt
						</h2>
						<p className="text-muted-foreground mb-4 text-center">
							EmojiCrypt is a fun side project that combines encryption with
							emojis to create a unique way of sharing secret messages. While it
							uses real encryption (AES), it's meant for entertainment purposes
							rather than serious security needs.
						</p>
						<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground flex-wrap">
							<span>Built with</span>
							<span className="px-2 py-1 bg-background rounded-md border">
								Next.js
							</span>
							<span>and running on</span>
							<span className="px-2 py-1 bg-background rounded-md border border-amber-500">
								Cloudflare
							</span>
							<span>using</span>
							<span className="px-2 py-1 bg-background rounded-md border border-stone-100">
								OpenNext
							</span>
						</div>
					</div>

					<h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
						<Puzzle className="w-8 h-8 text-primary" /> How EmojiCrypt Works
					</h1>
					<p className="text-xl text-muted-foreground mb-10 text-center">
						Discover how we transform your messages into fun emoji sequences
						while keeping them secure.
					</p>

					<div className="grid gap-8 w-full">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl flex items-center justify-center gap-2">
									<Key className="w-6 h-6 text-primary" /> Step 1: Create a
									Secret Key
								</CardTitle>
								<CardDescription className="text-center">
									Every encryption needs a key to lock and unlock your message
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center">
									Your secret key is like a password that only you and your
									recipient know. It's used to scramble your message in a way
									that can only be unscrambled with the same key. You can create
									your own key or use our random key generator for extra
									security.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-2xl flex items-center justify-center gap-2">
									<Pencil className="w-6 h-6 text-primary" /> Step 2: Enter Your
									Message
								</CardTitle>
								<CardDescription className="text-center">
									Type the secret message you want to encrypt
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center">
									Enter any text you want to keep private. This could be a
									password, a secret note, or any sensitive information you
									don't want others to read. Our system will take this plain
									text and prepare it for encryption.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-2xl flex items-center justify-center gap-2">
									<Lock className="w-6 h-6 text-primary" /> Step 3: Encryption
									Magic
								</CardTitle>
								<CardDescription className="text-center">
									Your message gets transformed using advanced encryption
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center">
									Behind the scenes, EmojiCrypt uses AES (Advanced Encryption
									Standard) to encrypt your message. This is the same encryption
									standard used by governments and financial institutions. The
									encrypted data is then mapped to our emoji alphabet, creating
									a unique emoji sequence.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-2xl flex items-center justify-center gap-2">
									<Smile className="w-6 h-6 text-primary" /> Step 4: Emoji
									Transformation
								</CardTitle>
								<CardDescription className="text-center">
									Your encrypted message becomes a sequence of emojis
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center">
									The encrypted data is converted into a fun sequence of emojis.
									This not only makes your encrypted message look harmless and
									fun, but it also makes it easier to share on social media,
									messaging apps, and other platforms that support emojis.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-2xl flex items-center justify-center gap-2">
									<Link className="w-6 h-6 text-primary" /> Step 5: Share
									Securely
								</CardTitle>
								<CardDescription className="text-center">
									Generate a link or copy the emoji sequence to share
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center">
									You can either copy the emoji sequence directly or generate a
									shareable link. The link contains both the encrypted message
									and the key as parameters. Share the emoji sequence through
									any platform, but remember to share the key through a
									different, secure channel for maximum security.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-2xl flex items-center justify-center gap-2">
									<Unlock className="w-6 h-6 text-primary" /> Step 6: Decryption
								</CardTitle>
								<CardDescription className="text-center">
									The recipient decrypts the message using the same key
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center">
									To read the original message, the recipient needs to paste the
									emoji sequence into the decrypt section and enter the same
									secret key. EmojiCrypt will convert the emojis back to
									encrypted text, then use the key to decrypt it back to the
									original message.
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border/50 w-full">
						<h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
							<Shield className="w-6 h-6 text-primary" /> Security Notes
						</h2>
						<ul className="space-y-2 text-muted-foreground">
							<li className="flex items-start justify-center gap-2">
								<Check className="w-6 h-6 mt-0.5" />
								<span className="text-center">
									All encryption happens in your browser - we never see your
									messages or keys
								</span>
							</li>
							<li className="flex items-start justify-center gap-2">
								<Check className="w-6 h-6 mt-0.5" />
								<span className="text-center">
									For maximum security, share the key through a different
									channel than the emoji message
								</span>
							</li>
							<li className="flex items-start justify-center gap-2">
								<Check className="w-6 h-6 mt-0.5" />
								<span className="text-center">
									Use complex, unique keys for important messages
								</span>
							</li>
							<li className="flex items-start justify-center gap-2">
								<Check className="w-6 h-6 mt-0.5" />
								<span className="text-center">
									Remember that the security of your encrypted message is only
									as strong as your key
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
