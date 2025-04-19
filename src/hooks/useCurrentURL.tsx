// hooks/useCurrentUrl.ts
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * A hook that returns the complete current URL including origin, path, query parameters, and hash
 * @returns The current URL as a string, or null if not in browser context
 */
export function useCurrentUrl(): string | null {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [url, setUrl] = useState<string | null>(null);
	const [hash, setHash] = useState<string>("");

	// Set up hash listener and get initial hash
	useEffect(() => {
		// Only run on client
		if (typeof window === "undefined") return;

		// Initial hash
		setHash(window.location.hash);

		// Listen for hash changes
		const handleHashChange = () => {
			setHash(window.location.hash);
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	// Construct the full URL whenever components change
	useEffect(() => {
		// Only run on client
		if (typeof window === "undefined") return;

		const origin = window.location.origin;
		const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
		const fullUrl = `${origin}${pathname}${query}${hash}`;

		setUrl(fullUrl);
	}, [pathname, searchParams, hash]);

	return url;
}
