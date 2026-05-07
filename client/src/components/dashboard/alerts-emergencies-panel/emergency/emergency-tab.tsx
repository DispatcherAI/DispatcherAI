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

export function EmergencyTab({ data }: { data: DispatchCall[] }) {
    const { filterValue } = useEmergencyContext();

    const parsedData = data
        .map((call) => {
            return {
                ...call,
                normalizedSeverity: normalizeSeverity(
                    call.callAnalytics.severity
                ),
            };
        })
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .filter(
            (item) =>
                filterValue === undefined ||
                item.normalizedSeverity === filterValue
        );
    const resolvedCount = data.filter((call) =>
        call.status?.toLowerCase().includes("resolved")
    ).length;

    return (
        <div className="flex h-full min-h-0 flex-col space-y-3 pb-3">
            <div className="shrink-0 space-y-2">
                <div className="grid grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.035]">
                    <EmergencyStat
                        label="Total Calls"
                        value={String(data.length)}
                    />
                    <EmergencyStat
                        label="Resolved"
                        value={String(resolvedCount)}
                    />
                    <EmergencyStat
                        label="Priority"
                        value={String(
                            data.filter(
                                (call) =>
                                    normalizeSeverity(
                                        call.callAnalytics.severity
                                    ) === "critical"
                            ).length
                        )}
                    />
                </div>
            </div>

            {filterValue ? (
                <p className="text-center text-xs text-dp-text">
                    {data.length - parsedData.length} calls are hidden by
                    filters
                </p>
            ) : null}

            <div className="min-h-0 flex-1">
                <ScrollArea
                    className={cn("flex h-full flex-col overflow-y-auto pr-1")}
                    type="scroll"
                >
                    {parsedData.length ? (
                        parsedData.map((call) => (
                            <EmergencyCard
                                key={call.id}
                                id={call.id}
                                title={call.callAnalytics.title ?? "911 Call"}
                                time={call.callAnalytics?.createdAt}
                                severity={call.normalizedSeverity}
                            />
                        ))
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-center">
                            <InboxIcon className="mx-auto mb-3 size-6 text-dp-primary" />
                            <p className="font-medium text-dp-headingText">
                                No incidents match this filter
                            </p>
                            <p className="mt-1 text-xs text-dp-text">
                                Clear the severity filter to restore the queue.
                            </p>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    );
}
