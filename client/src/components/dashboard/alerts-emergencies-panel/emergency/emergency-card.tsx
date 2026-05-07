import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { Severity } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
    CheckCircle2Icon,
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
    endedAt?: Date | null;
    severity: SeverityWithLive;
    finished: boolean;
}

const CARD_ICONS: Record<SeverityWithLive, LucideIcon> = {
    live: RadioTowerIcon,
    critical: TriangleAlertIcon,
    warning: TriangleAlertIcon,
    safe: CircleAlertIcon,
};

const SEV_BAR: Record<SeverityWithLive, string> = {
    live: "bg-sodium",
    critical: "bg-signal",
    warning: "bg-sodium",
    safe: "bg-phosphor",
};

const SEV_LABEL: Record<SeverityWithLive, string> = {
    live: "text-sodium",
    critical: "text-signal",
    warning: "text-sodium",
    safe: "text-phosphor",
};

const SEV_TEXT: Record<SeverityWithLive, string> = {
    live: "LIVE",
    critical: "CRITICAL",
    warning: "WARNING",
    safe: "SAFE",
};

export function EmergencyCard({
    id,
    title,
    time,
    endedAt,
    severity,
    finished,
}: EmergencyCardProps) {
    const Icon = finished ? CheckCircle2Icon : CARD_ICONS[severity];
    const cardLabel = finished ? "text-white/55" : SEV_LABEL[severity];
    const sevBar = finished ? "bg-white/30" : SEV_BAR[severity];

    const { selectedId, handleSelect } = useEmergencyContext();
    const selected = selectedId === id;

    const displayTime = finished ? (endedAt ?? time) : time;
    const formattedTime = displayTime
        ? new Date(displayTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
          })
        : null;

    const handleClick = () => handleSelect(id);

    return (
        <button
            type="button"
            className={cn(
                "group relative flex w-full items-stretch gap-3 overflow-hidden rounded-[3px] border bg-steel-sunk/60 px-3 py-3 text-left transition",
                finished
                    ? "border-white/8 opacity-70 hover:opacity-95"
                    : "border-white/10 hover:border-white/20",
                selected &&
                    (finished
                        ? "border-white/25 bg-white/[0.03] opacity-100"
                        : "border-white/30 bg-white/[0.04]"),
            )}
            onClick={handleClick}
        >
            <span className={cn("w-1 shrink-0 rounded-[2px]", sevBar)} />

            <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                    <span
                        className={cn(
                            "font-mono text-[10px] uppercase tracking-ribbon",
                            cardLabel,
                        )}
                    >
                        {finished ? "CLOSED" : SEV_TEXT[severity]}
                    </span>
                    <span className="font-mono text-[10px] text-white/45">
                        {formattedTime ?? "pending"}
                    </span>
                </div>
                <p
                    className={cn(
                        "line-clamp-1 text-[15px] font-medium leading-tight",
                        finished ? "text-white/65" : "text-white",
                    )}
                >
                    {title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-white/55">
                    <Icon className={cn("size-3", cardLabel)} />
                    <span>{finished ? "Resolved" : "Active incident"}</span>
                </div>
            </div>
        </button>
    );
}
