//icons
import { Heart } from "lucide-react";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";

export default function Footer() {
	return (
		<footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
			<div className="container flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<span className="text-xl">🔐</span>
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} EmojiCrypt. All rights reserved.
					</p>
				</div>

				<div className="flex items-center gap-4">
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						<IconBrandGithub className="h-5 w-5" />
						<span className="sr-only">GitHub</span>
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						<IconBrandTwitter className="h-5 w-5" />
						<span className="sr-only">Twitter</span>
					</a>
					<div className="text-sm text-muted-foreground flex items-center gap-1">
						Made with <Heart className="h-3 w-3 text-red-500" /> by EmojiCrypt
					</div>
				</div>
			</div>
		</footer>
	);
}
