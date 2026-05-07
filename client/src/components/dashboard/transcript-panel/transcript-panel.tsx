import { useState } from "react";
import { DispatchCall } from "@/app/(layout)/live/page";
import { EmotionCard } from "@/components/dashboard/transcript-panel/emotion/emotion-card";
import { Transcript } from "@/components/dashboard/transcript-panel/transcript/transcript";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
    CheckCircle2Icon,
    ChevronDownIcon,
    PhoneForwardedIcon,
    RadioTowerIcon,
    ShieldAlertIcon,
} from "lucide-react";

interface TranscriptPanelProps {
    call: DispatchCall;
}

export function TranscriptPanel({ call }: TranscriptPanelProps) {
    const [showTransferPreview, setShowTransferPreview] = useState(false);
    const finished = call.inProgress === false || call.status === "Resolved";
    const ConnectionIcon = finished ? CheckCircle2Icon : RadioTowerIcon;
    const emotions: { emotion: string; intensity: number }[] | undefined = call
        .callAnalytics.sentiment as
        | { emotion: string; intensity: number }[]
        | undefined;

    const sortedEmotions = [...(emotions ?? [])]
        ?.sort((a, b) => b?.intensity - a?.intensity)
        .slice(0, 2);

    return (
        <div
            className={cn(
                "z-10 flex h-full max-h-full w-[316px] flex-col border-l border-white/8 bg-ink-deep/95 backdrop-blur-md xl:w-[346px]",
            )}
        >
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <p className="text-sm font-medium text-white/75">
                    {finished ? "Transcript" : "Live transcript"}
                </p>
                <span className="text-xs text-white/40">Caller × AI</span>
            </div>

            <div
                className={cn(
                    "mx-4 my-4 flex items-center gap-3 rounded-[4px] border px-3 py-2.5",
                    finished
                        ? "border-white/12 bg-white/[0.02]"
                        : "border-phosphor/25 bg-phosphor/[0.04]",
                )}
            >
                <ConnectionIcon
                    className={cn(
                        "size-4",
                        finished ? "text-white/55" : "text-phosphor",
                    )}
                />
                <div className="flex flex-col">
                    <p
                        className={cn(
                            "text-sm font-medium leading-tight",
                            finished ? "text-white/75" : "text-white",
                        )}
                    >
                        {finished ? "Call closed" : "AI operator connected"}
                    </p>
                    <p className="text-xs text-white/50">
                        Retell &middot; FastAPI orchestrator
                    </p>
                </div>
                {!finished ? (
                    <span className="ml-auto pulse-dot text-phosphor" />
                ) : null}
            </div>

            <div className="h-px w-full bg-white/8" />

            <Collapsible
                className="flex flex-col gap-3 px-4 py-4"
                defaultOpen
            >
                <CollapsibleTrigger className="flex justify-between text-left text-sm font-medium text-white/65">
                    <p>Caller emotion</p>
                    <ChevronDownIcon className="size-3.5 stroke-white/45" />
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2">
                    {sortedEmotions?.length ? (
                        sortedEmotions.map((emotion) => (
                            <EmotionCard
                                key={emotion.emotion}
                                emotion={emotion}
                            />
                        ))
                    ) : (
                        <p className="text-xs text-white/45">
                            No emotion data captured.
                        </p>
                    )}
                </CollapsibleContent>
            </Collapsible>

            <div className="h-px w-full bg-white/8" />

            <Collapsible
                className="flex min-h-0 grow flex-col gap-3 overflow-hidden px-4 py-4"
                defaultOpen
            >
                <CollapsibleTrigger className="flex justify-between text-left text-sm font-medium text-white/65">
                    <p>Conversation</p>
                    <ChevronDownIcon className="size-3.5 stroke-white/45" />
                </CollapsibleTrigger>

                <CollapsibleContent className="min-h-0 grow overflow-auto">
                    <Transcript call={call} />
                </CollapsibleContent>
            </Collapsible>

            <div className="h-px w-full bg-white/8" />

            <div className="mt-auto flex flex-col gap-3 px-4 py-4">
                <button
                    type="button"
                    aria-controls="transfer-preview"
                    aria-disabled="true"
                    aria-expanded={showTransferPreview}
                    title="Transfer is disabled in this demo. Click to preview the handoff flow."
                    className="flex h-10 items-center justify-center gap-2 rounded-[4px] border border-white/12 bg-white/[0.02] text-sm font-medium text-white/80 transition hover:border-white/25 hover:bg-white/[0.04]"
                    onClick={() =>
                        setShowTransferPreview((isVisible) => !isVisible)
                    }
                >
                    <PhoneForwardedIcon className="size-3.5" />
                    Transfer (preview)
                </button>

                {showTransferPreview ? (
                    <div
                        id="transfer-preview"
                        className="rounded-[4px] border border-white/10 bg-white/[0.02] p-3 text-xs leading-5 text-white/75"
                    >
                        <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white">
                            <ShieldAlertIcon className="size-3.5 text-white/60" />
                            Transfer preview
                        </div>
                        <p>
                            In a live deployment, this would package the
                            transcript, caller location, severity, and AI
                            summary for a human dispatcher, then keep the AI in
                            monitor mode while the operator joins.
                        </p>
                        <p className="mt-2 text-white">
                            No outbound call or dispatcher handoff is being
                            initiated in this demo.
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
