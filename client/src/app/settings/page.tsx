import Link from "next/link";
import { redirect } from "next/navigation";
import { PhoneNumberForm } from "@/components/settings/phone-number-form";
import { ensureDbUserForClerkUser } from "@/lib/current-user";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ArrowLeftIcon, RadioTowerIcon, ShieldCheckIcon } from "lucide-react";

interface SettingsPageProps {
    searchParams?: {
        required?: string;
    };
}

export default async function SettingsPage({
    searchParams,
}: SettingsPageProps) {
    const { userId, redirectToSignIn } = auth();

    if (!userId) {
        return redirectToSignIn({
            returnBackUrl: "/settings",
        });
    }

    const clerkUser = await currentUser();

    if (!clerkUser) {
        redirect("/");
    }

    const dbUser = await ensureDbUserForClerkUser(clerkUser);
    const isPhoneRequired =
        searchParams?.required === "phone" && !dbUser.phoneNumber;

    return (
        <div className="min-h-screen overflow-hidden bg-[#070b10] text-dp-headingText">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(105,210,255,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(250,188,31,0.09),transparent_28%)]" />
            <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-6">
                <header className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-dp-text transition hover:text-dp-headingText"
                    >
                        <ArrowLeftIcon className="size-4" />
                        DispatcherAI
                    </Link>
                    <UserButton />
                </header>

                <main className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="space-y-7">
                        <div className="inline-flex items-center gap-2 rounded-full border border-dp-primary/20 bg-dp-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-dp-primary">
                            <RadioTowerIcon className="size-3.5" />
                            Caller routing setup
                        </div>

                        <div className="space-y-4">
                            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
                                Connect your dispatch line before going live.
                            </h1>
                            <p className="max-w-2xl text-base leading-7 text-dp-text sm:text-lg">
                                DispatcherAI uses this phone number as the owner
                                key for inbound calls. When Retell receives a
                                call, the caller number is matched against this
                                value and the incident is stored in your live
                                workspace.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                <ShieldCheckIcon className="mb-3 size-5 text-dp-nonEmergency" />
                                <p className="text-sm font-semibold text-white">
                                    Required for live access
                                </p>
                                <p className="mt-2 text-sm leading-6 text-dp-text">
                                    The live dashboard stays locked until your
                                    account has a phone number in Neon.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                <RadioTowerIcon className="mb-3 size-5 text-dp-primary" />
                                <p className="text-sm font-semibold text-white">
                                    Used by the backend
                                </p>
                                <p className="mt-2 text-sm leading-6 text-dp-text">
                                    The Retell backend normalizes incoming
                                    numbers before it attaches calls to users.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#080d13]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                        <div className="mb-6 space-y-2">
                            <h2 className="text-xl font-semibold text-white">
                                Phone settings
                            </h2>
                            <p className="text-sm leading-6 text-dp-text">
                                {isPhoneRequired
                                    ? "Add a number to unlock the live dispatch cockpit."
                                    : "Update the number used to route calls into your workspace."}
                            </p>
                        </div>

                        <PhoneNumberForm
                            initialPhoneNumber={dbUser.phoneNumber}
                            isRequired={isPhoneRequired}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
}
