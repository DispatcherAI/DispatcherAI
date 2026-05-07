import { cn } from "@/lib/utils";

type TeamMember = {
    name: string;
    handle?: string;
    role: string;
    contributions: string;
    href?: string;
    you?: boolean;
};

const team: TeamMember[] = [
    {
        name: "Jasmine Wu",
        role: "Human-AI interfaces · Backend · UX",
        contributions:
            "Started the project and solo-pitched the finalist demo to judges. Fine-tuned Mistral on real 911 transcripts, built the voice backend, and shaped the human-AI handoff working with real dispatchers.",
    },
    {
        name: "Spike O'Carroll",
        handle: "@spikecodes",
        role: "Machine learning · Backend",
        contributions:
            "Led ML and backend. Integrated Hume EVI for emotion, Twilio for telephony, and built the extraction + evaluation pipelines. Ran the LoRA fine-tune on Intel Dev Cloud and authored the open-sourced model and dataset on Hugging Face.",
    },
    {
        name: "Kevin Wu",
        role: "Frontend · UX · Product",
        contributions:
            "Owned the operator dashboard end-to-end. Built the real-time interactive cockpit in Next.js + TailwindCSS with a focus on calm, dispatcher-grade interactions under load.",
    },
    {
        name: "Bill Zhang",
        handle: "you are here",
        role: "Conversational AI · Voice agent",
        contributions:
            "Built the conversational layer and the voice agent runtime. Integrated the LLM into the live call loop and stitched the real-time interactive cockpit you are reading this on.",
        you: true,
    },
];

export function TeamCard() {
    return (
        <div className="grid gap-px overflow-hidden rounded-[4px] border border-white/12 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
            {team.map((m) => (
                <article
                    key={m.name}
                    className={cn(
                        "relative bg-ink-panel/95 p-7",
                        m.you && "ring-1 ring-inset ring-white/15",
                    )}
                >
                    {m.you ? (
                        <span className="absolute right-5 top-5 text-xs text-white/55">
                            you are here
                        </span>
                    ) : null}
                    <p className="text-xs text-white/45">{m.role}</p>
                    <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.01em] text-white">
                        {m.name}
                    </h3>
                    {m.handle ? (
                        <p className="mt-0.5 text-xs text-white/55">
                            {m.handle}
                        </p>
                    ) : null}
                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
                        {m.contributions}
                    </p>
                </article>
            ))}
        </div>
    );
}
