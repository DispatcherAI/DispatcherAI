import { DispatchCall } from "@/app/(layout)/live/page";
import { EmergencyDetailsCollapsible } from "@/components/dashboard/emergency-details-panel/emergency-details-collapsible";
import { EmergencyStreetViewCollapsible } from "@/components/dashboard/emergency-details-panel/emergency-street-view-collapsible";
import { Badge } from "@/components/dispatch/badge";
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
        <div className="z-10 flex h-fit max-h-[calc(100vh-52px)] w-[300px] flex-col border border-y-0 border-l-0 border-r-dp-outlineNotSelected bg-dp-background">
            <div className="flex shrink-0 justify-between px-3 py-1 text-sm text-dp-text">
                <p>Emergency Details</p>
                <Badge
                    label="Warning"
                    className="text-dp-medium"
                    containerClassName="bg-dp-medium/15"
                />
            </div>

            <Separator />

            <div className="px-3 py-3 text-lg font-semibold text-dp-headingText">
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

            <Separator />

            <EmergencyStreetViewCollapsible call={call} />

            <Separator />

            <EmergencyDetailsCollapsible call={call} />
        </div>
    );
}
