import { cn } from "@/lib/utils";

type Tone = "ink" | "paper";

type DossierMarkProps = {
    tone?: Tone;
    size?: "sm" | "md" | "lg";
    showWordmark?: boolean;
    codename?: string;
    className?: string;
};

const sizeMap = {
    sm: { box: "size-7", glyph: 14, gap: "gap-2.5" },
    md: { box: "size-9", glyph: 16, gap: "gap-3" },
    lg: { box: "size-11", glyph: 20, gap: "gap-3.5" },
};

export function DossierMark({
    tone = "ink",
    size = "md",
    showWordmark = true,
    codename = "DSP-AI · 24/06",
    className,
}: DossierMarkProps) {
    const s = sizeMap[size];
    const isInk = tone === "ink";

    return (
        <div className={cn("inline-flex items-center", s.gap, className)}>
            <span
                className={cn(
                    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[3px] border",
                    s.box,
                    isInk
                        ? "border-white/15 bg-white/[0.04]"
                        : "border-paper-ink/20 bg-paper-ink/[0.04]",
                )}
            >
                <span
                    aria-hidden
                    className={cn(
                        "absolute inset-0",
                        isInk
                            ? "bg-[radial-gradient(circle_at_30%_25%,rgba(244,176,31,0.22),transparent_55%)]"
                            : "bg-[radial-gradient(circle_at_30%_25%,rgba(255,59,48,0.18),transparent_55%)]",
                    )}
                />
                <svg
                    width={s.glyph}
                    height={s.glyph}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="relative"
                >
                    <path
                        d="M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
                        stroke={isInk ? "#F4B01F" : "#A91D14"}
                        strokeWidth="1.5"
                        strokeLinecap="square"
                    />
                    <circle
                        cx="12"
                        cy="12"
                        r="3.25"
                        stroke={isInk ? "#F4EFE6" : "#181410"}
                        strokeWidth="1.4"
                    />
                    <circle
                        cx="12"
                        cy="12"
                        r="0.9"
                        fill={isInk ? "#FF3B30" : "#A91D14"}
                    />
                </svg>
                <span
                    aria-hidden
                    className={cn(
                        "absolute inset-x-1 bottom-0.5 h-px",
                        isInk ? "bg-sodium/70" : "bg-signal-deep/60",
                    )}
                />
            </span>

            {showWordmark ? (
                <span className="flex flex-col leading-tight">
                    <span
                        className={cn(
                            "font-display text-[15px] font-semibold tracking-[-0.01em]",
                            isInk ? "text-white" : "text-paper-ink",
                        )}
                    >
                        Dispatch<span className="italic">AI</span>
                    </span>
                    <span
                        className={cn(
                            "font-mono text-[9px] uppercase leading-none tracking-ribbon",
                            isInk ? "text-white/45" : "text-paper-ink/55",
                        )}
                    >
                        {codename}
                    </span>
                </span>
            ) : null}
        </div>
    );
}
