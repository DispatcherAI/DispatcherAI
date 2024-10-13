import { useState } from "react";
import { Alert } from "@/components/dashboard/alerts-emergencies-panel/alert/alerts.type";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface AlertDetailsCollapsibleDetailsProps {
    alert: Alert;
}

export function AlertDetailsCollapsibleDetails({
    alert,
}: AlertDetailsCollapsibleDetailsProps) {
    const [open, setOpen] = useState(true);

    const Icon = open ? ChevronUpIcon : ChevronDownIcon;

    return (
        <Collapsible
            defaultOpen={true}
            open={open}
            onOpenChange={setOpen}
        >
            <CollapsibleTrigger
                className={cn(
                    "flex-between group h-fit min-h-fit w-full px-3 py-2 text-left text-xs font-semibold uppercase text-dp-headingText",
                    "hover:bg-dp-backgroundHover"
                )}
            >
                <p>Details</p>
                <Icon className="size-4 stroke-dp-text group-hover:stroke-dp-headingText" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 px-3 pb-2">
                <div>
                    <p className="text-xs text-dp-text">Summary</p>
                    <p className="text-xs font-medium text-dp-headingText">
                        {alert.details}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-dp-text">Impact</p>
                    <p className="text-xs font-medium text-dp-headingText">
                        May delay response time
                    </p>
                </div>
                <div>
                    <p className="text-xs text-dp-text">Affected units</p>
                    <p className="text-xs font-medium text-dp-headingText">
                        EMS 123, PD Unit 213
                    </p>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
