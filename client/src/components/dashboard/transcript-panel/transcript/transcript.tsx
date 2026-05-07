"use client";

import { useEffect, useRef } from "react";
import { DispatchCall } from "@/app/(layout)/live/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TranscriptProps {
    call: DispatchCall;
}

export function Transcript({ call }: TranscriptProps) {
    const ref = useRef<HTMLDivElement>(null);

    const transcript = (call.transcript as Record<string, object>)
        ?.transcript as Record<string, string>[];

    useEffect(() => {
        const scrollIntoViewInterval = () => {
            if (ref.current) {
                ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        };

        scrollIntoViewInterval();

        return () => scrollIntoViewInterval();
    }, [call]);

    return (
        <ScrollArea
            type="scroll"
            className="flex h-full grow flex-col text-dp-text"
        >
            <div
                className="space-y-3 overflow-y-auto"
                ref={ref}
            >
                {transcript?.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                            "rounded-2xl border p-3",
                            message.role === "user"
                                ? "border-amber-300/20 bg-amber-300/[0.08]"
                                : "border-dp-primary/20 bg-dp-primary/[0.08]"
                        )}
                    >
                        <p className="mb-1 text-xxs font-semibold uppercase tracking-[0.18em] text-dp-text">
                            {message.role === "user"
                                ? "Caller"
                                : "AI Dispatcher"}
                        </p>
                        <p className="text-sm leading-6 text-dp-headingText">
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
