import { EmergencyProvider } from "@/components/dashboard/emergency-context";

export default function LiveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <EmergencyProvider>
            <div className="overflow-hidden">{children}</div>
        </EmergencyProvider>
    );
}
