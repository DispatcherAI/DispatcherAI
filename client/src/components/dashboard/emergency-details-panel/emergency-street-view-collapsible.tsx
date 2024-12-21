import { Call } from "@/app/(layout)/live/page";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

export function EmergencyStreetViewCollapsible({ call }: { call: Call }) {
    return (
        <Collapsible
            className="flex flex-col space-x-1 space-y-4 px-3 py-3"
            defaultOpen
        >
            <CollapsibleTrigger className="flex justify-between text-left text-sm font-semibold uppercase text-dp-headingText">
                <p className="">Street View</p>
                <ChevronDownIcon className="stroke-dp-hoverCard" />
            </CollapsibleTrigger>

            <CollapsibleContent>
                {call?.street_view ? (
                    <img
                        src={`data:image/png;base64, ${call.street_view}`}
                        className="aspect-video w-full border border-dp-hoverCard bg-cover bg-no-repeat drop-shadow-md"
                    />
                ) : (
                    <div className="aspect-video w-full animate-pulse border border-dp-hoverCard bg-gray-500 drop-shadow-md duration-5000" />
                )}
            </CollapsibleContent>
        </Collapsible>
    );
}
