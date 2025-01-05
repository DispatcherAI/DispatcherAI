import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { Severity } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
    CircleAlertIcon,
    LucideIcon,
    RadioTowerIcon,
    TriangleAlertIcon,
} from "lucide-react";

type SeverityWithLive = Severity | "live";

interface EmergencyCardProps {
    id: string;
    title: string;
    time: Date | undefined;
    severity: SeverityWithLive;
}

const CARD_ICONS: Record<SeverityWithLive, LucideIcon> = {
    live: RadioTowerIcon,
    critical: TriangleAlertIcon,
    warning: TriangleAlertIcon,
    safe: CircleAlertIcon,
};

const CARD_COLOR: Record<SeverityWithLive, string> = {
    live: "text-dp-primary",
    critical: "text-dp-critical",
    warning: "text-dp-medium",
    safe: "text-dp-nonEmergency",
};

export function EmergencyCard({
    id,
    title,
    time,
    severity,
}: EmergencyCardProps) {
    const Icon = CARD_ICONS[severity];
    const cardColor = CARD_COLOR[severity];

    const { selectedId, handleSelect } = useEmergencyContext();

    const formattedTime = time
        ? new Date(time).toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
          })
        : null;

    const handleClick = () => {
        handleSelect(id);
    };

    return (
        <div
            className={cn(
                "flex cursor-pointer space-x-2 border-t border-dp-outlineNotSelected bg-dp-background px-2 py-3",
                "hover:bg-dp-backgroundHover",
                selectedId === id && "bg-dp-card hover:bg-dp-card"
            )}
            onClick={handleClick}
        >
            <Icon className={cn("my-auto size-5 min-w-5", cardColor)} />

            <div className="flex-between grow">
                <div>
                    <p className="line-clamp-1 text-sm font-semibold text-dp-headingText">
                        {title}
                    </p>
                    <p className="line-clamp-1 text-xs font-medium text-dp-text">
                        {formattedTime}
                    </p>
                </div>

                <div
                    className={cn(
                        "mb-auto min-w-fit items-center px-2 text-xs font-medium uppercase leading-5",
                        cardColor
                    )}
                >
                    {severity}
                </div>
            </div>
        </div>
    );
}
