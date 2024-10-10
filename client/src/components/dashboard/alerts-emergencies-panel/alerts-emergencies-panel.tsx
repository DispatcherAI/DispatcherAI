import { EmergencyStat } from "@/components/dashboard/alerts-emergencies-panel/emergency-stat";

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

                <div className="flex flex-col">
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
                </div>
            </div>
        </div>
    );
}
