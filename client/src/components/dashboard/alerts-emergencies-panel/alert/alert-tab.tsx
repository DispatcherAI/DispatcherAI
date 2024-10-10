import { AlertCard } from "@/components/dashboard/alerts-emergencies-panel/alert/alert-card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/dispatch/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

                <TabsContent
                    value="active"
                    className="mt-0"
                >
                    <div className="h-full">
                        <ScrollArea
                            className={cn(
                                "flex flex-col overflow-y-auto",
                                `max-h-[calc(100vh-${HEIGHT}px)]` // this is bad code, but it sizes the scroll area correctly
                            )}
                            type="scroll"
                        >
                            <AlertCard
                                id="foo"
                                title="High Call Volume Alert"
                                details="Multiple 911 calls received in the last 10 minutes. Prioritize response based on severity."
                                time="10:31AM" // ! should be UNIX
                                status="active"
                            />
                        </ScrollArea>
                    </div>
                </TabsContent>

                <TabsContent
                    value="resolved"
                    className="mt-0"
                >
                    <div className="h-full">
                        <ScrollArea
                            className={cn(
                                "flex flex-col overflow-y-auto",
                                `max-h-[calc(100vh-${HEIGHT}px)]` // this is bad code, but it sizes the scroll area correctly
                            )}
                            type="scroll"
                        >
                            <AlertCard
                                id="foo"
                                title="High Call Volume Alert"
                                details="Multiple 911 calls received in the last 10 minutes. Prioritize response based on severity."
                                time="10:31AM" // ! should be UNIX
                                status="resolved"
                            />
                        </ScrollArea>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
