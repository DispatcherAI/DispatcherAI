import { useState } from "react";
import { cn } from "@/lib/utils";
import { HEADER_HEIGHT } from "@/root/tailwind.config";
import { motion } from "framer-motion";
import {
    ArrowLeftRightIcon,
    CheckCircle2Icon,
    ShieldAlertIcon,
} from "lucide-react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ChatInterface from "./ChatInterface";
import EmotionCard from "./EmotionCard";

type LegacyTranscriptMessage = {
    role: string;
    content: string;
};

type LegacyCall = {
    emotions?: { emotion: string; intensity: number }[];
    transcript: LegacyTranscriptMessage[];
};

type TranscriptPanelProps = {
    call?: LegacyCall;
    selectedId: string;
};

const TranscriptPanel = ({
    call,
    selectedId,
}: TranscriptPanelProps) => {
    const [showTransferPreview, setShowTransferPreview] = useState(false);

    const emotions = call?.emotions?.sort((a, b) =>
        a.intensity < b.intensity ? 1 : -1
    );

    if (!call) {
        return null;
    }

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                `fixed right-0 top-[${HEADER_HEIGHT}px] min-h-[calc(100dvh-${HEADER_HEIGHT}px)] w-[400px] overflow-y-auto bg-white shadow-lg`
            )}
        >
            <p className="px-2 py-[6px]">Live Transcript</p>
            <Separator />

            <div className="mb-3 space-y-4 p-2 pb-3">
                <div className="flex items-center space-x-1">
                    <CheckCircle2Icon
                        className="text-green-500"
                        size={24}
                    />
                    <p className="text-md font-semibold text-green-500">
                        AI Operator Connected
                    </p>
                </div>

                <div className="flex h-full space-x-2">
                    <EmotionCard
                        emotion={
                            emotions && emotions.length > 1
                                ? emotions[0].emotion
                                : "x"
                        }
                        percentage={
                            emotions && emotions.length > 1
                                ? emotions[0].intensity * 100
                                : 0
                        }
                        color="bg-purple-500"
                    />
                    <EmotionCard
                        emotion={
                            emotions && emotions.length > 1
                                ? emotions[1].emotion
                                : "x"
                        }
                        percentage={
                            emotions && emotions.length > 1
                                ? emotions[1].intensity * 100
                                : 0
                        }
                        color="bg-purple-500"
                    />
                </div>

                <div className="mb-3 space-y-2">
                    <div>
                        <p className="text-xs font-medium uppercase leading-3 text-black text-opacity-50">
                            Call Transcript
                        </p>
                    </div>

                    <ChatInterface
                        call={call}
                        selectedId={selectedId}
                    />

                    <Button
                        type="button"
                        aria-controls="legacy-transfer-preview"
                        aria-disabled="true"
                        aria-expanded={showTransferPreview}
                        title="Transfer is disabled in this demo. Click to preview the handoff flow."
                        onClick={() =>
                            setShowTransferPreview((isVisible) => !isVisible)
                        }
                        className="w-full cursor-help space-x-2 border border-amber-500/30 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20"
                    >
                        <ArrowLeftRightIcon /> <p>Transfer Unavailable</p>
                    </Button>

                    {showTransferPreview ? (
                        <div
                            id="legacy-transfer-preview"
                            className="rounded-lg border border-amber-500/30 bg-amber-50 p-3 text-xs leading-5 text-amber-950"
                        >
                            <div className="mb-1 flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-amber-700">
                                <ShieldAlertIcon className="size-4" />
                                Transfer preview
                            </div>
                            <p>
                                In production, this would hand the transcript,
                                caller location, severity, and AI summary to a
                                human dispatcher. This demo does not initiate an
                                outbound call or operator handoff.
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </motion.div>
    );
};

export default TranscriptPanel;
