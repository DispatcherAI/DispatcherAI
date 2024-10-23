import { Severity } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LabelProps {
    severity: Severity;
    label?: string;
    className?: string;
}

const labelStyles: Record<Severity, string> = {
    critical: "bg-dp-critical/15 text-dp-critical",
    warning: "bg-dp-medium/15 text-dp-medium",
    safe: "bg-dp-nonEmergency/15 text-dp-nonEmergency",
};

export function Label({ severity, label, className }: LabelProps) {
    return (
        <div
            className={cn(
                "flex-center y h-5 w-16 px-2 py-1 text-xxs font-bold uppercase",
                labelStyles[severity],
                className
            )}
        >
            <p>{label ?? severity}</p>
        </div>
    );
}
