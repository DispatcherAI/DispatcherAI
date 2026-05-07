"use client";

import { useMemo, useState } from "react";
import { MESSAGES } from "@/app/(layout)/live/messages";
import { DispatchCall } from "@/app/(layout)/live/page";
import { cn } from "@/lib/utils";
import {
    HeadphonesIcon,
    MapPinIcon,
    PhoneForwardedIcon,
    RadioTowerIcon,
    ShieldAlertIcon,
} from "lucide-react";

const STREET_VIEW_PREFIX = "data:image/jpeg;base64,";

const callKey = "CA22ccebaacd73dcefa23f9b41a9bce0b3";

const synthetic = {
    "synthetic-medical": {
        id: "synthetic-medical",
        createdAt: new Date("2024-06-23T22:50:11.123456"),
        endedAt: null,
        inProgress: true,
        status: "Active",
        userId: "000",
        transcript: { transcript: [] },
        callAnalytics: {
            id: "synthetic-medical",
            callId: "synthetic-medical",
            createdAt: new Date("2024-06-23T22:50:11.123456"),
            updatedAt: new Date("2024-06-23T22:50:11.123456"),
            type: "Medical",
            severity: "High",
            title: "Cardiac distress · Mission District",
            summary:
                "Caller reports chest pain on a male in his 60s. Conscious, breathing shallow.",
            sentiment: [
                { emotion: "Anxiety", intensity: 0.41 },
                { emotion: "Distress", intensity: 0.36 },
            ],
            topics: [],
            location: "Mission District, San Francisco",
            latitude: 37.7599,
            longitude: -122.4148,
            name: "",
            address: "",
            recommendation: "",
            streetView: "",
        },
    },
    "synthetic-fire": {
        id: "synthetic-fire",
        createdAt: new Date("2024-06-23T22:46:18.000000"),
        endedAt: null,
        inProgress: true,
        status: "Active",
        userId: "000",
        transcript: { transcript: [] },
        callAnalytics: {
            id: "synthetic-fire",
            callId: "synthetic-fire",
            createdAt: new Date("2024-06-23T22:46:18.000000"),
            updatedAt: new Date("2024-06-23T22:46:18.000000"),
            type: "Fire",
            severity: "Medium",
            title: "Smoke report · SoMa rooftop",
            summary:
                "Light smoke from a 4-story rooftop near 5th & Bryant. No flames visible.",
            sentiment: [{ emotion: "Concern", intensity: 0.27 }],
            topics: [],
            location: "SoMa, San Francisco",
            latitude: 37.7785,
            longitude: -122.4034,
            name: "",
            address: "",
            recommendation: "",
            streetView: "",
        },
    },
} as unknown as Record<string, DispatchCall>;

const SEVERITY_TONE: Record<string, { bar: string; label: string; chip: string }> = {
    Critical: {
        bar: "bg-signal",
        label: "text-signal",
        chip: "border-signal/40 bg-signal/10 text-signal",
    },
    High: {
        bar: "bg-signal",
        label: "text-signal",
        chip: "border-signal/40 bg-signal/10 text-signal",
    },
    Medium: {
        bar: "bg-sodium",
        label: "text-sodium",
        chip: "border-sodium/40 bg-sodium/10 text-sodium",
    },
    Low: {
        bar: "bg-phosphor",
        label: "text-phosphor",
        chip: "border-phosphor/40 bg-phosphor/10 text-phosphor",
    },
    Resolved: {
        bar: "bg-white/30",
        label: "text-white/55",
        chip: "border-white/15 bg-white/[0.04] text-white/55",
    },
};

function severityKey(s: string | null | undefined): keyof typeof SEVERITY_TONE {
    if (!s) return "Medium";
    const cap = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    return (Object.prototype.hasOwnProperty.call(SEVERITY_TONE, cap)
        ? cap
        : "Medium") as keyof typeof SEVERITY_TONE;
}

