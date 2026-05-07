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
    endedAt,
    severity,
    finished,
}: EmergencyCardProps) {
    const Icon = finished ? CheckCircle2Icon : CARD_ICONS[severity];
    const cardColor = finished ? "text-dp-nonEmergency" : CARD_COLOR[severity];

    const { selectedId, handleSelect } = useEmergencyContext();

    const displayTime = finished ? (endedAt ?? time) : time;
    const formattedTime = displayTime
        ? new Date(displayTime).toLocaleDateString("en-US", {
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
                "group relative flex w-full cursor-pointer space-x-3 overflow-hidden rounded-2xl border px-3 py-3 text-left transition duration-200",
                finished
                    ? "border-dp-nonEmergency/15 bg-[#06100d]/60 opacity-75 hover:border-dp-nonEmergency/35 hover:bg-dp-nonEmergency/10 hover:opacity-100"
                    : "border-dp-primary/35 bg-[linear-gradient(135deg,rgba(105,210,255,0.16),rgba(8,13,19,0.94)_48%),radial-gradient(circle_at_top_right,rgba(250,188,31,0.16),transparent_36%)] shadow-[0_0_34px_rgba(105,210,255,0.12)] hover:-translate-y-0.5 hover:border-dp-primary/55 hover:shadow-[0_0_46px_rgba(105,210,255,0.2)]",
                selectedId === id &&
                    (finished
                        ? "border-dp-nonEmergency/45 bg-dp-nonEmergency/10 opacity-100"
                        : "border-dp-primary/60 bg-dp-primary/15 shadow-[0_0_46px_rgba(105,210,255,0.22)]")
            )}
            onClick={handleClick}
        >
            {!finished ? (
                <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-dp-primary shadow-[0_0_18px_rgba(105,210,255,0.9)]" />
            ) : null}

            <div
                className={cn(
                    "relative my-auto flex size-9 min-w-9 items-center justify-center rounded-xl border bg-[#070b10]/80",
                    finished
                        ? "border-dp-nonEmergency/20"
                        : "border-dp-primary/30"
                )}
            >
                {!finished ? (
                    <span className="absolute inset-0 rounded-xl bg-dp-primary/15 opacity-0 transition group-hover:opacity-100" />
                ) : null}
                <Icon className={cn("size-5", cardColor)} />
            </div>

            <div className="flex-between grow">
                <div>
                    <p
                        className={cn(
                            "line-clamp-1 text-sm font-semibold",
                            finished ? "text-dp-text" : "text-dp-headingText"
                        )}
                    >
                        {title}
                    </p>
                    <p className="line-clamp-1 font-mono text-xxs font-medium uppercase tracking-[0.12em] text-dp-text">
                        {finished ? "closed" : "live"} ·{" "}
                        {formattedTime ?? "pending"}
                    </p>
                </div>

                <div
                    className={cn(
                        "border-current/20 bg-current/10 mb-auto min-w-fit rounded-full border px-2 py-0.5 text-xxs font-semibold uppercase leading-5 tracking-[0.16em]",
                        cardColor
                    )}
                >
                    {finished ? "finished" : "live"}
                </div>
            </div>
        </button>
    );
}
