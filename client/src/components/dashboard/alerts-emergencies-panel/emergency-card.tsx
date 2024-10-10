import { cn } from "@/lib/utils";
import {
    CircleAlertIcon,
    LucideIcon,
    RadioTowerIcon,
    TriangleAlertIcon,
} from "lucide-react";

type Status = "live" | "critical" | "warning" | "safe";

interface EmergencyCardProps {
    title: string;
    time: string;
    status: Status;
}

const CARD_ICONS: Record<Status, LucideIcon> = {
    live: RadioTowerIcon,
    critical: TriangleAlertIcon,
    warning: TriangleAlertIcon,
    safe: CircleAlertIcon,
};

const CARD_COLOR: Record<Status, string> = {
    live: "text-dp-primary",
    critical: "text-dp-critical",
    warning: "text-dp-medium",
    safe: "text-dp-nonEmergency",
};

export function EmergencyCard({ title, time, status }: EmergencyCardProps) {
    const Icon = CARD_ICONS[status];
    const cardColor = CARD_COLOR[status];

    return (
        <div
            className={cn(
                "flex space-x-2 border-t border-dp-outlineNotSelected bg-dp-background px-2 py-3",
                "hover:bg-dp-backgroundHover"
            )}
        >
            <Icon className={cn("my-auto size-5 min-w-5", cardColor)} />

            <div className="flex-between grow">
                <div>
                    <p className="line-clamp-1 text-sm font-semibold text-dp-headingText">
                        {title}
                    </p>
                    <p className="line-clamp-1 text-xs font-medium text-dp-text">
                        {time}
                    </p>
                </div>

                <div
                    className={cn(
                        "mb-auto min-w-fit items-center px-2 text-xs font-medium uppercase leading-5",
                        cardColor
                    )}
                >
                    {status}
                </div>
            </div>
        </div>
    );
}
