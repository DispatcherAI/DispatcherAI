"use client";

import { useState } from "react";
import { Call } from "@/app/(dashboard)/live/page";
import { EmergencyCard } from "@/components/dashboard/alerts-emergencies-panel/emergency-card";
import { EmergencyStat } from "@/components/dashboard/alerts-emergencies-panel/emergency-stat";
import { Input } from "@/components/dispatch/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

const ITEMS = [
    {
        value: "_CLEAR",
        label: "",
    },
    {
        value: "SF",
        label: "San Francisco, CA",
    },
    {
        value: "BER",
        label: "Berkeley, CA",
    },
];

export function AlertsEmergenciesPanel({
    data,
}: {
    data: Record<string, Call>;
}) {
    const [value, setValue] = useState<string | undefined>();

    const handleValueChange = (newValue: string) => {
        setValue(newValue === "_CLEAR" ? undefined : newValue);
    };

    return (
        <div className="h-full w-[350px] bg-[#1E1E1E]">
            <div className="flex-between space-x-1 px-3 pt-3">
                <Input
                    startIcon={SearchIcon}
                    placeholder="Search a location..."
                    className="h-7 text-xs"
                    startIconClassName="text-dp-inputText size-3"
                    startIconPadding="pl-5"
                />

                <Select
                    value={value || ""}
                    onValueChange={handleValueChange}
                >
                    <SelectTrigger className="h-7 w-20 min-w-20 p-2 text-left text-xs focus:ring-1 focus:ring-offset-0">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        {ITEMS.map((item) => (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                                className="text-xs"
                            >
                                {item.label || "\u00A0"}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3 p-3">
                <div className="grid grid-cols-3">
                    <EmergencyStat />
                    <EmergencyStat />
                    <EmergencyStat />
                </div>

                <div className="h-full">
                    <ScrollArea
                        className={cn(
                            "flex flex-col overflow-y-auto",
                            "max-h-[calc(100vh-192px)]" // this is bad code, but it sizes the scroll area correctly
                        )}
                        type="scroll"
                    >
                        {Object.entries(data).map(([id, _call]) => (
                            <EmergencyCard
                                id={id}
                                title={"House Fire in Blair Hill"}
                                time={"10:31 AM"}
                                status={"live"}
                            />
                        ))}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
