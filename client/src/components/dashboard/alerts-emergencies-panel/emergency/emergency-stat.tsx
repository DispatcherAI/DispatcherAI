export function EmergencyStat({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="space-y-1 border-r border-white/10 p-3 last:border-r-0">
            <p className="line-clamp-1 truncate whitespace-nowrap text-xxs font-semibold uppercase tracking-[0.18em] text-dp-text">
                {label}
            </p>
            <p className="font-mono text-2xl font-semibold text-dp-headingText">
                {value}
            </p>
        </div>
    );
}
