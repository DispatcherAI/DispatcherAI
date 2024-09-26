import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * @see {@link https://github.com/dcastil/tailwind-merge/blob/main/docs/api-reference.md#extendtailwindmerge}
 */
const customTwMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-size": ["text-xxs"],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return customTwMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
    if (typeof window !== "undefined") return path;
    if (process.env.PUBLIC_NEXT_VERCEL_URL)
        return `https://${process.env.PUBLIC_NEXT_VERCEL_URL}${path}`;
    return `http://localhost:${process.env.PUBLIC_NEXT_PORT ?? 3000}${path}`;
}
