interface EmotionCardProps {
    emotion: { emotion: string; intensity: number };
}

export function EmotionCard({ emotion: emotionData }: EmotionCardProps) {
    const { emotion, intensity } = emotionData;
    const value = Number((100 * Number(intensity.toFixed(2))).toFixed(0));
    const isHigh = value >= 50;

    return (
        <div className="rounded-[4px] border border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium text-white">{emotion}</p>
                <p className="font-mono text-xs tabular-nums text-white/65">
                    {value}%
                </p>
            </div>

            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/8">
                <div
                    className={
                        isHigh ? "h-full bg-signal" : "h-full bg-white/55"
                    }
                    style={{ width: `${Math.min(100, value)}%` }}
                />
            </div>
        </div>
    );
}
