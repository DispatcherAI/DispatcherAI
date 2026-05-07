"use client";

import {
    ActivityIcon,
    ArrowDownRightIcon,
    ArrowUpRightIcon,
    BarChart3Icon,
    Clock3Icon,
    FileCheck2Icon,
    RadioTowerIcon,
    ShieldCheckIcon,
    SirenIcon,
    TrendingUpIcon,
} from "lucide-react";

const metrics = [
    {
        label: "Calls received",
        value: "146",
        delta: "+18%",
        icon: SirenIcon,
        positive: true,
    },
    {
        label: "Calls resolved",
        value: "139",
        delta: "95.2%",
        icon: ShieldCheckIcon,
        positive: true,
    },
    {
        label: "Avg pickup",
        value: "5s",
        delta: "−42s",
        icon: Clock3Icon,
        positive: true,
    },
    {
        label: "Escalations",
        value: "12",
        delta: "+3",
        icon: RadioTowerIcon,
        positive: false,
    },
];

const channels = [
    { label: "AI intake", value: "99.8%", width: "99%" },
    { label: "Human transfer", value: "98.1%", width: "98%" },
    { label: "Location confidence", value: "91.4%", width: "91%" },
    { label: "Transcript quality", value: "94.6%", width: "95%" },
];

const incidents = [
    {
        type: "Earthquake / injuries",
        area: "Golden Gate Bridge",
        response: "Fire + EMS",
        outcome: "Resolved",
        time: "10:00",
    },
    {
        type: "Medical distress",
        area: "Mission District",
        response: "EMS",
        outcome: "Transferred",
        time: "04:12",
    },
    {
        type: "Smoke report",
        area: "SoMa",
        response: "Fire watch",
        outcome: "Monitoring",
        time: "07:38",
    },
];

export default function Page() {
    return (
        <div className="h-full overflow-auto bg-ink/70 px-6 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* Hero */}
                <header className="overflow-hidden rounded-[4px] border border-white/10 bg-ink-panel">
                    <div className="border-b border-white/8 px-6 py-3 font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                        <span className="text-sodium">Analytics</span>{" "}
                        &middot; demo dataset &middot; not live
                    </div>
                    <div className="grid gap-8 p-6 lg:grid-cols-[1fr_360px]">
                        <div>
                            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                                <BarChart3Icon className="size-3.5" />
                                Commander view
                            </span>
                            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                                Throughput, transfer health, channel
                                reliability &mdash; one screen.
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
                                Numbers are seeded from the original
                                hackathon demo set. Wire to <code className="font-mono text-sodium">/api/calls</code> to populate from production polling.
                            </p>
                        </div>

                        <div className="rounded-[3px] border border-phosphor/30 bg-phosphor/[0.04] p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-[3px] border border-phosphor/40 bg-phosphor/[0.06] text-phosphor">
                                    <ActivityIcon className="size-4" />
                                </div>
                                <div>
                                    <p className="font-display text-sm text-white">
                                        Network nominal
                                    </p>
                                    <p className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                                        Demo channel · all green
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <div className="rounded-[3px] border border-white/10 bg-ink/60 p-3">
                                    <p className="font-display text-2xl text-white">
                                        24
                                    </p>
                                    <p className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                                        units active
                                    </p>
                                </div>
                                <div className="rounded-[3px] border border-white/10 bg-ink/60 p-3">
                                    <p className="font-display text-2xl text-white">
                                        3
                                    </p>
                                    <p className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                                        open events
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Metrics */}
                <section className="grid gap-px overflow-hidden rounded-[4px] border border-white/10 bg-white/8 sm:grid-cols-2 xl:grid-cols-4">
                    {metrics.map((metric) => (
                        <article
                            key={metric.label}
                            className="bg-ink-panel p-5"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <metric.icon
                                    className="size-4 text-sodium"
                                    strokeWidth={1.6}
                                />
                                <span
                                    className={`inline-flex items-center gap-1 rounded-[3px] border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-ribbon ${
                                        metric.positive
                                            ? "border-phosphor/40 bg-phosphor/[0.06] text-phosphor"
                                            : "border-signal/40 bg-signal/[0.06] text-signal"
                                    }`}
                                >
                                    {metric.positive ? (
                                        <ArrowDownRightIcon className="size-3" />
                                    ) : (
                                        <ArrowUpRightIcon className="size-3" />
                                    )}
                                    {metric.delta}
                                </span>
                            </div>
                            <p className="font-display text-4xl font-medium tracking-[-0.02em] text-white">
                                {metric.value}
                            </p>
                            <p className="mt-2 font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                                {metric.label}
                            </p>
                        </article>
                    ))}
                </section>

                {/* Reliability + recent */}
                <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <article className="rounded-[4px] border border-white/10 bg-ink-panel p-5">
                        <header className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                                    Reliability
                                </p>
                                <h2 className="mt-1.5 font-display text-xl text-white">
                                    Channel status
                                </h2>
                            </div>
                            <TrendingUpIcon className="size-4 text-phosphor" />
                        </header>

                        <div className="space-y-4">
                            {channels.map((channel) => (
                                <div key={channel.label}>
                                    <div className="mb-1.5 flex items-baseline justify-between">
                                        <span className="text-[13px] text-white">
                                            {channel.label}
                                        </span>
                                        <span className="font-mono text-[11px] tracking-[0.04em] text-white/65">
                                            {channel.value}
                                        </span>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                                        <div
                                            className="h-full rounded-full bg-sodium"
                                            style={{ width: channel.width }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-[4px] border border-white/10 bg-ink-panel p-5">
                        <header className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                                    Recent calls
                                </p>
                                <h2 className="mt-1.5 font-display text-xl text-white">
                                    Incident outcomes
                                </h2>
                            </div>
                            <FileCheck2Icon className="size-4 text-sodium" />
                        </header>

                        <div className="overflow-hidden rounded-[3px] border border-white/10">
                            <div className="grid grid-cols-[1.2fr_1fr_0.9fr_0.8fr_0.7fr] border-b border-white/10 bg-white/[0.025] px-4 py-2.5 font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                                <p>Type</p>
                                <p>Area</p>
                                <p>Response</p>
                                <p>Outcome</p>
                                <p className="text-right">Length</p>
                            </div>
                            {incidents.map((incident) => (
                                <div
                                    key={`${incident.type}-${incident.area}`}
                                    className="grid grid-cols-[1.2fr_1fr_0.9fr_0.8fr_0.7fr] items-center border-b border-white/8 px-4 py-3 text-[13px] last:border-b-0 hover:bg-white/[0.02]"
                                >
                                    <p className="text-white">{incident.type}</p>
                                    <p className="text-white/65">{incident.area}</p>
                                    <p className="text-white/65">{incident.response}</p>
                                    <p className="font-mono text-[11px] uppercase tracking-ribbon text-sodium">
                                        {incident.outcome}
                                    </p>
                                    <p className="text-right font-mono text-[12px] tracking-[0.04em] text-white/85">
                                        {incident.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
}
