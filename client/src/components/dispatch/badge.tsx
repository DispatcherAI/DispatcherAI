import { cn } from "@/lib/utils";

interface BadgeProps {
    label: string;
    className?: string;
    containerClassName?: string;
}

export function Badge({ label, className, containerClassName }: BadgeProps) {
    return (
        <div
            className={cn(
                "flex-center h-5 w-16 bg-dp-nonEmergency/15 px-2 py-1",
                containerClassName
            )}
        >
            <p
                className={cn(
                    "text-xxs font-bold uppercase text-dp-nonEmergency",
                    className
                )}
            >
                {label}
            </p>
        </div>
    );
}
