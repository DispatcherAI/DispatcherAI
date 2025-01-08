export default function LiveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="overflow-hidden">{children}</div>;
}
