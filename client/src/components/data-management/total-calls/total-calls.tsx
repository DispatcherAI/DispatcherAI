import { Box } from "@/components/data-management/box";
import { TotalCallsCard } from "@/components/data-management/total-calls/total-calls-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";
import { Separator } from "@/components/dispatch/separator";
import { MONTHS } from "@/lib/constants";

export function TotalCalls() {
    return (
        <Box>
            <div className="flex-between">
                <p className="text-sm font-medium text-dp-headingText">
                    Total calls
                </p>

                <Select defaultValue="2">
                    <SelectTrigger className="h-7 w-40 p-2 text-xs uppercase">
                        <SelectValue placeholder="MONTH" />
                    </SelectTrigger>
                    <SelectContent className="uppercase">
                        {MONTHS.map((month, index) => (
                            <SelectItem
                                value={index.toString()}
                                className="text-xs"
                            >
                                {month}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator className="my-3" />

            <div className="grid grid-cols-4 gap-x-4">
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls received"}
                    value={"146"}
                />
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls received"}
                    value={"146"}
                />
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls received"}
                    value={"146"}
                />
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls received"}
                    value={"146"}
                />
            </div>
        </Box>
    );
}
