"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import {
    Activity,
    ArrowRight,
    BrainCircuit,
    CheckCircle2,
    Clock3,
    Gauge,
    Headphones,
    MapPin,
    RadioTower,
    ShieldAlert,
    Siren,
    Sparkles,
    Workflow,
} from "lucide-react";

const outcomeStats = [
    { label: "Calls triaged", value: "146", tone: "text-cyan-200" },
    { label: "Avg. pickup", value: "0:05", tone: "text-emerald-200" },
    { label: "Active units", value: "24", tone: "text-amber-200" },
];

const features = [
    {
        icon: BrainCircuit,
        title: "AI intake that keeps callers talking",
        copy: "The operator asks calm follow-ups, extracts location and risk, and keeps the transcript ready for human review.",
    },
    {
        icon: MapPin,
        title: "Live geospatial context",
        copy: "Incidents appear with severity, caller summary, street context, and recommended dispatch posture in one view.",
    },
    {
        icon: Workflow,
        title: "Human transfer preview",
        copy: "The demo shows how a dispatcher handoff would package the AI-generated context trail without initiating a live transfer.",
    },
];

const workflow = [
    "Caller reaches DispatchAI instantly",
    "AI extracts location, severity, and caller emotion",
    "Operator reviews the live incident package",
    "Units receive a concise, verified handoff",
];

const incidents = [
    {
        title: "Earthquake injuries",
        location: "Golden Gate Bridge",
        severity: "Critical",
        time: "00:11",
    },
    {
        title: "Medical distress",
        location: "Mission District",
        severity: "High",
        time: "02:42",
    },
    {
        title: "Smoke report",
        location: "SoMa",
        severity: "Monitor",
        time: "04:18",
    },
];

