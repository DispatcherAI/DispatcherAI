"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

interface TimeProps {
    className?: string;
}

const FORMATTER = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
});

export function Time({ className }: TimeProps) {
    const [time, setTime] = useState<string | undefined>();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(FORMATTER.format(now));
        };

        updateTime();

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (!time) {
        return (
            <Skeleton
                className={cn(className, "rounded-none bg-dp-hoverCard")}
            />
        );
    }

    return (
        <div className="h-fit">
            <p className={cn("uppercase", className)}>{time} PST</p>
        </div>
    );
}
