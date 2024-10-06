"use client";

import { Box } from "@/components/data-management/box";
import { TotalCalls } from "@/components/data-management/total-calls/total-calls";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";
import { Separator } from "@/components/dispatch/separator";
import { MONTHS } from "@/lib/constants";

export default function Page() {
    return (
        <div className="h-full bg-dp-backgroundHover px-15 py-10">
            <div className="flex space-x-3">
                <TotalCalls />

                <Box className="grow">
                    <div className="flex-between">
                        <p className="text-sm font-medium text-dp-headingText">
                            Communication status
                        </p>

                        <Select defaultValue="2">
                            <SelectTrigger className="h-full w-40 p-2 text-xs uppercase">
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

                    <div className="grid grid-cols-3 gap-x-4">
                        <Box className="space-y-2">
                            <div className="flex-center h-5 w-16 bg-dp-nonEmergency/15 px-2 py-1">
                                <p className="text-xxs font-bold text-dp-nonEmergency">
                                    {status}
                                </p>
                            </div>

                            <div className="space-y-2 text-dp-headingText">
                                <p className="text-lg leading-none">
                                    {/* {label} */}
                                    bar
                                </p>
                                <p className="text-[42px] leading-none">
                                    {/* {value} */}
                                    foo
                                </p>
                            </div>
                        </Box>
                    </div>
                </Box>
            </div>
        </div>
    );
}
