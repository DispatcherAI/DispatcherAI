import { EmergencyStat } from "@/components/dashboard/alerts-emergencies-panel/emergency-stat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { EmergencyCard } from "./emergency-card";

export function AlertsEmergenciesPanel() {
    return (
        <div className="h-full w-[350px] bg-[#1E1E1E]">
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
                            "max-h-[calc(100vh-152px)]" // this is bad code, but it sizes the scroll area correctly
                        )}
                        type="scroll"
                    >
                        <EmergencyCard
                            title={"House Fire in Blair Hill"}
                            time={"10:31 AM"}
                            status={"live"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"critical"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"warning"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"safe"}
                        />
                        <EmergencyCard
                            title={"House Fire in Blair Hills"}
                            time={"10:31 AM"}
                            status={"warning"}
                        />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
