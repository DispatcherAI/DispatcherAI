import { forwardRef } from "react";
import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { cn } from "@/lib/utils";
import { CircleCheckIcon, LucideIcon, TriangleAlertIcon } from "lucide-react";

import { Alert, Status } from "./alerts.type";

const CARD_ICONS: Record<Status, LucideIcon> = {
    active: TriangleAlertIcon,
    resolved: CircleCheckIcon,
};

export const AlertCard = forwardRef<HTMLDivElement, Alert>(
    ({ id, title, details, time, status }, ref) => {
        const Icon = CARD_ICONS[status];

        const { selectedId, handleSelect } = useEmergencyContext();

        const handleClick = () => {
            handleSelect(id);
        };

        return (
            <div
                className={cn(
                    "flex space-x-2 border-t border-dp-outlineNotSelected bg-dp-background px-2 py-3",
                    "hover:bg-dp-backgroundHover",
                    selectedId === id && "bg-dp-card hover:bg-dp-card"
                )}
                onClick={handleClick}
                ref={ref}
            >
                <Icon
                    className={cn("my-auto size-5 min-w-5 text-dp-headingText")}
                />

                <div className="flex-between grow">
                    <div>
                        <p className="line-clamp-1 text-sm font-semibold text-dp-headingText">
                            {title}
                        </p>
                        <p className="line-clamp-2 w-full text-xxs text-dp-text">
                            {details}
                        </p>
                    </div>

                    <div
                        className={cn(
                            "mb-auto min-w-fit items-center text-xxs leading-5 text-dp-text"
                        )}
                    >
                        {time}
                    </div>
                </div>
            </div>
        );
    }
);
