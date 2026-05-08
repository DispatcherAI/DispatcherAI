"use client";

import dynamic from "next/dynamic";
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

const callKey = "CA22ccebaacd73dcefa23f9b41a9bce0b3";

// Static Street View imagery is pre-baked by `server/scripts/download_streetview.py`
// and committed to client/public/street-view. Keep these keys in sync with the
// `name` field on each StreetViewSpec in that script.
const STREET_VIEW_BY_ID: Record<string, string> = {
    [callKey]: "/street-view/golden-gate.jpg",
    "synthetic-medical": "/street-view/synthetic-medical.jpg",
    "synthetic-fire": "/street-view/synthetic-fire.jpg",
};

const Map = dynamic(() => import("@/components/live/map/Map"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 grid place-items-center bg-ink-deep">
            <span className="font-mono text-[10px] uppercase tracking-ribbon text-white/45">
                Loading map…
            </span>
        </div>
    ),
});

const synthetic = {
    "synthetic-medical": {
        id: "synthetic-medical",
        createdAt: new Date("2024-06-23T22:50:11.123456"),
        endedAt: null,
        inProgress: true,
        status: "Active",
        userId: "000",
        transcript: {
            transcript: [
                {
                    role: "agent",
                    content:
                        "9-1-1, an AI assistant is here with you — what's happening?",
                },
                {
                    role: "user",
                    content:
                        "It's my dad. He's holding his chest, he says it really hurts. He looks gray.",
                },
                {
                    role: "agent",
                    content:
                        "Okay. I'm sending paramedics now to your address. How old is he?",
                },
                {
                    role: "user",
                    content: "Sixty-two. He had a stent put in last year.",
                },
                {
                    role: "agent",
                    content:
                        "Thank you, that's important — I've added it to the dispatch note. Is he conscious and breathing?",
                },
                {
                    role: "user",
                    content: "Yes. He's awake. Breathing's fast though.",
                },
                {
                    role: "agent",
                    content:
                        "Have him sit upright and lean slightly forward. Loosen anything tight around his neck. Does he have aspirin in the house?",
                },
                {
                    role: "user",
                    content: "Yes, in the kitchen.",
                },
                {
                    role: "agent",
                    content:
                        "If he's not allergic, have him chew one regular-strength aspirin slowly — don't swallow it whole. Paramedics ETA three minutes.",
                },
                {
                    role: "user",
                    content: "Okay. Okay, I've got it. He's chewing it.",
                },
                {
                    role: "agent",
                    content:
                        "You're doing great. Stay with him. Tell me right away if his breathing changes or he stops responding.",
                },
            ],
        },
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
        transcript: {
            transcript: [
                {
                    role: "agent",
                    content:
                        "9-1-1 — this is an AI assistant. Where's the emergency?",
                },
                {
                    role: "user",
                    content:
                        "There's smoke coming off a roof. Bryant near 5th. Four-story building, dark smoke.",
                },
                {
                    role: "agent",
                    content:
                        "Okay, I have your location. Are flames visible anywhere?",
                },
                {
                    role: "user",
                    content:
                        "No flames yet. Just smoke from one corner of the roof. It's getting heavier.",
                },
                {
                    role: "agent",
                    content:
                        "Are you a safe distance away? Anyone you know inside the building?",
                },
                {
                    role: "user",
                    content:
                        "I'm across the street. I think it's a warehouse, I'm not sure if anyone's in there.",
                },
                {
                    role: "agent",
                    content:
                        "Stay back. SFFD has been notified — three engines and a truck are rolling, ETA four minutes. Don't approach the building.",
                },
                {
                    role: "user",
                    content: "Okay. I'll stay here.",
                },
                {
                    role: "agent",
                    content:
                        "If you see flames, anyone at a window, or hear an alarm or anyone shouting, tell me right away.",
                },
            ],
        },
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
            sentiment: [
                { emotion: "Concern", intensity: 0.27 },
                { emotion: "Calm", intensity: 0.18 },
            ],
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

    const [streetViewFailed, setStreetViewFailed] = useState<Set<string>>(
        () => new Set(),
    );

    const streetViewSrc = useMemo(() => {
        if (!selected) return null;
        if (streetViewFailed.has(selected.id)) return null;
        return STREET_VIEW_BY_ID[selected.id] ?? null;
    }, [selected, streetViewFailed]);

    const mapCenter = useMemo(
        () => ({
            lat: selected?.callAnalytics.latitude ?? 37.8199,
            lng: selected?.callAnalytics.longitude ?? -122.4786,
        }),
        [selected?.callAnalytics.latitude, selected?.callAnalytics.longitude],
    );

    const mapPins = useMemo(
        () =>
            queue.map((c) => ({
                coordinates: [
                    c.callAnalytics.latitude as number,
                    c.callAnalytics.longitude as number,
                ] as [number, number],
                popupHtml: `<b>${c.callAnalytics.title ?? "Incident"}</b><br>${c.callAnalytics.location ?? ""}`,
            })),
        [queue],
    );

    return (
        <div className="relative overflow-hidden rounded-[6px] border border-white/12 bg-ink-deep">
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

            <div className="grid grid-cols-1 gap-px bg-white/10 lg:h-[640px] lg:grid-cols-[280px_1fr_320px]">
                <aside className="flex h-full min-h-0 flex-col overflow-hidden bg-ink-panel p-4">
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
                            Switch incidents on the left to fly the map and
                            update transcript + emotion across the cockpit.
                        </p>
                    </div>
                </aside>

                <section className="relative flex h-full min-h-[460px] flex-col bg-ink-deep lg:min-h-0">
                    <div className="relative flex-1 overflow-hidden">
                        <Map
                            center={mapCenter}
                            pins={mapPins}
                            zoom={14}
                            centerOffsetLng={0}
                            scrollWheelZoom={false}
                        />

                        {/* Top-left field stamp — matches the live cockpit ribbon language */}
                        <div className="pointer-events-none absolute left-4 top-4 z-[400] flex flex-col gap-1.5">
                            <span className="stamp border-white/20 bg-ink/85 text-white/75 backdrop-blur-sm">
                                <span className="size-1.5 rounded-full bg-sodium" />
                                Field
                            </span>
                            <span className="rounded-[3px] border border-white/12 bg-ink/85 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-ribbon text-white/55 backdrop-blur-sm">
                                {selected?.callAnalytics.location}
                            </span>
                        </div>

                        {/* Bottom-center pin caption */}
                        <div className="pointer-events-none absolute bottom-4 left-1/2 z-[400] -translate-x-1/2 rounded-[3px] border border-white/12 bg-ink/85 px-4 py-2 text-center backdrop-blur-sm">
                            <p className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                                Selected incident
                            </p>
                            <p className="mt-1 text-sm font-medium text-white">
                                {selected?.callAnalytics.title}
                            </p>
                            <p className="font-mono text-[11px] tabular-nums text-white/55">
                                {selected?.callAnalytics.latitude?.toFixed(4)},{" "}
                                {selected?.callAnalytics.longitude?.toFixed(4)}
                            </p>
                        </div>
                    </div>
                </section>

                <aside className="flex h-full min-h-0 flex-col overflow-hidden bg-ink-panel">
                    <div className="shrink-0 border-b border-white/8 px-4 py-3">
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

                    {streetViewSrc && selected ? (
                        <div className="shrink-0 border-b border-white/8 p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-medium text-white/65">
                                    Street view
                                </p>
                                <span className="font-mono text-[10px] uppercase tracking-ribbon text-white/35">
                                    Google
                                </span>
                            </div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                key={selected.id}
                                src={streetViewSrc}
                                alt={`Street view near ${selected.callAnalytics.location}`}
                                loading="lazy"
                                onError={() => {
                                    setStreetViewFailed((prev) => {
                                        if (prev.has(selected.id)) return prev;
                                        const next = new Set(prev);
                                        next.add(selected.id);
                                        return next;
                                    });
                                }}
                                className="mt-2 aspect-[16/10] w-full rounded-[4px] border border-white/8 object-cover"
                            />
                        </div>
                    ) : null}

                    <div className="shrink-0 border-b border-white/8 p-4">
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

                    <div className="flex min-h-0 flex-1 flex-col p-4">
                        <div className="flex shrink-0 items-center justify-between">
                            <p className="text-xs font-medium text-white/65">
                                Transcript
                            </p>
                            <span className="font-mono text-[10px] uppercase tracking-ribbon text-white/35">
                                {transcript?.transcript?.length ?? 0} turns
                            </span>
                        </div>
                        <div className="mt-2 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
                            {transcript?.transcript?.map((line, idx) => {
                                const isAgent = line.role === "agent";
                                return (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "rounded-[4px] border p-2.5",
                                            isAgent
                                                ? "border-phosphor/15 bg-phosphor/[0.03]"
                                                : "border-white/10 bg-white/[0.02]",
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex items-center gap-2 font-mono text-[10px] uppercase tracking-ribbon",
                                                isAgent
                                                    ? "text-phosphor"
                                                    : "text-white/55",
                                            )}
                                        >
                                            {isAgent ? (
                                                <HeadphonesIcon className="size-3" />
                                            ) : (
                                                <RadioTowerIcon className="size-3" />
                                            )}
                                            {isAgent ? "Dispatch" : "Caller"}
                                        </div>
                                        {/* Per Design.md §2.3: caller speech is mono (raw event), dispatch is Fraunces (calm authored response). */}
                                        <p
                                            className={cn(
                                                "mt-1.5",
                                                isAgent
                                                    ? "font-display text-[14px] leading-snug text-white/90"
                                                    : "font-mono text-[12px] leading-relaxed text-white/80",
                                            )}
                                        >
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

                    <div className="shrink-0 border-t border-white/8 p-4">
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
