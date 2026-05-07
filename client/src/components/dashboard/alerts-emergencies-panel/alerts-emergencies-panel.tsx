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
    { value: "_CLEAR", label: "" },
    { value: "critical", label: "Critical" },
    { value: "warning", label: "Warning" },
    { value: "safe", label: "Safe" },
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
        <aside className="z-10 flex h-full min-h-0 w-[332px] min-w-[332px] flex-col border-r border-white/8 bg-ink-deep/95 backdrop-blur-md xl:w-[348px] xl:min-w-[348px]">
            <Tabs
                defaultValue="emergencies"
                className="flex min-h-0 flex-1 flex-col px-3 pt-3"
                onValueChange={handleTabValueChange}
            >
                <header className="mb-3 flex items-center justify-between gap-3 px-1 py-2">
                    <h2 className="text-base font-medium text-white">
                        Active incidents
                    </h2>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-phosphor/25 bg-phosphor/[0.06] px-2 py-0.5 text-xs text-phosphor">
                        <RadioTowerIcon className="size-3" />
                        Live
                    </div>
                </header>

                <TabsList className="h-fit w-full justify-start rounded-[3px] border border-white/10 bg-white/[0.02] p-1">
                    <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
                    <TabsTrigger
                        value="alerts"
                        disabled
                    >
                        Alerts
                    </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2 py-2">
                    <Input
                        startIcon={SearchIcon}
                        placeholder="Search a location…"
                        className="h-8 border-white/10 bg-white/[0.02] text-xs"
                        startIconClassName="text-white/40 size-3"
                        startIconPadding="pl-5"
                    />

                    <Select
                        value={filterValue || ""}
                        onValueChange={handleFilterValueChange}
                    >
                        <SelectTrigger
                            className={cn(
                                "h-8 w-24 min-w-24 max-w-24 overflow-hidden text-ellipsis whitespace-nowrap rounded-[3px] border-white/10 bg-white/[0.02] p-2 text-left text-xs",
                                "focus:ring-1 focus:ring-offset-0",
                                "[&>span]:block [&>span]:overflow-hidden [&>span]:text-ellipsis",
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

            <div className="m-3 mt-auto rounded-[4px] border border-white/8 bg-white/[0.02] p-3">
                <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-[4px] border border-white/8 bg-white/[0.03] text-white/55">
                        <FileCheck2Icon className="size-3.5" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-white/70">
                            Demo script
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/55">
                            Pick the seeded bridge incident, scan the AI
                            summary, then preview the dispatcher hand-off from
                            the transcript pane.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
