import { ArrowUpRight } from "lucide-react";

const sources = [
    {
        n: "01",
        label: "Devpost submission · DispatchAI",
        href: "https://devpost.com/software/dispatch-ai",
        meta: "60 likes · 5 comments",
    },
    {
        n: "02",
        label: "GitHub · IdkwhatImD0ing/DispatchAI",
        href: "https://github.com/IdkwhatImD0ing/DispatchAI",
        meta: "11 stars · 4 forks · 98 commits",
    },
    {
        n: "03",
        label: "YouTube product demo",
        href: "https://www.youtube.com/watch?v=hdpdgxrilQM",
        meta: "Hosted on Bill Zhang's channel",
    },
    {
        n: "04",
        label: "Hugging Face model · spikecodes/ai-911-operator",
        href: "https://huggingface.co/spikecodes/ai-911-operator",
        meta: "MIT license",
    },
    {
        n: "05",
        label: "Hugging Face dataset · 911-call-transcripts",
        href: "https://huggingface.co/datasets/spikecodes/911-call-transcripts",
        meta: "518 rows (public snapshot)",
    },
    {
        n: "06",
        label: "Figma · operator dashboard design file",
        href: "https://www.figma.com/design/wCSONTXVKHb5pBLcnex7OZ/Dispatch-AI?node-id=100-2294",
        meta: "Original Figma artifact",
    },
    {
        n: "07",
        label: "Live deployment · dispatchai.art3m1s.me",
        href: "https://dispatchai.art3m1s.me/",
        meta: "Current portfolio cut",
    },
    {
        n: "08",
        label: "UC Berkeley AI Hackathon 2024",
        href: "https://cal-hacks-ai.devpost.com/",
        meta: "930 builders · 293 submissions · Jun 22–23, 2024",
    },
];

export function Footnotes() {
    return (
        <div
            id="sources"
            className="overflow-hidden rounded-[4px] border border-white/12 bg-ink-panel"
        >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 text-sm">
                <span className="font-medium text-white/75">
                    Notes &amp; sources
                </span>
                <span className="text-white/45">External</span>
            </div>
            <ol className="divide-y divide-white/5">
                {sources.map((s) => (
                    <li key={s.n}>
                        <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 transition hover:bg-white/[0.02]"
                        >
                            <span className="font-mono text-xs tabular-nums text-white/40">
                                {s.n}
                            </span>
                            <div className="flex flex-col">
                                <span className="text-sm text-white/85 transition group-hover:text-white">
                                    {s.label}
                                </span>
                                <span className="text-xs text-white/40">
                                    {s.meta}
                                </span>
                            </div>
                            <ArrowUpRight className="size-4 text-white/35 transition group-hover:text-white" />
                        </a>
                    </li>
                ))}
            </ol>
        </div>
    );
}
