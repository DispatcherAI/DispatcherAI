import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EmergencyProvider } from "@/components/dashboard/emergency-context";
import { Header } from "@/components/header/header";
// import Header from "@/components/dashboard/Header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { ensureDbUserForClerkUser } from "@/lib/current-user";
import { auth, currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
    title: "Dashboard — DispatcherAI",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId, redirectToSignIn } = auth();

    if (!userId) {
        return redirectToSignIn({
            returnBackUrl: "/live",
        });
    }

    const clerkUser = await currentUser();

    if (!clerkUser) {
        redirect("/");
    }

    const dbUser = await ensureDbUserForClerkUser(clerkUser);

    if (!dbUser.phoneNumber) {
        redirect("/settings?required=phone");
    }

    return (
        <EmergencyProvider>
            <div className="flex h-[100dvh] max-h-[100dvh] min-w-[100dvw] max-w-[100dvw] overflow-hidden bg-[#070b10] text-dp-headingText">
                <Sidebar />

                <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(105,210,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(250,188,31,0.08),transparent_28%)]" />
                    {/* <Header /> */}
                    <Header phoneNumber={dbUser.phoneNumber} />
                    <div className="relative z-10 min-h-0 flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </EmergencyProvider>
    );
}
