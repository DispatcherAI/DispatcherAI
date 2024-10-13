import { AlertDropdownMenu } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-details/alert-details";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/dispatch/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { ALERTS } from "./alerts.type";

const TABS = [
    {
        value: "active",
        label: "Active",
        alerts: ALERTS.active,
    },
    {
        value: "resolved",
        label: "Resolved",
        alerts: ALERTS.resolved,
    },
];

const HEIGHT = 167;

export function AlertTab() {
    return (
        <div className="space-y-3 pb-3">
            <Tabs defaultValue="active">
                <TabsList className="h-fit space-x-0">
                    {TABS.map((tab) => (
                        <TabsTrigger
                            value={tab.value}
                            className={cn(
                                "border-none p-1 text-xs text-dp-inputText hover:border-none",
                                "data-[state=active]:border-none data-[state=active]:bg-dp-card data-[state=active]:font-semibold"
                            )}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {TABS.map((tab) => (
                    <TabsContent
                        key={tab.value}
                        value={tab.value}
                    >
                        <div className="h-full">
                            <ScrollArea
                                className={cn(
                                    "flex flex-col overflow-y-auto",
                                    `max-h-[calc(100vh-${HEIGHT}px)]` // this is bad code, but it sizes the scroll area correctly
                                )}
                                type="scroll"
                            >
                                {tab.alerts.map((alert) => (
                                    <AlertDropdownMenu
                                        key={alert.id}
                                        alert={alert}
                                    />
                                ))}
                            </ScrollArea>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
