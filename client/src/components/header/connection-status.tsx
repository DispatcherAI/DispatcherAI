"use client";

import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { cn } from "@/lib/utils";

export function ConnectionStatus() {
    const { pollingStatus } = useEmergencyContext();

    const statusLabel =
        pollingStatus === "live"
            ? "LIVE"
            : pollingStatus === "idle"
              ? "IDLE"
              : pollingStatus === "paused"
                ? "PAUSED"
                : pollingStatus === "expired"
                  ? "REFRESH"
                  : pollingStatus === "error"
                    ? "ERROR"
                    : "LOADING";

    return (
        <div className="h-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
            <p
                className={cn(
                    "flex items-center gap-1.5 text-xs font-bold text-dp-medium",
                    pollingStatus === "live" && "text-dp-nonEmergency",
                    (pollingStatus === "error" ||
                        pollingStatus === "expired") &&
                        "text-dp-critical"
                )}
            >
                <span
                    className={cn(
                        "size-1.5 rounded-full bg-dp-medium",
                        pollingStatus === "live" &&
                            "bg-dp-nonEmergency shadow-[0_0_12px_rgba(71,255,133,0.9)]",
                        (pollingStatus === "error" ||
                            pollingStatus === "expired") &&
                            "bg-dp-critical"
                    )}
                />
                {statusLabel}
            </p>
        </div>
    );
}
