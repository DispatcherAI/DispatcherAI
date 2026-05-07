import { useState } from "react";
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
import {
    CheckCircle2Icon,
    ChevronDownIcon,
    PhoneForwardedIcon,
    ShieldAlertIcon,
} from "lucide-react";

interface TranscriptPanelProps {
    call: DispatchCall;
}

export function TranscriptPanel({ call }: TranscriptPanelProps) {
    const [showTransferPreview, setShowTransferPreview] = useState(false);
    const emotions: { emotion: string; intensity: number }[] | undefined = call
        .callAnalytics.sentiment as
        | { emotion: string; intensity: number }[]
        | undefined;

    const sortedEmotions = [...(emotions ?? [])]
        ?.sort((a, b) => b?.intensity - a?.intensity)
        .slice(0, 2);

    return (
        <div className="z-10 flex h-full max-h-full w-[330px] flex-col border-l border-white/10 bg-[#080d13]/95 backdrop-blur-xl">
            <div className="px-4 py-3 text-sm text-dp-text">
                <p className="text-xxs font-semibold uppercase tracking-[0.22em]">
                    Live Transcript
                </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="mx-4 my-4 flex items-center space-x-3 rounded-2xl border border-dp-nonEmergency/20 bg-dp-nonEmergency/10 p-3">
                <CheckCircle2Icon className="size-5 fill-dp-nonEmergency text-dp-background" />
                <div className="text-sm font-semibold text-dp-headingText">
                    AI Operator Connected
                </div>
            </div>

            <Separator className="bg-white/10" />

            <Collapsible
                className="flex flex-col space-y-4 px-4 py-4"
                defaultOpen
            >
                <CollapsibleTrigger className="flex justify-between text-left text-xs font-semibold uppercase tracking-[0.18em] text-dp-headingText">
                    <p>Caller Emotion</p>
                    <ChevronDownIcon className="size-4 stroke-dp-text" />
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2">
                    {sortedEmotions?.map((emotion) => (
                        <EmotionCard
                            key={emotion.emotion}
                            emotion={emotion}
                        />
                    ))}
                </CollapsibleContent>
            </Collapsible>

            <Separator className="bg-white/10" />

            <Collapsible
                className="flex min-h-0 grow flex-col space-y-4 overflow-hidden px-4 py-4"
                defaultOpen
            >
                <CollapsibleTrigger className="flex justify-between text-left text-xs font-semibold uppercase tracking-[0.18em] text-dp-headingText">
                    <p>Call Transcript</p>
                    <ChevronDownIcon className="size-4 stroke-dp-text" />
                </CollapsibleTrigger>

                <CollapsibleContent className="min-h-0 grow space-y-2 overflow-auto">
                    <Transcript call={call} />
                </CollapsibleContent>
            </Collapsible>

            <Separator className="bg-white/10" />

            <div className="mt-auto flex flex-col space-y-4 px-4 py-4">
                <Button
                    type="button"
                    aria-controls="transfer-preview"
                    aria-disabled="true"
                    aria-expanded={showTransferPreview}
                    title="Transfer is disabled in this demo. Click to preview the handoff flow."
                    className="h-10 cursor-help rounded-xl border border-dp-primary/20 bg-dp-primary/10 font-semibold text-dp-primary hover:bg-dp-primary/15"
                    onClick={() =>
                        setShowTransferPreview((isVisible) => !isVisible)
                    }
                >
                    <PhoneForwardedIcon className="mr-2 size-4" />
                    Transfer Unavailable
                </Button>

                {showTransferPreview ? (
                    <div
                        id="transfer-preview"
                        className="rounded-2xl border border-dp-primary/20 bg-dp-primary/10 p-3 text-xs leading-5 text-dp-headingText"
                    >
                        <div className="mb-2 flex items-center gap-2 font-semibold uppercase tracking-[0.16em] text-dp-primary">
                            <ShieldAlertIcon className="size-4" />
                            Transfer preview
                        </div>
                        <p className="text-dp-text">
                            In a live deployment, this would package the
                            transcript, caller location, severity, and AI
                            summary for a human dispatcher, then keep the AI in
                            monitor mode while the operator joins.
                        </p>
                        <p className="mt-2 font-medium text-dp-headingText">
                            No outbound call or dispatcher handoff is being
                            initiated in this demo.
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
