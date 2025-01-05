export function EmergencyStat({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="space-y-1 p-3 py-1">
            <p className="line-clamp-1 truncate whitespace-nowrap text-sm font-medium text-dp-text">
                {label}
            </p>
            <p className="text-xl font-semibold text-dp-headingText">{value}</p>
        </div>
    );
}
