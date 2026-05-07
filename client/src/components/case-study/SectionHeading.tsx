import { cn } from "@/lib/utils";

type SectionHeadingProps = {
    eyebrow: string;
    index?: string;
    title: React.ReactNode;
    deck?: React.ReactNode;
    align?: "start" | "center";
    tone?: "ink" | "paper";
    className?: string;
};

export function SectionHeading({
    eyebrow,
    index,
    title,
    deck,
    align = "start",
    tone = "ink",
    className,
}: SectionHeadingProps) {
    const isInk = tone === "ink";
    return (
        <header
            className={cn(
                "flex flex-col gap-5",
                align === "center" && "items-center text-center",
                className,
            )}
        >
            <div
                className={cn(
                    "flex w-full items-center gap-4",
                    align === "center" && "justify-center",
                )}
            >
                <span
                    className={cn(
                        "text-sm font-medium",
                        isInk ? "text-white/55" : "text-paper-ink/65",
                    )}
                >
                    {index ? (
                        <span
                            className={cn(
                                "mr-2 font-mono tabular-nums",
                                isInk ? "text-white/35" : "text-paper-ink/45",
                            )}
                        >
                            {index}
                        </span>
                    ) : null}
                    {eyebrow}
                </span>
                <span
                    aria-hidden
                    className={cn(
                        "h-px flex-1",
                        isInk ? "bg-white/15" : "bg-paper-ink/20",
                    )}
                />
            </div>
            <h2
                className={cn(
                    "max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl",
                    isInk ? "text-white" : "text-paper-ink",
                )}
            >
                {title}
            </h2>
            {deck ? (
                <p
                    className={cn(
                        "max-w-2xl text-base leading-7",
                        isInk ? "text-white/65" : "text-paper-ink/70",
                    )}
                >
                    {deck}
                </p>
            ) : null}
        </header>
    );
}
