//icons
import { Heart } from "lucide-react";
import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandTwitter,
} from "@tabler/icons-react";

export default function Footer() {
	return (
		<footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
			<div className="container flex flex-col items-center justify-center gap-4 max-w-screen-xl mx-auto px-4">
				<div className="text-muted-foreground flex items-center justify-center gap-1">
					Made with <Heart className="h-3 w-3 text-amber-400" /> by{" "}
					<a
						href="https://insanenaman.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-amber-400 hover:text-amber-500 transition-colors"
					>
						Naman Gupta
					</a>
				</div>
				<div className="flex items-center justify-center gap-4">
					<a
						href="https://github.com/insanenaman"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors rounded-lg p-2"
					>
						<IconBrandGithub className="h-5 w-5" />
						<span className="sr-only">GitHub</span>
					</a>
					<a
						href="https://x.com/insanenaman"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors rounded-lg p-2"
					>
						<IconBrandTwitter className="h-5 w-5" />
						<span className="sr-only">Twitter</span>
					</a>
					<a
						href="https://linkedin.com/in/insanenaman"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors rounded-lg p-2"
					>
						<IconBrandLinkedin className="h-5 w-5" />
						<span className="sr-only">LinkedIn</span>
					</a>
				</div>
			</div>
		</footer>
	);
}
