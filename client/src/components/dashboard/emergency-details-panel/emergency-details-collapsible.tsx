import { useMemo } from "react";
import { DispatchCall } from "@/app/(layout)/live/page";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/dispatch/tooltip";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

export function EmergencyDetailsCollapsible({ call }: { call: DispatchCall }) {
    const time = useMemo(
        () =>
            new Date(
                new Date(call?.callAnalytics.createdAt).getTime() -
                    7 * 60 * 60 * 1000
            ).toLocaleTimeString("en-US", {
                timeZone: "America/Los_Angeles",
            }),
        [call.callAnalytics.createdAt]
    );

    return (
        <Collapsible
            className="flex flex-col space-x-1 space-y-4 px-3 py-3"
            defaultOpen
        >
            <CollapsibleTrigger className="flex justify-between text-left text-sm font-semibold uppercase text-dp-headingText">
                <p className="">Emergency Details</p>
                <ChevronDownIcon className="stroke-dp-hoverCard" />
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="space-y-2">
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="font-semibold text-dp-text">Time</p>
                            <p className="text-dp-headingText">{time}</p>
                        </div>
                        <TooltipProvider>
                            <Tooltip delayDuration={1500}>
                                <div>
                                    <p className="font-semibold text-dp-text">
                                        Location
                                    </p>
                                    <TooltipTrigger asChild>
                                        <h2 className="line-clamp-2 text-left text-dp-headingText">
                                            {call.callAnalytics.address}
                                        </h2>
                                    </TooltipTrigger>
                                </div>
                                <TooltipContent
                                    side="bottom"
                                    align="start"
                                >
                                    {call.callAnalytics.address}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div>
                        <p className="font-semibold text-dp-text">Summary</p>
                        <p className="line-clamp-4 text-sm text-dp-headingText">
                            {call.callAnalytics.summary}
                        </p>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