// Seeded MESSAGES carry the original 2024-06-23 timestamps so the live
// cockpit's data shape stays untouched. For the preview, surface a stable
// per-incident "live" elapsed label so the cards read as ongoing dispatch
// rather than 16,000+ hours of real elapsed time.
const PREVIEW_ELAPSED: Record<string, string> = {
    [callKey]: "04:12",
    "synthetic-medical": "02:47",
    "synthetic-fire": "01:33",
};

function MapBackdrop({ accent }: { accent: "sodium" | "signal" | "phosphor" }) {
    const accentHex = {
        sodium: "#F4B01F",
        signal: "#FF3B30",
        phosphor: "#7BFFB2",
    }[accent];
    return (
        <svg
            viewBox="0 0 600 380"
            className="h-full w-full"
            aria-hidden
        >
            <defs>
                <pattern
                    id="map-grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 32 0 L 0 0 0 32"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                </pattern>
                <radialGradient
                    id="halo"
                    cx="50%"
                    cy="50%"
                    r="50%"
                >
                    <stop
                        offset="0%"
                        stopColor={accentHex}
                        stopOpacity="0.5"
                    />
                    <stop
                        offset="60%"
                        stopColor={accentHex}
                        stopOpacity="0.05"
                    />
                    <stop
                        offset="100%"
                        stopColor={accentHex}
                        stopOpacity="0"
                    />
                </radialGradient>
            </defs>
            <rect
                width="600"
                height="380"
                fill="#0A0B0D"
            />
            <rect
                width="600"
                height="380"
                fill="url(#map-grid)"
            />
            {/* Suggestive coastline */}
            <path
                d="M0,260 C60,240 120,220 200,210 C260,205 320,225 380,235 C460,245 520,265 600,260 L600,380 L0,380 Z"
                fill="rgba(105,210,255,0.05)"
                stroke="rgba(105,210,255,0.18)"
                strokeWidth="1"
            />
            {/* Bridge */}
            <path
                d="M40,150 C160,120 320,120 560,150"
                fill="none"
                stroke={accentHex}
                strokeOpacity="0.55"
                strokeWidth="1.4"
                strokeDasharray="4 4"
            />
            {/* Streets */}
            <g
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.8"
            >
                <line x1="0" y1="80" x2="600" y2="80" />
                <line x1="0" y1="120" x2="600" y2="120" />
                <line x1="0" y1="200" x2="600" y2="200" />
                <line x1="120" y1="0" x2="120" y2="380" />
                <line x1="280" y1="0" x2="280" y2="380" />
                <line x1="440" y1="0" x2="440" y2="380" />
            </g>
            {/* Selected pin halo */}
            <circle cx="300" cy="170" r="120" fill="url(#halo)" />
            <circle
                cx="300"
                cy="170"
                r="6"
                fill={accentHex}
            />
            <circle
                cx="300"
                cy="170"
                r="14"
                fill="none"
                stroke={accentHex}
                strokeWidth="1"
                strokeOpacity="0.6"
            />
            {/* Other pins */}
            <circle cx="180" cy="240" r="4" fill="#F4B01F" />
            <circle cx="430" cy="220" r="4" fill="#7BFFB2" />
        </svg>
    );
}

