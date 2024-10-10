import { EmergencyProvider } from "@/components/dashboard/emergency-context";

export default function LiveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <EmergencyProvider>{children}</EmergencyProvider>;
}
