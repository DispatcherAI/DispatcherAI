"use client";

import { useEffect, useRef } from "react";
import { DispatchCall } from "@/app/(layout)/live/page";
import { ScrollArea } from "@/components/ui/scroll-area";

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
            className="flex grow flex-col text-dp-text"
        >
            <div
                className="space-y-4 overflow-y-auto"
                ref={ref}
            >
                {transcript.map((message, index) => (
                    <div key={index}>
                        <span className="font-semibold uppercase text-dp-headingText">
                            {message.role === "user"
                                ? "Caller"
                                : "AI Dispatcher"}
                            :
                        </span>
                        &nbsp;
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