export default function Home() {
    const { isSignedIn } = useAuth();

    return (
        <div className="min-h-screen overflow-hidden bg-[#070b10] text-slate-50">
            <div className="pointer-events-none fixed inset-0 opacity-70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_78%_2%,rgba(245,158,11,0.18),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
            </div>

            <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070b10]/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                    >
                        <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.22)]">
                            <Siren className="size-5 text-cyan-200" />
                            <span className="absolute inset-x-2 bottom-1 h-px bg-cyan-200/70" />
                        </span>
                        <span>
                            <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-white">
                                DispatcherAI
                            </span>
                            <span className="block text-xs text-slate-400">
                                Emergency response cockpit
                            </span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
                        <a
                            href="#features"
                            className="transition hover:text-white"
                        >
                            Features
                        </a>
                        <a
                            href="#workflow"
                            className="transition hover:text-white"
                        >
                            Flow
                        </a>
                        <Link
                            href="/data-management"
                            className="transition hover:text-white"
                            prefetch={false}
                        >
                            Analytics
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        {isSignedIn ? (
                            <UserButton />
                        ) : (
                            <SignInButton>
                                <Button
                                    variant="outline"
                                    className="hidden border-white/15 bg-white/5 text-white hover:bg-white/10 sm:inline-flex"
                                >
                                    Log in
                                </Button>
                            </SignInButton>
                        )}

                        <Button
                            asChild
                            className="bg-cyan-200 text-slate-950 hover:bg-cyan-100"
                        >
                            <Link
                                href="/live"
                                prefetch={false}
                            >
                                Try demo
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="flex flex-col justify-center">
                        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-amber-100">
                            <RadioTower className="size-3.5" />
                            Live demo ready
                        </div>

                        <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                            The calmest voice in the first ten seconds of an
                            emergency.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            DispatcherAI gives callers an immediate response,
                            gathers the facts that matter, and packages every
                            incident for a human dispatcher in a live operations
                            cockpit.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 bg-cyan-200 px-6 text-base text-slate-950 hover:bg-cyan-100"
                            >
                                <Link
                                    href="/live"
                                    prefetch={false}
                                >
                                    Open live dispatch
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 border-white/15 bg-white/5 px-6 text-base text-white hover:bg-white/10"
                            >
                                <Link
                                    href="/data-management"
                                    prefetch={false}
                                >
                                    View analytics
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                            {outcomeStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20"
                                >
                                    <p
                                        className={`font-mono text-2xl font-semibold ${stat.tone}`}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-6 rounded-[2rem] bg-cyan-300/10 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c121a]/95 shadow-2xl shadow-black/50">
                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                                        Live dispatch
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        San Francisco emergency grid
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                                    <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
                                    LIVE
                                </div>
                            </div>

                            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                                <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
                                    <div className="mb-4 flex items-center justify-between">
                                        <p className="text-sm font-semibold text-white">
                                            Incident queue
                                        </p>
                                        <span className="rounded-full bg-cyan-300/10 px-2 py-1 font-mono text-xs text-cyan-200">
                                            3 open
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {incidents.map((incident, index) => (
                                            <div
                                                key={incident.title}
                                                className={`rounded-2xl border p-4 ${
                                                    index === 0
                                                        ? "border-amber-300/35 bg-amber-300/10"
                                                        : "border-white/10 bg-white/[0.035]"
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="text-sm font-semibold text-white">
                                                            {incident.title}
                                                        </p>
                                                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                                            <MapPin className="size-3.5" />
                                                            {incident.location}
                                                        </p>
                                                    </div>
                                                    <span className="font-mono text-xs text-slate-400">
                                                        {incident.time}
                                                    </span>
                                                </div>
                                                <div className="mt-3 flex items-center gap-2 text-xs">
                                                    <ShieldAlert className="size-4 text-amber-200" />
                                                    <span className="uppercase tracking-[0.18em] text-amber-100">
                                                        {incident.severity}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex size-10 items-center justify-center rounded-full bg-cyan-200 text-slate-950">
                                                <Headphones className="size-5" />
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    AI operator connected
                                                </p>
                                                <p className="text-xs text-cyan-100/70">
                                                    Caller stabilized, location
                                                    confirmed
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        {[
                                            [
                                                "Caller",
                                                "There was a quake. People are hurt on the bridge.",
                                            ],
                                            [
                                                "AI Dispatcher",
                                                "I have your location. Stay away from traffic lanes. Help is being routed now.",
                                            ],
                                            [
                                                "AI Dispatcher",
                                                "Are there fires, water hazards, or anyone unconscious near you?",
                                            ],
                                        ].map(([role, message]) => (
                                            <div
                                                key={message}
                                                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                                            >
                                                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                    {role}
                                                </p>
                                                <p className="text-sm leading-6 text-slate-200">
                                                    {message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                                            <Gauge className="mb-3 size-5 text-emerald-200" />
                                            <p className="font-mono text-2xl text-white">
                                                91%
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Context confidence
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                                            <Clock3 className="mb-3 size-5 text-amber-200" />
                                            <p className="font-mono text-2xl text-white">
                                                18s
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Time to package
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="features"
                    className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
                >
                    <div className="max-w-3xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                            What the demo shows
                        </p>
                        <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                            Built for the messy middle between panic and
                            dispatch.
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-cyan-200/[0.06]"
                            >
                                <feature.icon className="size-7 text-cyan-200" />
                                <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-white">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-400">
                                    {feature.copy}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    id="workflow"
                    className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
                >
                    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]">
                        <div className="grid gap-8 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-10">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                                    <Activity className="size-3.5 text-emerald-200" />
                                    Operator flow
                                </div>
                                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white">
                                    A better handoff, not a black box.
                                </h2>
                                <p className="mt-4 text-sm leading-6 text-slate-400">
                                    The demo highlights the handoff that
                                    matters: AI keeps the caller engaged while
                                    the human operator gets a clean incident
                                    card, transcript, and confidence signals.
                                </p>
                            </div>

                            <div className="grid gap-3">
                                {workflow.map((step, index) => (
                                    <div
                                        key={step}
                                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#070b10]/70 p-4"
                                    >
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-200/10 font-mono text-sm text-cyan-100">
                                            0{index + 1}
                                        </span>
                                        <p className="font-medium text-slate-100">
                                            {step}
                                        </p>
                                        {index === workflow.length - 1 ? (
                                            <CheckCircle2 className="ml-auto size-5 text-emerald-200" />
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
                    <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.08] p-8 text-center sm:p-12">
                        <Sparkles className="mx-auto mb-5 size-8 text-amber-100" />
                        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] text-white">
                            Run the demo as a dispatcher, then inspect the
                            analytics like a commander.
                        </h2>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 bg-amber-200 px-6 text-base text-slate-950 hover:bg-amber-100"
                            >
                                <Link
                                    href="/live"
                                    prefetch={false}
                                >
                                    Launch demo
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 border-white/15 bg-white/5 px-6 text-base text-white hover:bg-white/10"
                            >
                                <Link
                                    href="/data-management"
                                    prefetch={false}
                                >
                                    Open analytics
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
