"use client";

import { useState } from "react";
import { Call } from "@/app/(dashboard)/live/page";
import { EmergencyTab } from "@/components/dashboard/alerts-emergencies-panel/emergency/emergency-tab";
import { Input } from "@/components/dispatch/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/dispatch/tabs";
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
            <Tabs
                defaultValue="emergencies"
                className="px-3 pt-1"
            >
                <TabsList className="h-fit w-full justify-start border-b border-dp-outlineNotSelected">
                    <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>

                <div className="flex-between space-x-1 py-2">
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

                <TabsContent value="emergencies">
                    <EmergencyTab data={data} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
