import { Box } from "@/components/data-management/box";

interface TotalCallsCardProps {
    status: "Nominal" | "Excessive";
    label: string;
    value: string;
}

export function TotalCallsCard({ status, label, value }: TotalCallsCardProps) {
    return (
        <Box className="space-y-2">
            <div className="flex-center h-5 w-16 bg-dp-nonEmergency/15 px-2 py-1">
                <p className="text-xxs font-bold uppercase text-dp-nonEmergency">
                    {status}
                </p>
            </div>

            <div className="space-y-2 text-dp-headingText">
                <p className="text-lg leading-none">{label}</p>
                <p className="text-[42px] leading-none">{value}</p>
            </div>
        </Box>
    );
}