export function CockpitPreview() {
    const seedCall = MESSAGES[callKey];
    const queue = useMemo(() => {
        return [seedCall, synthetic["synthetic-medical"], synthetic["synthetic-fire"]];
    }, [seedCall]);

    const [selectedId, setSelectedId] = useState<string>(seedCall?.id ?? "");
    const selected = queue.find((c) => c.id === selectedId) ?? seedCall;
    const transcript = selected?.transcript as
        | { transcript: { role: string; content: string }[] }
        | undefined;
    const sentiment = (selected?.callAnalytics.sentiment ?? []) as {
        emotion: string;
        intensity: number;
    }[];

    const sevTone = SEVERITY_TONE[severityKey(selected?.callAnalytics.severity)];

    return (
        <div className="relative overflow-hidden rounded-[6px] border border-white/12 bg-ink-deep">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                    <span className="size-2.5 rounded-full bg-white/25" />
                    <span className="size-2.5 rounded-full bg-white/25" />
                    <span className="size-2.5 rounded-full bg-white/25" />
                    <span className="ml-3 text-xs text-white/55">
                        DispatchAI &middot; Operator console
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/55">
                    <span className="size-1.5 rounded-full bg-phosphor" />
                    <span>Read-only preview</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/10 lg:grid-cols-[280px_1fr_320px]">
                {/* Queue */}
                <aside className="flex h-full flex-col bg-ink-panel p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white/75">
                            Incidents
                        </p>
                        <span className="text-xs text-white/45">
                            {queue.length} open
                        </span>
                    </div>
                    <ul className="mt-4 flex-1 space-y-2 overflow-hidden">
                        {queue.map((c) => {
                            const t =
                                SEVERITY_TONE[
                                    severityKey(c.callAnalytics.severity)
                                ];
                            const active = c.id === selectedId;
                            return (
                                <li key={c.id}>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedId(c.id)}
                                        className={cn(
                                            "group flex w-full items-stretch gap-3 rounded-[4px] border bg-steel-sunk/60 p-3 text-left transition",
                                            active
                                                ? "border-white/30 bg-white/[0.04]"
                                                : "border-white/8 hover:border-white/20",
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "w-1 shrink-0 rounded-[2px]",
                                                t.bar,
                                            )}
                                        />
                                        <span className="flex-1">
                                            <span className="flex items-center justify-between gap-3">
                                                <span
                                                    className={cn(
                                                        "text-[10px] font-medium uppercase tracking-wide",
                                                        t.label,
                                                    )}
                                                >
                                                    {c.callAnalytics
                                                        .severity ?? "Med"}
                                                </span>
                                                <span className="font-mono text-xs tabular-nums text-white/45">
                                                    {PREVIEW_ELAPSED[c.id] ??
                                                        "—"}
                                                </span>
                                            </span>
                                            <span className="mt-1 block text-[15px] font-medium leading-tight text-white">
                                                {c.callAnalytics.title}
                                            </span>
                                            <span className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                                                <MapPinIcon className="size-3" />
                                                {c.callAnalytics.location}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-4 rounded-[4px] border border-white/8 bg-white/[0.02] p-3 text-xs leading-5 text-white/55">
                        <p className="text-xs font-medium text-white/70">
                            Try this
                        </p>
                        <p className="mt-1.5">
                            Switch incidents on the left to see severity,
                            transcript, and emotion update across the cockpit.
                        </p>
                    </div>
                </aside>

                {/* Map + status */}
                <section className="relative flex h-full min-h-[420px] flex-col bg-ink-deep">
                    <div className="relative flex-1 overflow-hidden">
                        <MapBackdrop
                            accent={
                                severityKey(
                                    selected?.callAnalytics.severity,
                                ) === "Critical" ||
                                severityKey(
                                    selected?.callAnalytics.severity,
                                ) === "High"
                                    ? "signal"
                                    : "sodium"
                            }
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0)_0%,rgba(10,11,13,0)_60%,rgba(10,11,13,0.65)_100%)]" />

                        {/* Pin caption */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-[4px] border border-white/12 bg-ink/85 px-4 py-2 text-center backdrop-blur-sm">
                            <p className="text-xs text-white/55">
                                Selected incident
                            </p>
                            <p className="mt-0.5 text-sm font-medium text-white">
                                {selected?.callAnalytics.title}
                            </p>
                            <p className="font-mono text-xs tabular-nums text-white/55">
                                {selected?.callAnalytics.latitude?.toFixed(4)},{" "}
                                {selected?.callAnalytics.longitude?.toFixed(4)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Details + transcript */}
                <aside className="flex h-full flex-col bg-ink-panel">
                    <div className="border-b border-white/8 px-4 py-3">
                        <p className="text-sm font-medium text-white/75">
                            Details
                        </p>
                        <h3 className="mt-1.5 text-lg font-medium leading-tight text-white">
                            {selected?.callAnalytics.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-1.5">
                            <span
                                className={cn(
                                    "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                                    sevTone.chip,
                                )}
                            >
                                {selected?.callAnalytics.severity ?? "Medium"}
                            </span>
                            <span className="rounded-full border border-white/12 px-2 py-0.5 text-[10px] text-white/60">
                                {selected?.callAnalytics.type}
                            </span>
                        </div>
                    </div>

                    {selected?.callAnalytics.streetView ? (
                        <div className="border-b border-white/8 p-4">
                            <p className="text-xs font-medium text-white/65">
                                Street view
                            </p>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`${STREET_VIEW_PREFIX}${selected.callAnalytics.streetView}`}
                                alt="Street view of incident location"
                                className="mt-2 aspect-[16/10] w-full rounded-[4px] border border-white/8 object-cover"
                            />
                        </div>
                    ) : null}

                    <div className="border-b border-white/8 p-4">
                        <p className="text-xs font-medium text-white/65">
                            Caller emotion
                        </p>
                        <ul className="mt-2 space-y-2">
                            {sentiment.slice(0, 2).map((e) => (
                                <li key={e.emotion}>
                                    <div className="flex items-baseline justify-between text-xs">
                                        <span className="text-white/85">
                                            {e.emotion}
                                        </span>
                                        <span className="font-mono tabular-nums text-white/55">
                                            {(e.intensity * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/8">
                                        <div
                                            className="h-full bg-white/55"
                                            style={{
                                                width: `${Math.min(100, e.intensity * 100)}%`,
                                            }}
                                        />
                                    </div>
                                </li>
                            ))}
                            {sentiment.length === 0 ? (
                                <li className="text-xs text-white/45">
                                    No emotion data captured.
                                </li>
                            ) : null}
                        </ul>
                    </div>

                    <div className="flex-1 overflow-hidden p-4">
                        <p className="text-xs font-medium text-white/65">
                            Transcript
                        </p>
                        <div className="mt-2 max-h-[260px] space-y-2 overflow-y-auto pr-1">
                            {transcript?.transcript?.map((line, idx) => {
                                const isAgent = line.role === "agent";
                                return (
                                    <div
                                        key={idx}
                                        className="rounded-[4px] border border-white/10 bg-white/[0.02] p-2.5"
                                    >
                                        <div
                                            className={cn(
                                                "flex items-center gap-2 text-xs font-medium",
                                                isAgent
                                                    ? "text-phosphor"
                                                    : "text-white/65",
                                            )}
                                        >
                                            {isAgent ? (
                                                <HeadphonesIcon className="size-3" />
                                            ) : (
                                                <RadioTowerIcon className="size-3" />
                                            )}
                                            {isAgent
                                                ? "AI Dispatcher"
                                                : "Caller"}
                                        </div>
                                        <p className="mt-1 text-[13px] leading-5 text-white/85">
                                            {line.content}
                                        </p>
                                    </div>
                                );
                            })}
                            {!transcript?.transcript?.length ? (
                                <p className="text-xs text-white/45">
                                    No transcript captured for this seeded
                                    call.
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="border-t border-white/8 p-4">
                        <button
                            type="button"
                            disabled
                            className="flex w-full items-center justify-center gap-2 rounded-[4px] border border-white/12 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-white/70"
                        >
                            <PhoneForwardedIcon className="size-3.5" />
                            Transfer (preview)
                        </button>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/45">
                            <ShieldAlertIcon className="size-3" />
                            Human dispatcher remains the final authority
                        </p>
                    </div>
                </aside>
            </div>

            <div className="flex flex-col items-start justify-between gap-2 border-t border-white/10 px-4 py-3 text-xs text-white/45 sm:flex-row sm:items-center">
                <span>Read-only preview · sign in to open the live system</span>
                <span className="text-white/35">
                    Seeded incident · CA22…0b3 · 2024-06-23
                </span>
            </div>
        </div>
    );
}
