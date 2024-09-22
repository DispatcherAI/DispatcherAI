import type { Metadata } from "next";
import Header from "@/components/dashboard/Header";

import Sidebar from "../../components/dashboard/Sidebar";

export const metadata: Metadata = {
    title: "Dashboard — DispatcherAI",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-[100dvh] max-h-[100dvh] min-w-[100dvw] max-w-[100dvw] overflow-hidden">
            <Sidebar />

            <div className="max-h-[100dvh] w-full">
                <Header />
                {children}
            </div>
        </div>
    );
}
