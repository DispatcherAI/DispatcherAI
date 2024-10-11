import { AlertCard } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-card";
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
    },
    {
        value: "resolved",
        label: "Resolved",
    },
];

const HEIGHT = 167;
const ACTIVE_ALERTS = ALERTS.active;
const RESOLVED_ALERTS = ALERTS.resolved;

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

                <TabsContent value="active">
                    <div className="h-full">
                        <ScrollArea
                            className={cn(
                                "flex flex-col overflow-y-auto",
                                `max-h-[calc(100vh-${HEIGHT}px)]` // this is bad code, but it sizes the scroll area correctly
                            )}
                            type="scroll"
                        >
                            {ACTIVE_ALERTS.map((alert) => (
                                <AlertCard
                                    key={alert.id}
                                    {...alert}
                                />
                            ))}
                        </ScrollArea>
                    </div>
                </TabsContent>

                <TabsContent value="resolved">
                    <div className="h-full">
                        <ScrollArea
                            className={cn(
                                "flex flex-col overflow-y-auto",
                                `max-h-[calc(100vh-${HEIGHT}px)]` // this is bad code, but it sizes the scroll area correctly
                            )}
                            type="scroll"
                        >
                            {RESOLVED_ALERTS.map((alert) => (
                                <AlertCard
                                    key={alert.id}
                                    {...alert}
                                />
                            ))}
                        </ScrollArea>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
