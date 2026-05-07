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
        label: "Average pickup",
        value: "5 sec",
        delta: "-42 sec",
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
        time: "10m 00s",
    },
    {
        type: "Medical distress",
        area: "Mission District",
        response: "EMS",
        outcome: "Transferred",
        time: "04m 12s",
    },
    {
        type: "Smoke report",
        area: "SoMa",
        response: "Fire watch",
        outcome: "Monitoring",
        time: "07m 38s",
    },
];

export default function Page() {
    return (
        <div className="h-full overflow-auto bg-[#070b10]/70 px-6 py-6">
            <div className="mx-auto max-w-7xl space-y-6">
                <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30">
                    <div className="grid gap-6 p-6 lg:grid-cols-[1fr_360px]">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dp-primary/20 bg-dp-primary/10 px-3 py-1 text-xxs font-semibold uppercase tracking-[0.22em] text-dp-primary">
                                <BarChart3Icon className="size-3.5" />
                                Demo analytics
                            </div>
                            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] text-dp-headingText">
                                See whether the AI is reducing wait, improving
                                triage, and protecting handoff quality.
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-dp-text">
                                This page gives the demo a commander view:
                                throughput, transfer health, channel
                                reliability, and recent incident outcomes in one
                                place.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-dp-nonEmergency/20 bg-dp-nonEmergency/10 p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-dp-nonEmergency/15 text-dp-nonEmergency">
                                    <ActivityIcon className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-dp-headingText">
                                        System posture
                                    </p>
                                    <p className="text-xs text-dp-text">
                                        Live demo network nominal
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-white/10 bg-[#070b10]/50 p-3">
                                    <p className="font-mono text-2xl text-dp-headingText">
                                        24
                                    </p>
                                    <p className="text-xxs uppercase tracking-[0.18em] text-dp-text">
                                        units active
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-[#070b10]/50 p-3">
                                    <p className="font-mono text-2xl text-dp-headingText">
                                        3
                                    </p>
                                    <p className="text-xxs uppercase tracking-[0.18em] text-dp-text">
                                        open events
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <metric.icon className="size-5 text-dp-primary" />
                                <span
                                    className={`flex items-center gap-1 rounded-full border px-2 py-1 font-mono text-xs ${
                                        metric.positive
                                            ? "border-dp-nonEmergency/20 bg-dp-nonEmergency/10 text-dp-nonEmergency"
                                            : "border-dp-medium/20 bg-dp-medium/10 text-dp-medium"
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
                            <p className="font-mono text-4xl font-semibold tracking-[-0.04em] text-dp-headingText">
                                {metric.value}
                            </p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-dp-text">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-xxs font-semibold uppercase tracking-[0.22em] text-dp-primary">
                                    Reliability
                                </p>
                                <h2 className="mt-1 text-xl font-semibold text-dp-headingText">
                                    Communication status
                                </h2>
                            </div>
                            <TrendingUpIcon className="size-5 text-dp-nonEmergency" />
                        </div>

                        <div className="space-y-4">
                            {channels.map((channel) => (
                                <div key={channel.label}>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-dp-headingText">
                                            {channel.label}
                                        </span>
                                        <span className="font-mono text-dp-primary">
                                            {channel.value}
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-dp-primary shadow-[0_0_18px_rgba(105,210,255,0.5)]"
                                            style={{ width: channel.width }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-xxs font-semibold uppercase tracking-[0.22em] text-dp-primary">
                                    Recent calls
                                </p>
                                <h2 className="mt-1 text-xl font-semibold text-dp-headingText">
                                    Incident outcomes
                                </h2>
                            </div>
                            <FileCheck2Icon className="size-5 text-dp-primary" />
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-white/10">
                            <div className="grid grid-cols-[1.2fr_1fr_0.9fr_0.8fr_0.7fr] border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xxs font-semibold uppercase tracking-[0.18em] text-dp-text">
                                <p>Type</p>
                                <p>Area</p>
                                <p>Response</p>
                                <p>Outcome</p>
                                <p>Time</p>
                            </div>
                            {incidents.map((incident) => (
                                <div
                                    key={`${incident.type}-${incident.area}`}
                                    className="grid grid-cols-[1.2fr_1fr_0.9fr_0.8fr_0.7fr] border-b border-white/10 px-4 py-3 text-sm last:border-b-0"
                                >
                                    <p className="font-medium text-dp-headingText">
                                        {incident.type}
                                    </p>
                                    <p className="text-dp-text">
                                        {incident.area}
                                    </p>
                                    <p className="text-dp-text">
                                        {incident.response}
                                    </p>
                                    <p className="text-dp-primary">
                                        {incident.outcome}
                                    </p>
                                    <p className="font-mono text-dp-text">
                                        {incident.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
