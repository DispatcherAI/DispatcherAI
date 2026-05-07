"use client";

import { useEffect, useRef } from "react";
import { DispatchCall } from "@/app/(layout)/live/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { HeadphonesIcon, RadioTowerIcon } from "lucide-react";

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
            className="flex h-full grow flex-col"
        >
            <div
                className="space-y-2 overflow-y-auto pr-1"
                ref={ref}
            >
                {transcript?.map((message, index) => {
                    const isAgent = message.role !== "user";
                    return (
                        <div
                            key={index}
                            className="rounded-[4px] border border-white/10 bg-white/[0.02] p-2.5"
                        >
                            <p
                                className={cn(
                                    "mb-1 flex items-center gap-1.5 text-xs font-medium",
                                    isAgent ? "text-phosphor" : "text-white/65",
                                )}
                            >
                                {isAgent ? (
                                    <HeadphonesIcon className="size-3" />
                                ) : (
                                    <RadioTowerIcon className="size-3" />
                                )}
                                {isAgent ? "AI Dispatcher" : "Caller"}
                            </p>
                            <p className="text-[13px] leading-5 text-white/85">
                                {message.content}
                            </p>
                        </div>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
