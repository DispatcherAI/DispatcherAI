import { DispatchCall } from "@/app/(layout)/live/page";
import { EmergencyCard } from "@/components/dashboard/alerts-emergencies-panel/emergency/emergency-card";
import { EmergencyStat } from "@/components/dashboard/alerts-emergencies-panel/emergency/emergency-stat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function EmergencyTab({ data }: { data: DispatchCall[] }) {
    return (
        <div className="space-y-3 pb-3">
            <div className="grid grid-cols-3">
                <EmergencyStat />
                <EmergencyStat />
                <EmergencyStat />
            </div>
            <div className="h-full">
                <ScrollArea
                    className={cn(
                        "flex flex-col overflow-y-auto",
                        "max-h-[calc(100vh-162px)]" // this is bad code, but it sizes the scroll area correctly
                    )}
                    type="scroll"
                >
                    {data
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .map((call) => (
                            <EmergencyCard
                                key={call.id}
                                id={call.id}
                                title={call.callAnalytics.title ?? "911 Call"} // FIX ME
                                time={call.callAnalytics?.createdAt}
                                severity={"live"}
                            />
                        ))}
                    {/* <EmergencyCard
                        key={"foo"}
                        id={"foo"}
                        title={"House Fire in Blair Hill"}
                        time={"10:31 AM"}
                        severity={"warning"}
                    />
                    <EmergencyCard
                        key={"bar"}
                        id={"bar"}
                        title={"House Fire in Blair Hill"}
                        time={"10:31 AM"}
                        severity={"safe"}
                    /> */}
                </ScrollArea>
            </div>
        </div>
    );
}
