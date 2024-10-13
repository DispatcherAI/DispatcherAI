import { useState } from "react";
import { AlertDetailsCollapsible } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-details/alert-details-collapsible/alert-details-collapsible";
import { Alert } from "@/components/dashboard/alerts-emergencies-panel/alert/alerts.type";

interface AlertDetailsCollapsibleRecommendedActionsProps {
    alert: Alert;
}

export function AlertDetailsCollapsibleRecommendedActions({
    alert,
}: AlertDetailsCollapsibleRecommendedActionsProps) {
    const [open, setOpen] = useState(true);

    return (
        <AlertDetailsCollapsible
            title="recommended actions"
            open={open}
            onOpenChange={setOpen}
        >
            <div></div>
        </AlertDetailsCollapsible>
    );
}
