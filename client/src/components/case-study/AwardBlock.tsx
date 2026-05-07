import { AwardIcon, BoltIcon, FlagIcon, UsersIcon } from "lucide-react";

const awardFacts = [
    {
        icon: AwardIcon,
        eyebrow: "Top placement",
        primary: "Grand Prize",
        secondary:
            "$25,000 investment from the Berkeley SkyDeck Fund, $2,500 OpenAI credits, and a Pad-13 incubator Golden Ticket.",
    },
    {
        icon: BoltIcon,
        eyebrow: "Track win",
        primary: "Best Use of Intel AI",
        secondary:
            "Recognized for fine-tuning Mistral-7B on the Intel Dev Cloud and using IPEX to take inference from 2:53 to under 10 seconds.",
    },
    {
        icon: UsersIcon,
        eyebrow: "Field size",
        primary: "930 builders",
        secondary:
            "293 submissions over 36 hours at the UC Berkeley AI Hackathon, organized by Cal Hacks and Berkeley SkyDeck.",
    },
    {
        icon: FlagIcon,
        eyebrow: "Post-hackathon",
        primary: "SkyDeck Pad-13",
        secondary:
            "Golden Ticket admission to Berkeley SkyDeck's accelerator program, awarded as part of the grand prize package.",
    },
];

export function AwardBlock() {
    return (
        <div className="grid gap-px overflow-hidden rounded-[4px] border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {awardFacts.map((fact) => (
                <article
                    key={fact.primary}
                    className="bg-ink-panel/95 p-7"
                >
                    <div className="flex items-center gap-2.5 text-white/60">
                        <fact.icon
                            className="size-4"
                            strokeWidth={1.5}
                        />
                        <span className="text-xs">{fact.eyebrow}</span>
                    </div>
                    <p className="mt-4 font-display text-2xl font-medium leading-tight tracking-[-0.01em] text-white sm:text-3xl">
                        {fact.primary}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                        {fact.secondary}
                    </p>
                </article>
            ))}
        </div>
    );
}
