import { DispatchCall } from "@/app/(layout)/live/page";
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
import { FileCheck2Icon, RadioTowerIcon, SearchIcon } from "lucide-react";

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

interface AlertsEmergenciesPanelProps {
    data: DispatchCall[];
}

export function AlertsEmergenciesPanel({ data }: AlertsEmergenciesPanelProps) {
    const { setSelectedId, filterValue, handleFilterValueChange } =
        useEmergencyContext();

    const handleTabValueChange = () => {
        setSelectedId(undefined);
    };

    return (
        <div className="z-10 flex h-full min-h-0 w-[370px] min-w-[370px] flex-col border-r border-white/10 bg-[#080d13]/95 shadow-[18px_0_55px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <Tabs
                defaultValue="emergencies"
                className="flex min-h-0 flex-1 flex-col px-3 pt-3"
                onValueChange={handleTabValueChange}
            >
                <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xxs font-semibold uppercase tracking-[0.24em] text-dp-primary">
                                Queue
                            </p>
                            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-dp-headingText">
                                Active incidents
                            </h2>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full border border-dp-nonEmergency/20 bg-dp-nonEmergency/10 px-2 py-1 text-xxs font-semibold uppercase tracking-[0.18em] text-dp-nonEmergency">
                            <RadioTowerIcon className="size-3" />
                            Live
                        </div>
                    </div>
                </div>

                <TabsList className="h-fit w-full justify-start rounded-xl border border-white/10 bg-white/[0.035] p-1">
                    <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
                    <TabsTrigger
                        value="alerts"
                        disabled
                    >
                        Alerts
                    </TabsTrigger>
                </TabsList>

                <div className="flex-between space-x-1 py-2">
                    <Input
                        startIcon={SearchIcon}
                        placeholder="Search a location..."
                        className="h-8 border-white/10 bg-white/[0.04] text-xs"
                        startIconClassName="text-dp-primary size-3"
                        startIconPadding="pl-5"
                    />

                    <Select
                        value={filterValue || ""}
                        onValueChange={handleFilterValueChange}
                    >
                        <SelectTrigger
                            className={cn(
                                "h-8 w-24 min-w-24 max-w-24 overflow-hidden text-ellipsis whitespace-nowrap border-white/10 bg-white/[0.04] p-2 text-left text-xs",
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

                <TabsContent
                    value="emergencies"
                    className="min-h-0 flex-1"
                >
                    <EmergencyTab data={data} />
                </TabsContent>
                <TabsContent
                    value="alerts"
                    className="min-h-0 flex-1"
                >
                    <AlertTab />
                </TabsContent>
            </Tabs>

            <div className="m-3 mt-auto rounded-2xl border border-dp-primary/20 bg-dp-primary/[0.08] p-3">
                <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-dp-primary/15 text-dp-primary">
                        <FileCheck2Icon className="size-4" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-dp-headingText">
                            Demo script
                        </p>
                        <p className="mt-1 text-xs leading-5 text-dp-text">
                            Select the active bridge incident, review the AI
                            summary, then preview the transfer handoff from the
                            transcript panel.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
