import { useState } from "react";
import { AlertCard } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-card";
import { AlertDetailsCollapsibleDetails } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-details/alert-details-collapsible/alert-details-collapsible-details";
import { AlertDetailsCollapsibleRecommendedActions } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-details/alert-details-collapsible/alert-details-collapsible-recommended-actions";
import { AlertDetailsLabel } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-details/alert-details-label";
import { Label } from "@/components/dispatch/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Alert } from "../alerts.type";

export function AlertDropdownMenu({ alert }: { alert: Alert }) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
        >
            <DropdownMenuTrigger asChild>
                <div>
                    <AlertCard {...alert} />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="right"
                sideOffset={20}
                align="start"
                className="w-[250px] rounded-none border-none bg-dp-background p-0 text-dp-headingText"
            >
                <AlertDetailsLabel handleClose={handleClose} />

                <DropdownMenuSeparator className="my-0 bg-dp-outlineNotSelected" />

                <div className="space-y-2 px-3 py-2">
                    <p className="text-lg font-bold leading-none text-dp-headingText">
                        {alert.title}
                    </p>

                    <div className="grid grid-cols-[auto_1fr] items-center justify-start gap-x-2 gap-y-1">
                        <div className="text-xs font-medium text-dp-text">
                            Severity:
                        </div>
                        <Label severity="warning" />
                        <div className="text-xs font-medium text-dp-text">
                            ETA:
                        </div>
                        <p className="text-xs font-semibold text-dp-headingText">
                            2:12:23 PM UT
                        </p>
                        <div className="text-xs font-medium text-dp-text">
                            Type:
                        </div>
                        <p className="text-xs font-semibold text-dp-headingText">
                            Equipment Failure
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator className="my-0 bg-dp-outlineNotSelected" />

                <AlertDetailsCollapsibleDetails alert={alert} />

                <DropdownMenuSeparator className="my-0 bg-dp-outlineNotSelected" />

                <AlertDetailsCollapsibleRecommendedActions alert={alert} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
