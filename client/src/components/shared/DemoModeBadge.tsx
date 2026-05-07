"use client";

import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { cn } from "@/lib/utils";
import { SparklesIcon } from "lucide-react";

interface DemoModeBadgeProps {
    className?: string;
}

/**
 * Surfaces a sodium chip when no real (non-seeded) call has been observed —
 * i.e. the cockpit is currently rendering only the seeded MESSAGES record.
 *
 * Source of truth is `useEmergencyContext().data`. We treat the call set as
 * "real" once it contains anything beyond the seeded entry.
 */
export function DemoModeBadge({ className }: DemoModeBadgeProps) {
    const { data, pollingStatus } = useEmergencyContext();
    const ids = Object.keys(data);
    const onlySeeded =
        ids.length === 1 && ids[0] === "CA22ccebaacd73dcefa23f9b41a9bce0b3";

    const showDemoMode = onlySeeded || pollingStatus === "loading";

    if (!showDemoMode) return null;

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-ink/80 px-2.5 py-0.5 text-xs text-white/70 backdrop-blur-sm",
                className,
            )}
            title="No live calls received yet — showing seeded incident."
        >
            <SparklesIcon className="size-3 text-white/55" />
            Demo data
        </span>
    );
}
