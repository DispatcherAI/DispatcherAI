import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EmergencyProvider } from "@/components/dashboard/emergency-context";
import { Header } from "@/components/header/header";
// import Header from "@/components/dashboard/Header";
import { ProvenanceBar } from "@/components/shared/ProvenanceBar";
import { Sidebar } from "@/components/sidebar/sidebar";
import { ensureDbUserForClerkUser } from "@/lib/current-user";
import { auth, currentUser } from "@clerk/nextjs/server";

const DISPATCHER_PHONE_NUMBER =
    process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER ??
    process.env.RETELL_PHONE_NUMBER ??
    "+13192504307";

export const metadata: Metadata = {
    title: "Dashboard — DispatcherAI",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId, redirectToSignIn } = await auth();

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
            <div className="flex h-[100dvh] max-h-[100dvh] min-w-[100dvw] max-w-[100dvw] overflow-hidden bg-ink text-white">
                <Sidebar />

                <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
                    <Header dispatcherPhoneNumber={DISPATCHER_PHONE_NUMBER} />
                    <div className="relative z-10 min-h-0 flex-1">
                        {children}
                    </div>
                    <ProvenanceBar />
                </div>
            </div>
        </EmergencyProvider>
    );
}
