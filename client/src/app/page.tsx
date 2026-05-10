"use client";

import Link from "next/link";
import { DossierMark } from "@/components/brand/DossierMark";
import { AwardBlock } from "@/components/case-study/AwardBlock";
import { CockpitPreview } from "@/components/case-study/CockpitPreview";
import { DemoVideo } from "@/components/case-study/DemoVideo";
import { Footnotes } from "@/components/case-study/Footnotes";
import { HeroRibbon } from "@/components/case-study/HeroRibbon";
import { ModelCard } from "@/components/case-study/ModelCard";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { SystemDiagram } from "@/components/case-study/SystemDiagram";
import { TeamCard } from "@/components/case-study/TeamCard";
import { Button } from "@/components/ui/button";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import {
    ArrowRight,
    BookOpen,
    GitBranch,
    Layers,
    PlayCircle,
    Sparkles,
} from "lucide-react";

const problemStats = [
    {
        value: "60s+",
        label: "Average 911 wait time during peak demand in major US cities, per dispatcher field reports.",
    },
    {
        value: "50%",
        label: "Of calls reportedly involve information that could be triaged or pre-filled before a human picks up.",
    },
    {
        value: "1",
        label: "Human dispatcher per call — protected. The AI fills wait time, never replaces final authority.",
    },
];

const tradeoffs = [
    {
        title: "Dataset is small.",
        body: "The public training snapshot has 518 transcripts. We ship the model and the dataset openly so it can be audited and grown — not as a finished product.",
    },
    {
        title: "Bias is real.",
        body: "Accents, dialects, and cultural variation in distress aren't represented uniformly in 518 transcripts or in Hume's emotion model. Any production deployment requires demographic-stratified evals first.",
    },
    {
        title: "Humans dispatch.",
        body: "The system is explicitly assist-only. Recommendations carry a confidence score; the dispatcher accepts, edits, or rejects. No outbound dispatch is initiated by the AI.",
    },
    {
        title: "Procurement is hard.",
        body: "PSAPs need NENA / CJIS / SOC 2 alignment, integrations with legacy CAD and i3 NG911, and 6–18 month sales cycles. The hackathon build was deliberately scoped as a credible prototype, not a shipping product.",
    },
];

const productHighlights = [
    {
        icon: Layers,
        title: "Real-time call cockpit",
        body: "Incident queue, severity-coded map pins, live transcript, caller emotion, and street view assembled from a single FastAPI orchestrator.",
    },
    {
        icon: BookOpen,
        title: "Empathy as a first-class signal",
        body: "Hume EVI emotion telemetry feeds the LLM context window so the agent's wording calibrates to the caller's distress, not just their words.",
    },
    {
        icon: GitBranch,
        title: "Human-in-the-loop by construction",
        body: "Every action surfaces with provenance and confidence. Transfer is gated to a human dispatcher; the AI never closes the loop alone.",
    },
];

