"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TimeProps {
    className?: string;
}

const FORMATTER = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
});

export function Time({ className }: TimeProps) {
    const [time, setTime] = useState<string | undefined>();

    useEffect(() => {
        const updateTime = () => setTime(FORMATTER.format(new Date()));

        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if (!time) {
        return (
            <Skeleton
                className={cn("rounded-none bg-white/5", className)}
            />
        );
    }

    return (
        <span className={cn(className)}>
            {time}
            <span className="ml-1.5 text-white/40">PT</span>
        </span>
    );
}
