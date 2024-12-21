import { CallProps } from "@/app/(layout)/live/page";
import { EmotionCard } from "@/components/dashboard/transcript-panel/emotion/emotion-card";
import { Separator } from "@/components/dispatch/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CheckCircle2Icon, ChevronDownIcon } from "lucide-react";

interface TranscriptPanelProps extends CallProps {
    handleTransfer: (id: string) => void;
}

export function TranscriptPanel({
    call,
    selectedId,
    handleTransfer,
}: TranscriptPanelProps) {
    const emotions = call?.emotions
        ?.sort((a, b) => b.intensity - a.intensity)
        .slice(0, 2);

    return (
        <div className="z-10 h-full w-[300px] bg-dp-background">
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
                    {emotions?.map((emotion) => (
                        <EmotionCard emotion={emotion} />
                    ))}
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
