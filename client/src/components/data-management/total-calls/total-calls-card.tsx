import { Box } from "@/components/data-management/box";
import { cn } from "@/lib/utils";

interface TotalCallsCardProps {
    status: "Nominal" | "Excessive";
    label: string;
    value: string;
}

export function TotalCallsCard({ status, label, value }: TotalCallsCardProps) {
    return (
        <Box className="space-y-2 border-dp-outline">
            <div className="flex-center h-5 w-16 bg-dp-nonEmergency/15 px-2 py-1">
                <p className="text-xxs font-bold uppercase text-dp-nonEmergency">
                    {status}
                </p>
            </div>

            <div className="space-y-2 text-dp-headingText">
                <p
                    className={cn(
                        "line-clamp-1 text-ellipsis text-lg leading-none",
                        label.split(" ").length === 1 && "inline-block"
                    )}
                >
                    {label}
                </p>
                <p
                    className={cn(
                        "line-clamp-1 text-ellipsis text-4xl leading-none",
                        value.split(" ").length === 1 && "inline-block"
                    )}
                >
                    {value}
                </p>
            </div>
        </Box>
    );
}
