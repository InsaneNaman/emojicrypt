import { Suspense } from "react";
import EncryptionToolContent from "@/app/_components/Encryption";

interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default function EncryptionToolPage({ searchParams }: Props) {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-muted" />
				</div>
			}
		>
			<EncryptionToolContent />
		</Suspense>
	);
}
