import {
    Tabs as DispatchTabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/dispatch/tabs";

export function Tabs() {
    return (
        <DispatchTabs
            defaultValue="emergencies"
            className="text-dp-text"
        >
            <TabsList>
                <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value="emergencies">Emergencies</TabsContent>
            <TabsContent value="alerts">Alerts</TabsContent>
        </DispatchTabs>
    );
}
