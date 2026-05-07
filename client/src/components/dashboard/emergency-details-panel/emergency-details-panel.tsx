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

interface EmergencyDetailsPanelProps {
    call: DispatchCall;
}

export function EmergencyDetailsPanel({ call }: EmergencyDetailsPanelProps) {
    return (
        <div className="z-10 flex h-full max-h-full w-[320px] flex-col border border-y-0 border-l-0 border-r-white/10 bg-[#080d13]/95 backdrop-blur-xl">
            <div className="flex shrink-0 justify-between px-4 py-3 text-sm text-dp-text">
                <p className="text-xxs font-semibold uppercase tracking-[0.22em]">
                    Emergency Details
                </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="px-4 py-4 text-xl font-semibold tracking-[-0.03em] text-dp-headingText">
                <TooltipProvider>
                    <Tooltip delayDuration={1500}>
                        <TooltipTrigger asChild>
                            <h2 className="line-clamp-2 text-left">
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
