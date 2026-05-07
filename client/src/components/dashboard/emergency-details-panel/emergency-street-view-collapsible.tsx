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
                    <div className="flex aspect-video w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] px-6 text-center shadow-2xl shadow-black/30">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dp-headingText">
                            Street view pending
                        </p>
                        <p className="mt-2 max-w-64 text-xs leading-5 text-dp-text">
                            Waiting for geocoding to return coordinates and a
                            Google Street View image.
                        </p>
                    </div>
                )}
            </CollapsibleContent>
        </Collapsible>
    );
}
