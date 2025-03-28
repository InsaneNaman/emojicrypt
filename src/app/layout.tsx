import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//components
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "EmojiCrypt",
	description:
		"EmojiCrypt is a simple, secure, and easy-to-use encryption tool that allows you to encrypt and decrypt text using emojis.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-background to-background/90 dark`}
			>
				<div className="flex min-h-screen flex-col">
					<Header />
					<div className="flex-1">{children}</div>
					<Footer />
				</div>
				<Toaster />
			</body>
		</html>
	);
}
