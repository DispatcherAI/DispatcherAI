import { DispatchCall } from "@/app/(layout)/live/page";
import { EmergencyCard } from "@/components/dashboard/alerts-emergencies-panel/emergency/emergency-card";
import { EmergencyStat } from "@/components/dashboard/alerts-emergencies-panel/emergency/emergency-stat";
import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Severity } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { InboxIcon } from "lucide-react";

function normalizeSeverity(severity: string | null | undefined): Severity {
    if (
        severity === "Critical" ||
        severity === "High" ||
        severity === "critical"
    ) {
        return "critical";
    }

    if (severity === "safe") {
        return "safe";
    }

    return "warning";
}

function isFinishedCall(call: DispatchCall) {
    return call.inProgress === false || call.status === "Resolved";
}

export function EmergencyTab({ data }: { data: DispatchCall[] }) {
    const { filterValue } = useEmergencyContext();

    const parsedData = data
        .map((call) => ({
            ...call,
            normalizedSeverity: normalizeSeverity(call.callAnalytics.severity),
            finished: isFinishedCall(call),
        }))
        .sort((a, b) => {
            if (a.finished !== b.finished) {
                return a.finished ? 1 : -1;
            }
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        })
        .filter(
            (item) =>
                filterValue === undefined ||
                item.normalizedSeverity === filterValue,
        );
    const finishedCount = data.filter(isFinishedCall).length;
    const liveCount = data.length - finishedCount;

    return (
        <div className="flex h-full min-h-0 flex-col space-y-3 pb-3">
            <div className="shrink-0 space-y-2">
                <div className="grid grid-cols-3 rounded-[3px] border border-white/10 bg-white/[0.02]">
                    <EmergencyStat
                        label="Total"
                        value={String(data.length).padStart(2, "0")}
                    />
                    <EmergencyStat
                        label="Live"
                        value={String(liveCount).padStart(2, "0")}
                    />
                    <EmergencyStat
                        label="Closed"
                        value={String(finishedCount).padStart(2, "0")}
                    />
                </div>
            </div>

            {filterValue ? (
                <p className="text-center text-xs text-white/45">
                    {data.length - parsedData.length} hidden by filters
                </p>
            ) : null}

            <div className="min-h-0 flex-1">
                <ScrollArea
                    className={cn("flex h-full flex-col overflow-y-auto pr-1")}
                    type="scroll"
                >
                    {parsedData.length ? (
                        <div className="space-y-2">
                            {parsedData.map((call) => (
                                <EmergencyCard
                                    key={call.id}
                                    id={call.id}
                                    title={
                                        call.callAnalytics.title ?? "911 Call"
                                    }
                                    time={call.callAnalytics?.createdAt}
                                    endedAt={call.endedAt}
                                    severity={call.normalizedSeverity}
                                    finished={call.finished}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[3px] border border-white/10 bg-white/[0.02] p-6 text-center">
                            <InboxIcon className="mx-auto mb-3 size-5 text-white/55" />
                            <p className="text-sm font-medium text-white">
                                No incidents match this filter
                            </p>
                            <p className="mt-1 text-xs text-white/55">
                                Clear the severity filter to restore the queue.
                            </p>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    );
}
