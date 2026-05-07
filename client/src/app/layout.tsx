import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
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

const fraunces = Fraunces({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-display",
    axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
    title: "DispatchAI — Berkeley AI Hackathon 2024 grand prize",
    description:
        "An empathetic AI dispatcher for 911 — case study and live operator console. Grand prize, UC Berkeley AI Hackathon 2024.",
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
                className={`${plexSans.variable} ${plexMono.variable} ${fraunces.variable}`}
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
