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
        <button
            type="button"
            className={cn(
                "flex w-full cursor-pointer space-x-3 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3 text-left transition duration-200",
                "hover:-translate-y-0.5 hover:border-dp-primary/25 hover:bg-dp-primary/10",
                selectedId === id &&
                    "border-dp-primary/40 bg-dp-primary/15 shadow-[0_0_32px_rgba(105,210,255,0.12)]"
            )}
            onClick={handleClick}
        >
            <div className="my-auto flex size-9 min-w-9 items-center justify-center rounded-xl border border-white/10 bg-[#070b10]/80">
                <Icon className={cn("size-5", cardColor)} />
            </div>

            <div className="flex-between grow">
                <div>
                    <p className="line-clamp-1 text-sm font-semibold text-dp-headingText">
                        {title}
                    </p>
                    <p className="line-clamp-1 font-mono text-xxs font-medium uppercase tracking-[0.12em] text-dp-text">
                        {formattedTime}
                    </p>
                </div>

                <div
                    className={cn(
                        "border-current/20 bg-current/10 mb-auto min-w-fit rounded-full border px-2 py-0.5 text-xxs font-semibold uppercase leading-5 tracking-[0.16em]",
                        cardColor
                    )}
                >
                    {severity}
                </div>
            </div>
        </button>
    );
}
