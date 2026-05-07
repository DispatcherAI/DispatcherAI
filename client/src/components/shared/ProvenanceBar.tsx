"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpenIcon, XIcon } from "lucide-react";

const STORAGE_KEY = "dispatchai.provenanceBar.dismissed";

const links = [
    {
        label: "Dossier",
        href: "/#sources",
        external: false,
    },
    {
        label: "GitHub",
        href: "https://github.com/IdkwhatImD0ing/DispatchAI",
        external: true,
    },
    {
        label: "Devpost",
        href: "https://devpost.com/software/dispatch-ai",
        external: true,
    },
    {
        label: "Demo",
        href: "https://www.youtube.com/watch?v=hdpdgxrilQM",
        external: true,
    },
    {
        label: "Model · HF",
        href: "https://huggingface.co/spikecodes/ai-911-operator",
        external: true,
    },
    {
        label: "Dataset · HF",
        href: "https://huggingface.co/datasets/spikecodes/911-call-transcripts",
        external: true,
    },
];

export function ProvenanceBar() {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const dismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
        setHidden(dismissed);
    }, []);

    if (hidden) return null;

    return (
        <div className="relative z-30 flex items-center justify-between gap-3 border-t border-white/8 bg-ink-deep/95 px-4 py-2">
            <div className="flex items-center gap-3 overflow-x-auto">
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-white/65">
                    <BookOpenIcon className="size-3.5 text-white/45" />
                    Sources
                </span>
                <div className="flex items-center gap-1.5">
                    {links.map((l) => {
                        const className =
                            "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-xs text-white/65 transition hover:border-white/25 hover:text-white";
                        if (l.external) {
                            return (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={className}
                                >
                                    {l.label}
                                    <ArrowUpRight className="size-3" />
                                </a>
                            );
                        }
                        return (
                            <Link
                                key={l.label}
                                href={l.href}
                                prefetch={false}
                                className={className}
                            >
                                {l.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <button
                type="button"
                aria-label="Dismiss provenance bar"
                onClick={() => {
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem(STORAGE_KEY, "1");
                    }
                    setHidden(true);
                }}
                className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-white/25 hover:text-white"
            >
                <XIcon className="size-3.5" />
            </button>
        </div>
    );
}
