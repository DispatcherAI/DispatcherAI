"use client";

import { useEffect, useState } from "react";

interface TimeProps {
    className?: string;
}

export function Time({ className }: TimeProps) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        };

        updateTime();

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <p className={className}>{time}</p>;
}
