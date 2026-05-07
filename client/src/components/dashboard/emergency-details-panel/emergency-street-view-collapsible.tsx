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
            className="flex flex-col space-y-3 px-4 py-4"
            defaultOpen
        >
            <CollapsibleTrigger className="flex justify-between text-left text-sm font-medium text-white/65">
                <p>Street view</p>
                <ChevronDownIcon className="size-3.5 stroke-white/45" />
            </CollapsibleTrigger>

            <CollapsibleContent>
                {call.callAnalytics.streetView ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={`data:image/jpeg;base64,${call.callAnalytics.streetView}`}
                        alt="Incident street view"
                        className="aspect-video w-full rounded-[3px] border border-white/10 object-cover"
                    />
                ) : (
                    <div className="flex aspect-video w-full flex-col items-center justify-center rounded-[3px] border border-white/10 bg-white/[0.02] px-6 text-center">
                        <p className="text-xs font-medium text-white/65">
                            Street view pending
                        </p>
                        <p className="mt-2 max-w-64 text-xs leading-5 text-white/55">
                            Waiting for geocoding to return coordinates and a
                            Google Street View image.
                        </p>
                    </div>
                )}
            </CollapsibleContent>
        </Collapsible>
    );
}
