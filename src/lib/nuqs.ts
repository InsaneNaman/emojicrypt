import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { useQueryState } from "nuqs";

export const searchParamsCache = createSearchParamsCache({
	mode: parseAsString.withDefault("encrypt"),
	text: parseAsString,
	key: parseAsString,
});

export { useQueryState };
