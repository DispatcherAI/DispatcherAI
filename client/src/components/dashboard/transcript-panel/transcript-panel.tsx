import { DispatchCall } from "@/app/(layout)/live/page";
import { EmotionCard } from "@/components/dashboard/transcript-panel/emotion/emotion-card";
import { Transcript } from "@/components/dashboard/transcript-panel/transcript/transcript";
import { Button } from "@/components/dispatch/button";
import { Separator } from "@/components/dispatch/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CheckCircle2Icon, ChevronDownIcon } from "lucide-react";

interface TranscriptPanelProps {
    call: DispatchCall;
    handleTransfer: (id?: string) => void;
}

export function TranscriptPanel({
    call,
    handleTransfer,
}: TranscriptPanelProps) {
    const emotions: { emotion: string; intensity: number }[] = call
        .callAnalytics.sentiment as { emotion: string; intensity: number }[];

    const sortedEmotions = emotions
        .sort((a, b) => b?.intensity - a?.intensity)
        .slice(0, 2);

    return (
        <div className="z-10 flex max-h-[calc(100vh-52px)] w-[300px] flex-col bg-dp-background">
            <div className="px-3 py-1 text-sm text-dp-text">
                Live Transcript
            </div>

            <Separator />

            <div className="flex items-center space-x-1 px-3 py-3">
                <CheckCircle2Icon className="fill-dp-nonEmergency" />
                <div className="text-sm font-medium text-dp-headingText">
                    AI Operator Connected
                </div>
            </div>

            <Separator />

            <Collapsible
                className="flex flex-col space-x-1 space-y-4 px-3 py-3"
                defaultOpen
            >
                <CollapsibleTrigger className="flex justify-between text-left text-sm font-semibold uppercase text-dp-headingText">
                    <p>Caller Emotion</p>
                    <ChevronDownIcon className="stroke-dp-hoverCard" />
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2">
                    {sortedEmotions?.map((emotion) => (
                        <EmotionCard emotion={emotion} />
                    ))}
                </CollapsibleContent>
            </Collapsible>

            <Separator />

            <Collapsible
                className="flex flex-col space-x-1 space-y-4 overflow-auto px-3 py-3"
                defaultOpen
            >
                <CollapsibleTrigger className="flex justify-between text-left text-sm font-semibold uppercase text-dp-headingText">
                    <p>Call Transcript</p>
                    <ChevronDownIcon className="stroke-dp-hoverCard" />
                </CollapsibleTrigger>

                <CollapsibleContent className="grow space-y-2 overflow-auto">
                    <Transcript call={call} />
                </CollapsibleContent>
            </Collapsible>

            <Separator />

            <div className="mt-auto flex flex-col space-x-1 space-y-4 px-3 py-3">
                <Button onClick={() => handleTransfer()}>Transfer Call</Button>
            </div>
        </div>
    );
}
