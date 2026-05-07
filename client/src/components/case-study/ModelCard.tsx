import { ArrowUpRight } from "lucide-react";

const stats = [
    { label: "Base model", value: "Mistral-7B-v0.1" },
    { label: "Tuning", value: "LoRA · PEFT" },
    { label: "Hardware", value: "Intel Data Center GPU Max 1100" },
    { label: "Optimization", value: "IPEX (PyTorch)" },
];

const downloads = [
    {
        label: "Model · spikecodes/ai-911-operator",
        href: "https://huggingface.co/spikecodes/ai-911-operator",
    },
    {
        label: "Dataset · spikecodes/911-call-transcripts",
        href: "https://huggingface.co/datasets/spikecodes/911-call-transcripts",
    },
];

export function ModelCard() {
    return (
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="panel-raised relative overflow-hidden rounded-[4px] p-7">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/60">
                        Latency &middot; before / after
                    </span>
                    <span className="text-xs text-white/45">
                        Intel Dev Cloud
                    </span>
                </div>
                <div className="mt-6 flex items-end gap-6 sm:gap-10">
                    <div>
                        <p className="text-xs text-white/45">Before</p>
                        <p className="mt-1 font-display text-5xl font-medium text-white/85 line-through decoration-signal/70 decoration-[2px] sm:text-6xl">
                            2:53
                        </p>
                        <p className="mt-1 text-xs text-white/45">
                            per response
                        </p>
                    </div>
                    <div className="self-center text-2xl text-white/40">→</div>
                    <div>
                        <p className="text-xs text-phosphor/85">After IPEX</p>
                        <p className="mt-1 font-display text-5xl font-medium text-phosphor sm:text-7xl">
                            &lt;10s
                        </p>
                        <p className="mt-1 text-xs text-white/45">
                            same hardware tier
                        </p>
                    </div>
                </div>
                <p className="mt-8 max-w-md text-sm leading-6 text-white/60">
                    Reported in the team&apos;s submission: applying the Intel
                    Extension for PyTorch to a Mistral-7B LoRA fine-tune
                    collapsed per-response latency by an order of magnitude on
                    the same Intel Data Center GPU Max 1100 tier &mdash; the
                    work that earned Best Use of Intel AI.
                </p>
            </div>

            <div className="panel rounded-[4px] p-7">
                <p className="text-sm font-medium text-white/60">
                    Open-sourced
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.01em] text-white">
                    Both the fine-tuned model and a curated transcript snapshot
                    are public.
                </h3>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <dt className="text-xs text-white/45">{s.label}</dt>
                            <dd className="mt-1 text-sm text-white/85">
                                {s.value}
                            </dd>
                        </div>
                    ))}
                </dl>
                <div className="mt-7 space-y-3">
                    {downloads.map((d) => (
                        <a
                            key={d.href}
                            href={d.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-4 rounded-[3px] border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                        >
                            <span>{d.label}</span>
                            <ArrowUpRight className="size-4 text-white/45 transition group-hover:text-white" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
