import { DispatchCall } from "@/app/(layout)/live/page";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

// Real Retell calls store base64 returned by server/geocoding.py::street_view.
// Seeded preview data points at /street-view/<id>.jpg under client/public/
// (pre-baked by server/scripts/download_streetview.py). Detect which one we
// have so the same component handles both paths without a runtime API call.
function streetViewSrc(raw: string | null | undefined): string | null {
    if (!raw) return null;
    if (
        raw.startsWith("data:") ||
        raw.startsWith("/") ||
        raw.startsWith("http")
    ) {
        return raw;
    }
    return `data:image/jpeg;base64,${raw}`;
}

export function EmergencyStreetViewCollapsible({
    call,
}: {
    call: DispatchCall;
}) {
    const src = streetViewSrc(call.callAnalytics.streetView);

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
                {src ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={src}
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
