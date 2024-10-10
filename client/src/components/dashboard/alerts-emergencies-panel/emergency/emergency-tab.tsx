import { Call } from "@/app/(dashboard)/live/page";
import { EmergencyCard } from "@/components/dashboard/alerts-emergencies-panel/emergency-card";
import { EmergencyStat } from "@/components/dashboard/alerts-emergencies-panel/emergency-stat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function EmergencyTab({ data }: { data: Record<string, Call> }) {
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
                    {Object.entries(data).map(([id, _call]) => (
                        <>
                            <EmergencyCard
                                key={id}
                                id={id}
                                title={"House Fire in Blair Hill"}
                                time={"10:31 AM"}
                                status={"live"}
                            />
                            <EmergencyCard
                                key={"foo"}
                                id={"foo"}
                                title={"House Fire in Blair Hill"}
                                time={"10:31 AM"}
                                status={"live"}
                            />
                            <EmergencyCard
                                key={"bar"}
                                id={"bar"}
                                title={"House Fire in Blair Hill"}
                                time={"10:31 AM"}
                                status={"live"}
                            />
                        </>
                    ))}
                </ScrollArea>
            </div>
        </div>
    );
}
