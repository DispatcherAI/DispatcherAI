import { AlertCard } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Alert } from "./alerts.type";

export function AlertDropdownMenu({ alert }: { alert: Alert }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                onClick={() => console.log("click")}
            >
                <AlertCard {...alert} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="right"
                sideOffset={8}
                align="start"
            >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
