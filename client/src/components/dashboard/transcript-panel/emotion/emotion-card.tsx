import { Emotion } from "@/app/(layout)/live/page";
import { Badge } from "@/components/dispatch/badge";
import { Progress } from "@/components/dispatch/progress";

interface EmotionCardProps {
    emotion: Emotion;
}

export function EmotionCard({ emotion: emotionData }: EmotionCardProps) {
    const { emotion, intensity } = emotionData;

    const value = 100 * Number(intensity.toFixed(2));

    return (
        <div className="border border-dp-outlineNotSelected p-2">
            <div className="flex items-center justify-between">
                <div className="text-sm text-dp-text">{emotion}</div>

                {/* TODO: implement */}
                <div className="flex flex-row items-center space-x-2">
                    <p className="text-xxs text-dp-headingText">Confidence:</p>
                    <Badge
                        label={`${value}%`}
                        className="text-dp-headingText"
                        containerClassName="w-fit bg-dp-outlineNotSelected"
                    />
                </div>
            </div>

            <div className="flex flex-row items-center space-x-2">
                <p className="text-sm font-medium text-dp-text">{value}%</p>

                <Progress
                    value={value}
                    className="h-2 rounded-none"
                />
            </div>
        </div>
    );
}