export default function Home() {
    const { isSignedIn } = useAuth();

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-ink text-white">
            {/* Atmospheric background */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 z-0"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(244,176,31,0.10),transparent_38%),radial-gradient(circle_at_82%_-2%,rgba(255,59,48,0.10),transparent_36%),linear-gradient(180deg,#0a0b0d_0%,#06070a_60%,#0a0b0d_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(180deg,black,transparent_85%)]" />
            </div>

            <HeroRibbon
                rightSlot={
                    <div className="flex shrink-0 items-center gap-2">
                        {isSignedIn ? (
                            <UserButton />
                        ) : (
                            <SignInButton>
                                <button className="hidden h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[3px] border border-white/15 bg-white/[0.04] px-3 font-mono text-[10px] uppercase tracking-console text-white transition hover:border-white/30 hover:bg-white/[0.08] sm:inline-flex">
                                    Sign in
                                </button>
                            </SignInButton>
                        )}
                        <Button
                            asChild
                            className="h-8 shrink-0 whitespace-nowrap rounded-[3px] bg-sodium px-3.5 font-mono text-[10px] uppercase tracking-console text-ink hover:bg-sodium-soft"
                        >
                            <Link
                                href="/live"
                                prefetch={false}
                            >
                                <span className="hidden lg:inline">
                                    Open live console
                                </span>
                                <span className="lg:hidden">Open console</span>
                                <ArrowRight className="ml-1.5 size-3.5" />
                            </Link>
                        </Button>
                    </div>
                }
            />

            <main className="relative z-10">
                {/* HERO */}
                <section className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-20">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-white/55">
                            Case study &middot; June 2024
                        </p>

                        <h1 className="mt-5 max-w-3xl font-display text-[44px] font-medium leading-[1.02] tracking-[-0.025em] text-white sm:text-[56px] lg:text-[64px] xl:text-[68px]">
                            An empathetic AI that{" "}
                            <span className="display-italic text-sodium-soft">
                                holds the line
                            </span>{" "}
                            in the first ten seconds of an emergency.
                        </h1>

                        <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                            DispatchAI answers 911 calls instantly, calibrates
                            its tone to the caller&apos;s emotion, extracts
                            location and severity in real time, and packages
                            every incident for a human dispatcher in a live
                            operator console. Built in 36 hours at the UC
                            Berkeley AI Hackathon &mdash; and it won.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-[4px] bg-sodium px-6 text-base font-semibold text-ink hover:bg-sodium-soft"
                            >
                                <Link
                                    href="/live"
                                    prefetch={false}
                                >
                                    Open live console
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-[4px] border-white/15 bg-white/[0.03] px-6 text-base text-white hover:border-white/30 hover:bg-white/[0.06]"
                            >
                                <a href="#preview">
                                    <PlayCircle className="mr-2 size-4 text-sodium" />
                                    Tour the console
                                </a>
                            </Button>
                        </div>

                        <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                            {[
                                {
                                    k: "Award",
                                    v: "Grand Prize",
                                    s: "UC Berkeley AI Hackathon",
                                },
                                {
                                    k: "Field",
                                    v: "1 / 293",
                                    s: "of 930 builders",
                                },
                                {
                                    k: "Outcome",
                                    v: "$25K + Pad-13",
                                    s: "SkyDeck Fund",
                                },
                            ].map((s) => (
                                <div
                                    key={s.k}
                                    className="border-l border-white/10 pl-4"
                                >
                                    <dt className="text-xs text-white/45">
                                        {s.k}
                                    </dt>
                                    <dd className="mt-1.5 text-xl font-medium text-white">
                                        {s.v}
                                    </dd>
                                    <dd className="mt-0.5 text-xs text-white/45">
                                        {s.s}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Hero side — panel feedback / build stats */}
                    <div className="relative">
                        <div className="panel-raised relative overflow-hidden rounded-[6px]">
                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                                <span className="text-xs font-medium text-white/55">
                                    Panel feedback
                                </span>
                                <span className="text-xs text-white/40">
                                    June 23, 2024
                                </span>
                            </div>
                            <blockquote className="px-7 py-8">
                                <p className="font-display text-2xl leading-[1.35] text-white sm:text-[26px]">
                                    Empathetic, technically deep, and the
                                    judges felt the demo could plausibly help
                                    real dispatchers tomorrow morning. That
                                    combination is what won the room.
                                </p>
                                <footer className="mt-6 flex items-center gap-3">
                                    <DossierMark
                                        size="sm"
                                        showWordmark={false}
                                    />
                                    <div>
                                        <p className="text-sm text-white/80">
                                            Cal Hacks &middot; Berkeley
                                            SkyDeck &middot; Intel
                                        </p>
                                        <p className="text-xs text-white/45">
                                            UC Berkeley AI Hackathon panel
                                        </p>
                                    </div>
                                </footer>
                            </blockquote>
                            <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/10">
                                {[
                                    { l: "Built in", v: "36 h" },
                                    { l: "Stack lines", v: "≈ 6.4k" },
                                    { l: "Open source", v: "Model + data" },
                                ].map((s) => (
                                    <div key={s.l} className="px-5 py-4">
                                        <p className="text-xs text-white/45">
                                            {s.l}
                                        </p>
                                        <p className="mt-1 text-lg font-medium text-white">
                                            {s.v}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* AWARD */}
                <section
                    id="award"
                    className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                    <SectionHeading
                        index="01"
                        eyebrow="The win"
                        title={
                            <>
                                Grand Prize, Best Use of Intel AI &mdash; and a
                                Pad-13 Golden Ticket.
                            </>
                        }
                        deck="At the UC Berkeley AI Hackathon (June 22–23, 2024), DispatchAI took the room. 930 builders, 293 submissions, organized by Cal Hacks and Berkeley SkyDeck."
                    />
                    <div className="mt-12">
                        <AwardBlock />
                    </div>
                </section>

                {/* PROBLEM */}
                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <SectionHeading
                        index="02"
                        eyebrow="The problem"
                        title={
                            <>
                                The first ten seconds of a call decide
                                everything &mdash; and the line is often
                                empty.
                            </>
                        }
                        deck="Peak-load 911 centres routinely run minute-plus pickup queues. The agent in distress hears hold music. The dispatcher, two callers in, has no context. We wanted to fill that gap without removing the human from the chain."
                    />
                    <div className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-white/12 bg-white/10 sm:grid-cols-3">
                        {problemStats.map((s) => (
                            <div
                                key={s.value}
                                className="bg-ink-panel p-7"
                            >
                                <p className="font-display text-5xl font-medium text-white">
                                    {s.value}
                                </p>
                                <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {productHighlights.map((p) => (
                            <article
                                key={p.title}
                                className="panel rounded-[4px] p-6"
                            >
                                <p.icon
                                    className="size-5 text-white/55"
                                    strokeWidth={1.5}
                                />
                                <h3 className="mt-5 font-display text-xl text-white">
                                    {p.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/60">
                                    {p.body}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* DEMO */}
                <section
                    id="demo"
                    className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                    <SectionHeading
                        index="03"
                        eyebrow="The artifact"
                        title={
                            <>
                                A 911 call answered, triaged, and handed to a
                                human &mdash; in one minute.
                            </>
                        }
                        deck="Watch the submission video the team showed the panel. Same flow, same UI, same model — recorded the morning of judging."
                    />
                    <div className="mt-12">
                        <DemoVideo />
                    </div>
                </section>

                {/* SYSTEM */}
                <section
                    id="system"
                    className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                    <SectionHeading
                        index="04"
                        eyebrow="The system"
                        title={
                            <>
                                Telephony, voice agent, emotion, inference,
                                operator &mdash; all wired through one FastAPI
                                orchestrator.
                            </>
                        }
                        deck="The voice loop is real-time. The model loop is async with confidence scores. The operator surface is a Next.js cockpit polling /api/calls every 5 seconds and merging server state with the active session."
                    />
                    <div className="mt-12">
                        <SystemDiagram />
                    </div>
                </section>

                {/* MODEL */}
                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <SectionHeading
                        index="05"
                        eyebrow="The model"
                        title={
                            <>
                                A LoRA-tuned Mistral-7B, accelerated 10x on
                                Intel Dev Cloud.
                            </>
                        }
                        deck="The team curated 911 call transcripts, fine-tuned with PEFT/LoRA, and ran inference on an Intel Data Center GPU Max 1100 using the Intel Extension for PyTorch. Both the model and a public snapshot of the dataset are open-sourced under MIT."
                    />
                    <div className="mt-12">
                        <ModelCard />
                    </div>
                </section>

                {/* PREVIEW */}
                <section
                    id="preview"
                    className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                    <SectionHeading
                        index="06"
                        eyebrow="The interface"
                        title={
                            <>
                                The operator console &mdash; deliberately
                                dense, deliberately calm.
                            </>
                        }
                        deck="A non-interactive replica below renders against the same seeded incidents the live system uses for demo onboarding. Click an incident on the left to see the dossier, transcript and emotion update."
                    />
                    <div className="mt-12">
                        <CockpitPreview />
                    </div>

                    <div className="mt-8 flex flex-col items-start gap-3 rounded-[4px] border border-sodium/30 bg-sodium/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <Sparkles className="size-5 text-sodium" />
                            <div>
                                <p className="font-display text-lg leading-tight text-white">
                                    Want the real thing?
                                </p>
                                <p className="text-sm text-white/65">
                                    The live console wires up Clerk auth, the
                                    Retell voice loop, and Cloud Run polling.
                                </p>
                            </div>
                        </div>
                        <Button
                            asChild
                            className="h-11 rounded-[4px] bg-sodium px-5 text-sm font-semibold text-ink hover:bg-sodium-soft"
                        >
                            <Link
                                href="/live"
                                prefetch={false}
                            >
                                Open live console
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* TEAM */}
                <section
                    id="team"
                    className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                    <SectionHeading
                        index="07"
                        eyebrow="The team"
                        title={<>Four builders. Two days. One operator console.</>}
                        deck="Roles and contributions reproduced from the team's submission and follow-up posts. This portfolio belongs to one of the four — flagged below."
                    />
                    <div className="mt-12">
                        <TeamCard />
                    </div>
                </section>

                {/* TRADEOFFS */}
                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <SectionHeading
                        index="08"
                        eyebrow="Tradeoffs &amp; honest limits"
                        title={
                            <>
                                What this build is honest about &mdash; and
                                what it isn&apos;t pretending to be.
                            </>
                        }
                        deck="Public-safety AI without an explicit limits page is a red flag. Here are the four most relevant ones."
                    />
                    <div className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                        {tradeoffs.map((t) => (
                            <article
                                key={t.title}
                                className="bg-ink-panel p-7"
                            >
                                <p className="text-xs font-medium text-signal/85">
                                    Caveat
                                </p>
                                <h3 className="mt-3 font-display text-xl text-white">
                                    {t.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/65">
                                    {t.body}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* SOURCES */}
                <section
                    id="sources"
                    className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                    <SectionHeading
                        index="09"
                        eyebrow="Notes &amp; sources"
                        title={
                            <>
                                Every claim on this page is traceable to a
                                public artifact.
                            </>
                        }
                        deck="GitHub, Devpost, Hugging Face, YouTube, Figma, and the original Vercel deployment. Recruiters &mdash; click through; nothing is hand-waved."
                    />
                    <div className="mt-10">
                        <Footnotes />
                    </div>
                </section>

                {/* CLOSER */}
                <section className="mx-auto max-w-7xl px-4 pb-32 pt-12 sm:px-6 lg:px-8">
                    <div className="grid gap-px overflow-hidden rounded-[6px] border border-white/12 bg-white/10 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="bg-ink-panel p-8 sm:p-10">
                            <p className="text-sm font-medium text-white/55">
                                Try it
                            </p>
                            <h3 className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">
                                Step into the live console as a dispatcher.
                            </h3>
                            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
                                Sign in (Clerk), add a phone number for the
                                Retell voice agent to call, and the cockpit
                                opens with the seeded incidents merged into
                                live polling.
                            </p>
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 rounded-[4px] bg-sodium px-6 text-base font-semibold text-ink hover:bg-sodium-soft"
                                >
                                    <Link
                                        href="/live"
                                        prefetch={false}
                                    >
                                        Open live console
                                        <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="h-12 rounded-[4px] border-white/15 bg-white/[0.03] px-6 text-base text-white hover:border-white/30 hover:bg-white/[0.06]"
                                >
                                    <a
                                        href="https://www.youtube.com/watch?v=hdpdgxrilQM"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <PlayCircle className="mr-2 size-4 text-white/70" />
                                        Watch the original demo
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div className="bg-ink-panel p-8 sm:p-10">
                            <p className="text-sm font-medium text-white/55">
                                Sources
                            </p>
                            <ul className="mt-5 space-y-3.5 text-sm">
                                {[
                                    {
                                        l: "Repo",
                                        h: "https://github.com/DispatcherAI/DispatcherAI",
                                        n: "DispatcherAI/DispatcherAI",
                                    },
                                    {
                                        l: "Submission",
                                        h: "https://devpost.com/software/dispatch-ai",
                                        n: "Devpost submission",
                                    },
                                    {
                                        l: "Model",
                                        h: "https://huggingface.co/spikecodes/ai-911-operator",
                                        n: "spikecodes/ai-911-operator",
                                    },
                                    {
                                        l: "Data",
                                        h: "https://huggingface.co/datasets/spikecodes/911-call-transcripts",
                                        n: "spikecodes/911-call-transcripts",
                                    },
                                ].map((s) => (
                                    <li
                                        key={s.l}
                                        className="flex items-baseline gap-3"
                                    >
                                        <span className="w-24 shrink-0 text-xs text-white/45">
                                            {s.l}
                                        </span>
                                        <a
                                            className="text-white/85 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-white/40"
                                            href={s.h}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {s.n}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-7 border-t border-white/10 pt-5 text-xs text-white/45">
                                This portfolio cut maintained by Bill Zhang
                                &middot; Original build summer 2024
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
