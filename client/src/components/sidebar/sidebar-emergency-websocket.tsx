"use client";

import { useCallback } from "react";
import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/dispatch/tooltip";
import { cn } from "@/lib/utils";

export function SidebarEmergencyWebsocket() {
    const { connected, pollingStatus } = useEmergencyContext();

    const handleClickRetry = useCallback(() => {
        if (connected) {
            return;
        }

        if (pollingStatus === "expired") {
            window.location.reload();
        }
    }, [connected, pollingStatus]);

    const label =
        pollingStatus === "live"
            ? "Live polling — /api/calls every 5s"
            : pollingStatus === "idle"
              ? "Polling paused until activity"
              : pollingStatus === "paused"
                ? "Polling paused while tab is hidden"
                : pollingStatus === "expired"
                  ? "Refresh required to resume live updates"
                  : pollingStatus === "error"
                    ? "Polling error — click to retry"
                    : "Connecting to dispatch network…";

    return (
        <div className="flex items-center justify-center">
            <TooltipProvider>
                <Tooltip delayDuration={400}>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            aria-label={label}
                            onClick={handleClickRetry}
                            className={cn(
                                "relative inline-flex size-3 cursor-default items-center justify-center rounded-full",
                                connected
                                    ? "text-phosphor"
                                    : pollingStatus === "error" ||
                                        pollingStatus === "expired"
                                      ? "text-signal cursor-pointer"
                                      : "text-white/55",
                            )}
                        >
                            <span
                                className={cn(
                                    "block size-2 rounded-full",
                                    connected
                                        ? "bg-phosphor"
                                        : pollingStatus === "error" ||
                                            pollingStatus === "expired"
                                          ? "bg-signal"
                                          : "bg-white/55",
                                )}
                            />
                            {connected ? (
                                <span
                                    aria-hidden
                                    className="absolute inset-0 animate-ping rounded-full border border-phosphor/40"
                                />
                            ) : null}
                        </button>
                    </TooltipTrigger>

                    <TooltipContent side="right" align="center" className="w-auto">
                        {label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
