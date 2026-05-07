export function EmergencyStat({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="border-r border-white/8 px-3 py-2.5 last:border-r-0">
            <p className="text-xs text-white/45">{label}</p>
            <p className="mt-1 font-mono text-2xl font-medium tabular-nums text-white">
                {value}
            </p>
        </div>
    );
}
