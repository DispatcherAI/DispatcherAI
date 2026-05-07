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
            ? "Live database polling"
            : pollingStatus === "idle"
              ? "Polling paused until activity"
              : pollingStatus === "paused"
                ? "Polling paused while tab is hidden"
                : pollingStatus === "expired"
                  ? "Refresh required to resume live updates"
                  : pollingStatus === "error"
                    ? "Database polling error"
                    : "Loading database polling";

    return (
        <div className="flex items-end justify-center pt-4">
            <TooltipProvider>
                <Tooltip delayDuration={2500}>
                    <TooltipTrigger asChild>
                        <div
                            className={cn(
                                "size-3 animate-pulse cursor-pointer rounded-full border border-yellow-200/30 bg-yellow-500 shadow-[0_0_18px_rgba(234,179,8,0.55)]",
                                connected
                                    ? "cursor-default border-green-200/30 bg-green-500 shadow-[0_0_18px_rgba(34,197,94,0.65)]"
                                    : null,
                                pollingStatus === "error" ||
                                    pollingStatus === "expired"
                                    ? "border-red-200/30 bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.65)]"
                                    : null
                            )}
                            onClick={handleClickRetry}
                        />
                    </TooltipTrigger>

                    <TooltipContent
                        side="right"
                        align="center"
                        className="w-auto"
                    >
                        {label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
