import { useState } from "react";
import { AlertDetailsCollapsible } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-details/alert-details-collapsible/alert-details-collapsible";
import { Alert } from "@/components/dashboard/alerts-emergencies-panel/alert/alerts.type";

interface AlertDetailsCollapsibleDetailsProps {
    alert: Alert;
}

export function AlertDetailsCollapsibleDetails({
    alert,
}: AlertDetailsCollapsibleDetailsProps) {
    const [open, setOpen] = useState(true);

    return (
        <AlertDetailsCollapsible
            title="details"
            open={open}
            onOpenChange={setOpen}
        >
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
        </AlertDetailsCollapsible>
    );
}
