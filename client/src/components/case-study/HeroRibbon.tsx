import Link from "next/link";
import { DossierMark } from "@/components/brand/DossierMark";

type HeroRibbonProps = {
    rightSlot?: React.ReactNode;
};

export function HeroRibbon({ rightSlot }: HeroRibbonProps) {
    return (
        <div className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
            <div className="mx-auto flex h-12 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
                {/* Left: brand mark + product wordmark */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2.5"
                    >
                        <DossierMark
                            size="sm"
                            showWordmark={false}
                        />
                        <span className="hidden text-sm font-medium tracking-tight text-white sm:inline">
                            DispatchAI
                        </span>
                    </Link>
                    <span className="hidden truncate text-sm text-white/45 lg:inline">
                        Berkeley AI Hackathon &middot; Grand Prize, 2024
                    </span>
                </div>

                {/* Right: nav + CTAs. Never shrinks. */}
                <div className="flex shrink-0 items-center gap-4 lg:gap-5">
                    <nav className="hidden shrink-0 items-center gap-5 whitespace-nowrap text-[13px] text-white/60 md:flex lg:gap-6">
                        <a
                            href="#award"
                            className="transition hover:text-white"
                        >
                            Award
                        </a>
                        <a
                            href="#demo"
                            className="transition hover:text-white"
                        >
                            Demo
                        </a>
                        <a
                            href="#system"
                            className="transition hover:text-white"
                        >
                            System
                        </a>
                        <a
                            href="#preview"
                            className="transition hover:text-white"
                        >
                            Console
                        </a>
                        <a
                            href="#team"
                            className="transition hover:text-white"
                        >
                            Team
                        </a>
                        <a
                            href="#sources"
                            className="transition hover:text-white"
                        >
                            Sources
                        </a>
                    </nav>
                    {rightSlot}
                </div>
            </div>
        </div>
    );
}
