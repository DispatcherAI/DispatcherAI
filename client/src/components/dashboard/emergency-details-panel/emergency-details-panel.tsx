import { DispatchCall } from "@/app/(layout)/live/page";
import { EmergencyDetailsCollapsible } from "@/components/dashboard/emergency-details-panel/emergency-details-collapsible";
import { EmergencyStreetViewCollapsible } from "@/components/dashboard/emergency-details-panel/emergency-street-view-collapsible";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/dispatch/tooltip";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon, RadioTowerIcon } from "lucide-react";

interface EmergencyDetailsPanelProps {
    call: DispatchCall;
}

const SEVERITY_TONE: Record<string, { chip: string; bar: string }> = {
    Critical: { chip: "border-signal/40 bg-signal/[0.06] text-signal", bar: "bg-signal" },
    High: { chip: "border-signal/40 bg-signal/[0.06] text-signal", bar: "bg-signal" },
    Medium: { chip: "border-sodium/40 bg-sodium/[0.06] text-sodium", bar: "bg-sodium" },
    Low: { chip: "border-phosphor/40 bg-phosphor/[0.06] text-phosphor", bar: "bg-phosphor" },
};

function severityTone(s: string | null | undefined) {
    if (!s) return SEVERITY_TONE.Medium;
    const cap = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    return SEVERITY_TONE[cap] ?? SEVERITY_TONE.Medium;
}

export function EmergencyDetailsPanel({ call }: EmergencyDetailsPanelProps) {
    const finished = call.inProgress === false || call.status === "Resolved";
    const StatusIcon = finished ? CheckCircle2Icon : RadioTowerIcon;
    const statusTime = call.endedAt ?? call.createdAt;
    const formattedStatusTime = new Date(statusTime).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    const tone = severityTone(call.callAnalytics.severity);

    return (
        <div
            className={cn(
                "z-10 flex h-full max-h-full w-[308px] flex-col border border-y-0 border-l-0 border-r-white/8 bg-ink-deep/95 backdrop-blur-md xl:w-[332px]",
            )}
        >
            <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-4 py-3">
                <p className="text-sm font-medium text-white/75">Details</p>
                <span className="text-xs text-white/40">
                    {finished ? "Closed" : "Open"}
                </span>
            </div>

            <div className="space-y-4 px-4 py-4">
                <div
                    className={cn(
                        "flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                        finished
                            ? "border-white/12 bg-white/[0.02] text-white/65"
                            : "border-phosphor/25 bg-phosphor/[0.05] text-phosphor",
                    )}
                >
                    <StatusIcon className="size-3" />
                    <span>{finished ? "Finished" : "Live"}</span>
                    <span className="ml-auto font-mono tabular-nums text-white/50">
                        {formattedStatusTime}
                    </span>
                </div>

                <TooltipProvider>
                    <Tooltip delayDuration={1500}>
                        <TooltipTrigger asChild>
                            <h2
                                className={cn(
                                    "line-clamp-3 text-left text-[20px] font-medium leading-tight tracking-[-0.01em]",
                                    finished ? "text-white/75" : "text-white",
                                )}
                            >
                                {call.callAnalytics.title ?? "911 Call"}
                            </h2>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" align="start">
                            {call.callAnalytics.title ?? "911 Call"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div className="flex flex-wrap gap-1.5">
                    {call.callAnalytics.severity ? (
                        <span
                            className={cn(
                                "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                                tone.chip,
                            )}
                        >
                            {call.callAnalytics.severity}
                        </span>
                    ) : null}
                    {call.callAnalytics.type ? (
                        <span className="rounded-full border border-white/12 px-2 py-0.5 text-[10px] text-white/60">
                            {call.callAnalytics.type}
                        </span>
                    ) : null}
                </div>
            </div>

            <div className="h-px w-full bg-white/8" />

            <EmergencyStreetViewCollapsible call={call} />

            <div className="h-px w-full bg-white/8" />

            <EmergencyDetailsCollapsible call={call} />
        </div>
    );
}
