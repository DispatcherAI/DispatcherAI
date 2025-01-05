import { DispatchCall } from "@/app/(layout)/live/page";
import { EmergencyCard } from "@/components/dashboard/alerts-emergencies-panel/emergency/emergency-card";
import { EmergencyStat } from "@/components/dashboard/alerts-emergencies-panel/emergency/emergency-stat";
import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { Separator } from "@/components/dispatch/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Severity } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function EmergencyTab({ data }: { data: DispatchCall[] }) {
    const { filterValue } = useEmergencyContext();

    const parsedData = data
        .map((call) => {
            const caSeverity = call.callAnalytics.severity;
            const severity =
                caSeverity === "Critical" || caSeverity === "High"
                    ? "critical"
                    : "warning";

            // ! FIX ME
            //@ts-expect-error type-casting due to type mismatch between Severity Enum and frontend
            call.callAnalytics.severity = severity;

            return call;
        })
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .filter(
            (item) =>
                filterValue === undefined ||
                (item.callAnalytics.severity as Severity) === filterValue
        );

    return (
        <div className="space-y-3 pb-3">
            <div className="grid grid-cols-3">
                <EmergencyStat
                    label="Total Calls"
                    value={String(data.length)}
                />
                <EmergencyStat
                    label="Resolved"
                    value={"N/A"}
                />
            </div>

            {filterValue && parsedData.length < data.length ? (
                <div className="flex-center flex-col space-y-3">
                    <Separator />

                    <p className="text-xs text-dp-text">
                        {data.length - parsedData.length} calls are hidden by
                        filters
                    </p>
                </div>
            ) : null}

            <div className="h-full">
                <ScrollArea
                    className={cn(
                        "flex flex-col overflow-y-auto",
                        "max-h-[calc(100vh-162px)]" // this is bad code, but it sizes the scroll area correctly
                    )}
                    type="scroll"
                >
                    {parsedData.map((call) => (
                        <EmergencyCard
                            key={call.id}
                            id={call.id}
                            title={call.callAnalytics.title ?? "911 Call"} // FIX ME
                            time={call.callAnalytics?.createdAt}
                            severity={call.callAnalytics?.severity as Severity}
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
