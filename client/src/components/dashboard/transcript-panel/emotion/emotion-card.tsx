// import { Badge } from "@/components/dispatch/badge";
import { Progress } from "@/components/dispatch/progress";

interface EmotionCardProps {
    emotion: { emotion: string; intensity: number };
}

export function EmotionCard({ emotion: emotionData }: EmotionCardProps) {
    const { emotion, intensity } = emotionData;

    const value = Number((100 * Number(intensity.toFixed(2))).toFixed(2));

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-dp-headingText">
                    {emotion}
                </div>
                <div className="font-mono text-xs text-dp-primary">
                    {value}%
                </div>
            </div>

            <div className="mt-3 flex flex-row items-center space-x-2">
                <Progress
                    value={value}
                    className="h-2 rounded-full bg-white/10"
                />
            </div>
        </div>
    );
}
