import { type ReactNode, useMemo } from "react";
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

function AnalyticsDropdown({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <Collapsible
            className="rounded-[3px] border border-white/10 bg-white/[0.02] p-3"
            defaultOpen
        >
            <CollapsibleTrigger className="flex w-full items-center justify-between text-left">
                <p className="text-xs font-medium text-white/65">{title}</p>
                <ChevronDownIcon className="size-3.5 stroke-white/45" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <p className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-white/80">
                    {children}
                </p>
            </CollapsibleContent>
        </Collapsible>
    );
}

export function EmergencyDetailsCollapsible({ call }: { call: DispatchCall }) {
    const time = useMemo(
        () =>
            new Date(
                new Date(call?.callAnalytics.createdAt).getTime() -
                    7 * 60 * 60 * 1000,
            ).toLocaleTimeString("en-US", {
                timeZone: "America/Los_Angeles",
            }),
        [call.callAnalytics.createdAt],
    );
    const location =
        call.callAnalytics.address ||
        call.callAnalytics.location ||
        "Location pending";

    return (
        <Collapsible
            className="flex flex-col space-y-3 px-4 py-4"
            defaultOpen
        >
            <CollapsibleTrigger className="flex justify-between text-left text-sm font-medium text-white/65">
                <p>Field details</p>
                <ChevronDownIcon className="size-3.5 stroke-white/45" />
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-[3px] border border-white/10 bg-white/[0.02] p-3">
                            <p className="text-xs text-white/45">Time</p>
                            <p className="mt-1 font-mono text-[12px] tabular-nums text-white">
                                {time}
                            </p>
                        </div>
                        <TooltipProvider>
                            <Tooltip delayDuration={1500}>
                                <div className="rounded-[3px] border border-white/10 bg-white/[0.02] p-3">
                                    <p className="text-xs text-white/45">
                                        Location
                                    </p>
                                    <TooltipTrigger asChild>
                                        <h2 className="mt-1 line-clamp-2 text-left text-[12px] leading-snug text-white">
                                            {location}
                                        </h2>
                                    </TooltipTrigger>
                                </div>
                                <TooltipContent
                                    side="bottom"
                                    align="start"
                                >
                                    {location}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <AnalyticsDropdown title="AI summary">
                        {call.callAnalytics.summary || "Summary pending"}
                    </AnalyticsDropdown>

                    <AnalyticsDropdown title="AI recommendation">
                        {call.callAnalytics.recommendation ||
                            "Recommendation pending"}
                    </AnalyticsDropdown>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
