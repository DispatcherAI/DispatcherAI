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
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-3"
            defaultOpen
        >
            <CollapsibleTrigger className="flex w-full items-center justify-between text-left">
                <p className="text-xxs font-semibold uppercase tracking-[0.18em] text-dp-text">
                    {title}
                </p>
                <ChevronDownIcon className="size-4 stroke-dp-text" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-dp-headingText">
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
                    7 * 60 * 60 * 1000
            ).toLocaleTimeString("en-US", {
                timeZone: "America/Los_Angeles",
            }),
        [call.callAnalytics.createdAt]
    );
    const location =
        call.callAnalytics.address ||
        call.callAnalytics.location ||
        "Location pending";

    return (
        <Collapsible
            className="flex flex-col space-y-4 px-4 py-4"
            defaultOpen
        >
            <CollapsibleTrigger className="flex justify-between text-left text-xs font-semibold uppercase tracking-[0.18em] text-dp-headingText">
                <p className="">Emergency Details</p>
                <ChevronDownIcon className="size-4 stroke-dp-text" />
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                            <p className="text-xxs font-semibold uppercase tracking-[0.18em] text-dp-text">
                                Time
                            </p>
                            <p className="mt-1 font-mono text-sm text-dp-headingText">
                                {time}
                            </p>
                        </div>
                        <TooltipProvider>
                            <Tooltip delayDuration={1500}>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                                    <p className="text-xxs font-semibold uppercase tracking-[0.18em] text-dp-text">
                                        Location
                                    </p>
                                    <TooltipTrigger asChild>
                                        <h2 className="mt-1 line-clamp-2 text-left text-sm text-dp-headingText">
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

                    <AnalyticsDropdown title="AI Summary">
                        {call.callAnalytics.summary || "Summary pending"}
                    </AnalyticsDropdown>

                    <AnalyticsDropdown title="AI Recommendation">
                        {call.callAnalytics.recommendation ||
                            "Recommendation pending"}
                    </AnalyticsDropdown>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
