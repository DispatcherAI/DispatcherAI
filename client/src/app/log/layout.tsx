import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { DossierMark } from "@/components/brand/DossierMark";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
    title: "Call History — DispatchAI",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[100dvh] w-full flex-col overflow-hidden bg-ink text-white">
            <header className="flex h-14 items-center justify-between border-b border-white/8 bg-ink-deep/95 px-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <Link
                        href="/live"
                        prefetch={false}
                        className="inline-flex items-center gap-2 rounded-[3px] border border-white/10 bg-white/[0.02] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-ribbon text-white/65 transition hover:border-white/25 hover:text-white"
                    >
                        <ArrowLeftIcon className="size-3" />
                        Live console
                    </Link>
                </div>
                <DossierMark size="sm" />
                <span className="font-mono text-[10px] uppercase tracking-ribbon text-white/45">
                    /log · raw history
                </span>
            </header>
            <main className="flex-1 overflow-auto bg-ink/70 p-6">
                {children}
            </main>
        </div>
    );
}
