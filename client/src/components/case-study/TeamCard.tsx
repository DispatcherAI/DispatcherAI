import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type TeamMember = {
    name: string;
    handle?: string;
    role: string;
    contributions: string;
    image: string;
    linkedin: string;
    you?: boolean;
};

const team: TeamMember[] = [
    {
        name: "Jasmine Wu",
        role: "Human-AI interfaces · Backend · UX",
        contributions:
            "Started the project and solo-pitched the finalist demo to judges. Fine-tuned Mistral on real 911 transcripts, built the voice backend, and shaped the human-AI handoff working with real dispatchers.",
        image: "/team/jasmine.png",
        linkedin: "https://www.linkedin.com/in/jaslavie/",
    },
    {
        name: "Spike O'Carroll",
        handle: "@spikecodes",
        role: "Machine learning · Backend",
        contributions:
            "Led ML and backend. Integrated Hume EVI for emotion, Twilio for telephony, and built the extraction + evaluation pipelines. Ran the LoRA fine-tune on Intel Dev Cloud and authored the open-sourced model and dataset on Hugging Face.",
        image: "/team/spike.png",
        linkedin: "https://www.linkedin.com/in/spike-ocarroll/",
    },
    {
        name: "Kevin Wu",
        role: "Frontend · UX · Product",
        contributions:
            "Owned the operator dashboard end-to-end. Built the real-time interactive cockpit in Next.js + TailwindCSS with a focus on calm, dispatcher-grade interactions under load.",
        image: "/team/kevin.png",
        linkedin: "https://www.linkedin.com/in/kevinwu098/",
    },
    {
        name: "Bill Zhang",
        role: "Conversational AI · Voice agent",
        contributions:
            "Built the conversational layer and the voice agent runtime. Integrated the LLM into the live call loop and stitched the real-time interactive cockpit you are reading this on.",
        image: "/team/bill.png",
        linkedin: "https://www.linkedin.com/in/bill-zhang1/",
        you: true,
    },
];

export function TeamCard() {
    return (
        <div className="grid gap-px overflow-hidden rounded-[4px] border border-white/12 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
            {team.map((m, i) => (
                <a
                    key={m.name}
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "group relative flex flex-col bg-ink-panel/95 p-7 transition",
                        "hover:bg-ink-panel",
                        m.you && "ring-1 ring-inset ring-sodium/45",
                    )}
                >
                    <span className="absolute left-7 top-7 font-mono text-[10px] uppercase tracking-ribbon text-white/35">
                        {String(i + 1).padStart(2, "0")}
                    </span>

                    {m.you ? (
                        <span className="stamp absolute right-5 top-5 border-sodium/55 text-sodium">
                            <span className="size-1.5 rounded-full bg-sodium" />
                            You are here
                        </span>
                    ) : null}

                    <div className="mt-7 flex items-start gap-4">
                        <div className="relative shrink-0">
                            <img
                                src={m.image}
                                alt={`${m.name} portrait`}
                                className={cn(
                                    "size-16 rounded-[3px] border border-white/15 object-cover transition duration-300",
                                    "grayscale brightness-90 contrast-110",
                                    "group-hover:grayscale-0 group-hover:brightness-100",
                                    m.you && "grayscale-0 brightness-100",
                                )}
                                loading="lazy"
                            />
                            {/* Inset highlight to seat the portrait into the panel surface */}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute inset-0 rounded-[3px] ring-1 ring-inset ring-white/5"
                            />
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                            <p className="font-mono text-[10px] uppercase tracking-ribbon text-white/45">
                                {m.role}
                            </p>
                            <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-[-0.01em] text-white">
                                {m.name}
                            </h3>
                            {m.handle ? (
                                <p className="mt-1 font-mono text-[11px] text-white/55">
                                    {m.handle}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <p className="mt-5 max-w-xl flex-1 text-sm leading-6 text-white/65">
                        {m.contributions}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-console text-white/55 transition group-hover:text-white">
                            LinkedIn · View profile
                        </span>
                        <ArrowUpRight className="size-3.5 text-white/35 transition duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white" />
                    </div>
                </a>
            ))}
        </div>
    );
}
