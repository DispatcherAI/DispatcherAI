import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Toaster as SonnerToaster } from "@/components/dispatch/sonner";
import { ReactGrabDevTools } from "@/components/react-grab-dev-tools";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const plexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "DispatcherAI",
    description: "AI-assisted emergency dispatch demo cockpit.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider
            signInForceRedirectUrl={"/api/auth/new-user"}
            signUpForceRedirectUrl={"/api/auth/new-user"}
        >
            <html
                lang="en"
                className={`${plexSans.variable} ${plexMono.variable}`}
            >
                <body className="font-sans antialiased">
                    <main>{children}</main>
                    <ReactGrabDevTools />
                    <Toaster />
                    <SonnerToaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
