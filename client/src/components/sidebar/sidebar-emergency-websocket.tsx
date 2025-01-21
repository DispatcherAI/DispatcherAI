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
    const { connected } = useEmergencyContext();

    const handleClickRetry = useCallback(() => {
        if (connected) {
            return;
        }

        // handleRetry();
    }, []);

    return (
        <div className="mt-auto flex items-end justify-center">
            <TooltipProvider>
                <Tooltip delayDuration={2500}>
                    <TooltipTrigger asChild>
                        <div
                            className={cn(
                                "size-[10px] animate-pulse cursor-pointer rounded-full bg-red-500",
                                connected ? "cursor-default bg-green-500" : null
                            )}
                            onClick={handleClickRetry}
                        />
                    </TooltipTrigger>

                    <TooltipContent
                        side="right"
                        align="center"
                        className="w-auto"
                    >
                        Websocket Connectivity
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
