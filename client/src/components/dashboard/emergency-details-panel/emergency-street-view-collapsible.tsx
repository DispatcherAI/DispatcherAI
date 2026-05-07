import { DispatchCall } from "@/app/(layout)/live/page";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

export function EmergencyStreetViewCollapsible({
    call,
}: {
    call: DispatchCall;
}) {
    return (
        <Collapsible
            className="flex flex-col space-y-4 px-4 py-4"
            defaultOpen
        >
            <CollapsibleTrigger className="flex justify-between text-left text-xs font-semibold uppercase tracking-[0.18em] text-dp-headingText">
                <p className="">Street View</p>
                <ChevronDownIcon className="size-4 stroke-dp-text" />
            </CollapsibleTrigger>

            <CollapsibleContent>
                {call.callAnalytics.streetView ? (
                    <img
                        src={`data:image/jpeg;base64,${call.callAnalytics.streetView}`}
                        alt="Incident street view"
                        className="aspect-video w-full rounded-2xl border border-white/10 bg-cover bg-no-repeat object-cover shadow-2xl shadow-black/30"
                    />
                ) : (
                    <div className="aspect-video w-full animate-pulse rounded-2xl border border-white/10 bg-white/10 shadow-2xl shadow-black/30 duration-5000" />
                )}
            </CollapsibleContent>
        </Collapsible>
    );
}
