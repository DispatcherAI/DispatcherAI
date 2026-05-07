"use client";

import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
    live: "Live",
    idle: "Idle",
    paused: "Paused",
    expired: "Refresh",
    error: "Error",
    loading: "Connecting",
};

export function ConnectionStatus() {
    const { pollingStatus } = useEmergencyContext();
    const label = STATUS_LABEL[pollingStatus] ?? "Connecting";
    const isLive = pollingStatus === "live";
    const isError = pollingStatus === "error" || pollingStatus === "expired";

    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs",
                isLive
                    ? "border-phosphor/25 bg-phosphor/[0.05] text-phosphor"
                    : isError
                      ? "border-signal/35 bg-signal/[0.05] text-signal"
                      : "border-white/12 bg-white/[0.03] text-white/65",
            )}
            title={`Polling: ${pollingStatus}`}
        >
            <span
                className={cn(
                    "block size-1.5 rounded-full",
                    isLive
                        ? "bg-phosphor"
                        : isError
                          ? "bg-signal"
                          : "bg-white/55",
                )}
            />
            {label}
        </span>
    );
}
