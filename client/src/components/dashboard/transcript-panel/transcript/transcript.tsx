"use client";

import { useEffect, useRef } from "react";
import { Call } from "@/app/(layout)/live/page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptProps {
    call: Call | undefined;
}

export function Transcript({ call }: TranscriptProps) {
    const ref = useRef<HTMLDivElement>(null);

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
                {call?.transcript.map((message, index) => (
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
