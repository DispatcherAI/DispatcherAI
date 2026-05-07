import { DispatchCall } from "@/app/(layout)/live/page";
import { EmergencyDetailsCollapsible } from "@/components/dashboard/emergency-details-panel/emergency-details-collapsible";
import { EmergencyStreetViewCollapsible } from "@/components/dashboard/emergency-details-panel/emergency-street-view-collapsible";
import { Separator } from "@/components/dispatch/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/dispatch/tooltip";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon, RadioTowerIcon } from "lucide-react";

interface EmergencyDetailsPanelProps {
    call: DispatchCall;
}

export function EmergencyDetailsPanel({ call }: EmergencyDetailsPanelProps) {
    const finished = call.inProgress === false || call.status === "Resolved";
    const StatusIcon = finished ? CheckCircle2Icon : RadioTowerIcon;
    const statusTime = call.endedAt ?? call.createdAt;
    const formattedStatusTime = new Date(statusTime).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    return (
        <div
            className={cn(
                "z-10 flex h-full max-h-full w-[320px] flex-col border border-y-0 border-l-0 backdrop-blur-xl",
                finished
                    ? "border-r-dp-nonEmergency/15 bg-[#050907]/95"
                    : "border-r-dp-primary/25 bg-[#080d13]/95"
            )}
        >
            <div className="flex shrink-0 justify-between px-4 py-3 text-sm text-dp-text">
                <p className="text-xxs font-semibold uppercase tracking-[0.22em]">
                    Emergency Details
                </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-4 px-4 py-4">
                <div
                    className={cn(
                        "rounded-2xl border px-3 py-2",
                        finished
                            ? "border-dp-nonEmergency/20 bg-dp-nonEmergency/10 text-dp-nonEmergency"
                            : "border-dp-primary/30 bg-[radial-gradient(circle_at_top_left,rgba(105,210,255,0.18),transparent_46%),rgba(105,210,255,0.08)] text-dp-primary shadow-[0_0_28px_rgba(105,210,255,0.14)]"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <StatusIcon className="size-4" />
                        <p className="text-xxs font-semibold uppercase tracking-[0.2em]">
                            {finished ? "Finished" : "Live incident"}
                        </p>
                    </div>
                    <p className="mt-1 font-mono text-xxs uppercase tracking-[0.12em] text-dp-text">
                        {finished ? "Closed" : "Started"} ·{" "}
                        {formattedStatusTime}
                    </p>
                </div>

                <TooltipProvider>
                    <Tooltip delayDuration={1500}>
                        <TooltipTrigger asChild>
                            <h2
                                className={cn(
                                    "line-clamp-2 text-left text-xl font-semibold tracking-[-0.03em]",
                                    finished
                                        ? "text-dp-text"
                                        : "text-dp-headingText"
                                )}
                            >
                                {call.callAnalytics.title ?? "911 Call"}
                            </h2>
                        </TooltipTrigger>

                        <TooltipContent
                            side="bottom"
                            align="start"
                        >
                            {call.callAnalytics.title ?? "911 Call"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <Separator className="bg-white/10" />

            <EmergencyStreetViewCollapsible call={call} />

            <Separator className="bg-white/10" />

            <EmergencyDetailsCollapsible call={call} />
        </div>
    );
}
