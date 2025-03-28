"use client";

import Link from "next/link";

//components
import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";

//icons
import { Menu, Lock, Info, Sparkles } from "lucide-react";
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
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<div className="relative w-10 h-10 flex items-center justify-center">
						<div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-70 blur-sm"></div>
						<span className="text-2xl relative z-10">🔐</span>
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
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
					>
						<IconBrandGithub className="h-5 w-5" />
						<span className="sr-only">GitHub</span>
					</a>

					<Button
						size="sm"
						className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
					>
						<Sparkles className="h-4 w-4 mr-2" />
						Try Now
					</Button>
				</nav>

				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right">
						<Link href="/" className="flex items-center gap-2 mb-8">
							<div className="relative w-10 h-10 flex items-center justify-center">
								<div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-70 blur-sm"></div>
								<span className="text-2xl relative z-10">🔐</span>
							</div>
							<span className="font-bold text-xl">EmojiCrypt</span>
						</Link>
						<nav className="flex flex-col gap-4">
							{navItems.map((item) => (
								<Link
									key={item.path}
									href={item.path}
									className={cn(
										"text-base font-medium transition-colors hover:text-primary flex items-center gap-2",
										pathname === item.path
											? "text-foreground"
											: "text-muted-foreground",
									)}
								>
									{item.path === "/" && <Lock className="h-4 w-4" />}
									{item.path === "/how-it-works" && (
										<Info className="h-4 w-4" />
									)}
									{item.path === "/about" && <Sparkles className="h-4 w-4" />}
									{item.name}
								</Link>
							))}

							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-base font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2"
							>
								<IconBrandGithub className="h-4 w-4" />
								GitHub
							</a>

							<Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
								<Sparkles className="h-4 w-4 mr-2" />
								Try Now
							</Button>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
