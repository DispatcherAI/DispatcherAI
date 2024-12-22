import { Call } from "@/app/(layout)/live/page";
import { AlertTab } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-tab";
import { EmergencyTab } from "@/components/dashboard/alerts-emergencies-panel/emergency/emergency-tab";
import { useEmergencyContext } from "@/components/dashboard/emergency-context";
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
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

const ITEMS = [
    {
        value: "_CLEAR",
        label: "",
    },
    {
        value: "critical",
        label: "Critical",
    },
    {
        value: "warning",
        label: "Warning",
    },
    {
        value: "safe",
        label: "Safe",
    },
];

export function AlertsEmergenciesPanel({
    data,
}: {
    data: Record<string, Call>;
}) {
    const { setSelectedId, filterValue, handleFilterValueChange } =
        useEmergencyContext();

    const handleTabValueChange = () => {
        setSelectedId(undefined);
    };

    return (
        <div className="z-10 h-[calc(100vh-52px)] w-[350px] bg-dp-background">
            <Tabs
                defaultValue="emergencies"
                className="px-3 pt-1"
                onValueChange={handleTabValueChange}
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
                        value={filterValue || ""}
                        onValueChange={handleFilterValueChange}
                    >
                        <SelectTrigger
                            className={cn(
                                "h-7 w-20 min-w-20 max-w-20 overflow-hidden text-ellipsis whitespace-nowrap p-2 text-left text-xs",
                                "focus:ring-1 focus:ring-offset-0",
                                "[&>span]:block [&>span]:overflow-hidden [&>span]:text-ellipsis"
                            )}
                        >
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent className="min-w-24">
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
                <TabsContent value="alerts">
                    <AlertTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
