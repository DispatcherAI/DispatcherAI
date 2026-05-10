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

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://dispatchai.art3m1s.me");

const TITLE = "DispatchAI — empathetic AI for 911";
const DESCRIPTION =
    "Long-form case study and live operator console for an AI dispatcher built in 36 hours. Grand prize, UC Berkeley AI Hackathon 2024 — Twilio · Retell · FastAPI · Mistral · Hume EVI.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: TITLE,
        template: "%s · DispatchAI",
    },
    description: DESCRIPTION,
    applicationName: "DispatchAI",
    authors: [{ name: "Bill Zhang" }, { name: "DispatchAI team" }],
    creator: "Bill Zhang",
    keywords: [
        "DispatchAI",
        "Berkeley AI Hackathon 2024",
        "AI dispatcher",
        "911 AI",
        "voice agent",
        "Retell",
        "Twilio",
        "Hume EVI",
        "Mistral",
        "FastAPI",
        "Next.js portfolio",
    ],
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
    },
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: "DispatchAI",
        title: TITLE,
        description: DESCRIPTION,
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        creator: "@billzhangsc",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export const viewport = {
    themeColor: "#0A0B0D",
    colorScheme: "dark" as const,
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
