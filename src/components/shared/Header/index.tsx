"use client";

import Link from "next/link";

//components
import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";

//icons
import { Menu, Lock, Info, HandMetal } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

//utils
import { usePathname } from "next/navigation";
import { cn } from "@/utils/css";

export default function Header() {
	const pathname = usePathname();

	const navItems = [
		{ name: "Home", path: "/" },
		{ name: "Under the Hood", path: "/under-the-hood" },
	];

	return (
		<header className="sticky top-5 z-50 border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mx-4">
			<div className="container flex h-16 items-center justify-between max-w-screen-xl mx-auto px-4 rounded-full border border-amber-400">
				<Link href="/" className="flex items-center gap-2">
					<div className="relative w-10 h-10 flex items-center justify-center">
						<HandMetal className="text-amber-400" />
					</div>
					<span className="font-bold text-xl hidden sm:inline-block">
						EmojiCrypt
					</span>
				</Link>

				<nav className="hidden md:flex items-center gap-6">
					{navItems.map((item) => (
						<Link
							key={item.path}
							href={item.path}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								pathname === item.path
									? "text-foreground"
									: "text-muted-foreground",
							)}
						>
							{item.name}
						</Link>
					))}

					<a
						href="https://github.com/naman/emojicrypt"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						<IconBrandGithub className="h-4 w-4" />
						Star on GitHub
					</a>
				</nav>

				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden rounded-lg"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="backdrop-blur bg-background/80">
						<Link href="/" className="flex items-center gap-2 mb-8">
							<span className="font-bold text-xl">EmojiCrypt</span>
						</Link>
						<nav className="flex flex-col gap-4">
							{navItems.map((item) => (
								<Link
									key={item.path}
									href={item.path}
									className={cn(
										"text-base font-medium transition-colors hover:text-primary flex items-center gap-2 rounded-lg p-2",
										pathname === item.path
											? "text-foreground bg-muted/50"
											: "text-muted-foreground",
									)}
								>
									{item.path === "/" && <Lock className="h-4 w-4" />}
									{item.path === "/under-the-hood" && (
										<Info className="h-4 w-4" />
									)}
									{item.name}
								</Link>
							))}

							<a
								href="https://github.com/naman/emojicrypt"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
							>
								<IconBrandGithub className="h-4 w-4" />
								Star on GitHub
							</a>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
