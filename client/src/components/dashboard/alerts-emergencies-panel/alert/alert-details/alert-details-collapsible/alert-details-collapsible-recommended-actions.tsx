import { useState } from "react";
import { AlertDetailsCollapsible } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-details/alert-details-collapsible/alert-details-collapsible";
import { Alert } from "@/components/dashboard/alerts-emergencies-panel/alert/alerts.type";
import { Checkbox } from "@/components/dispatch/checkbox";

const RECOMMENDED_ACTIONS = [
    "Locate system",
    "Inspect system settings",
    "Contact unit immediately",
];

interface AlertDetailsCollapsibleRecommendedActionsProps {
    alert: Alert;
}

export function AlertDetailsCollapsibleRecommendedActions({
    alert: _alert,
}: AlertDetailsCollapsibleRecommendedActionsProps) {
    const [open, setOpen] = useState(true);

    return (
        <AlertDetailsCollapsible
            title="recommended actions"
            open={open}
            onOpenChange={setOpen}
            collapsibleContentClassname="space-y-1"
        >
            {RECOMMENDED_ACTIONS.map((item) => (
                <div
                    key={item}
                    className="flex items-center space-x-1"
                >
                    <Checkbox id={item} />
                    <label
                        htmlFor={item}
                        className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {item}
                    </label>
                </div>
            ))}
        </AlertDetailsCollapsible>
    );
}
