import Link from "next/link";
import { redirect } from "next/navigation";
import { DossierMark } from "@/components/brand/DossierMark";
import { PhoneNumberForm } from "@/components/settings/phone-number-form";
import { ensureDbUserForClerkUser } from "@/lib/current-user";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
    ArrowLeftIcon,
    PhoneCallIcon,
    RadioTowerIcon,
    ShieldCheckIcon,
} from "lucide-react";

interface SettingsPageProps {
    searchParams?: Promise<{
        required?: string;
    }>;
}

export default async function SettingsPage({
    searchParams,
}: SettingsPageProps) {
    const { userId, redirectToSignIn } = await auth();

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
    const resolvedSearchParams = await searchParams;
    const isPhoneRequired =
        resolvedSearchParams?.required === "phone" && !dbUser.phoneNumber;

    return (
        <div className="relative min-h-screen overflow-hidden bg-ink text-white">
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,176,31,0.08),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(105,210,255,0.06),transparent_36%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(180deg,black,transparent_85%)]"
            />

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6">
                <header className="flex items-center justify-between border-b border-white/8 pb-5">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-[3px] border border-white/10 bg-white/[0.02] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-ribbon text-white/65 transition hover:border-white/25 hover:text-white"
                        >
                            <ArrowLeftIcon className="size-3" />
                            Dossier
                        </Link>
                        <DossierMark size="sm" />
                    </div>
                    <UserButton />
                </header>

                <main className="grid flex-1 items-start gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="space-y-7">
                        <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                            <RadioTowerIcon className="size-3.5" />
                            Operator profile · routing
                        </div>

                        <div className="space-y-5">
                            <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl">
                                Connect your dispatch line before going live.
                            </h1>
                            <p className="max-w-2xl text-base leading-7 text-white/65">
                                DispatchAI uses this number as the owner key
                                for inbound calls. When Retell receives a call,
                                the caller number is matched to this value and
                                the incident lands in your live workspace.
                            </p>
                        </div>

                        <div className="grid gap-px overflow-hidden rounded-[4px] border border-white/12 bg-white/8 sm:grid-cols-2">
                            <div className="bg-ink-panel p-5">
                                <ShieldCheckIcon className="mb-4 size-5 text-phosphor" />
                                <p className="font-display text-base text-white">
                                    Required for live access
                                </p>
                                <p className="mt-2 text-sm leading-6 text-white/65">
                                    The live console stays gated until your
                                    user record in Postgres has a phone number.
                                </p>
                            </div>
                            <div className="bg-ink-panel p-5">
                                <PhoneCallIcon className="mb-4 size-5 text-sodium" />
                                <p className="font-display text-base text-white">
                                    Used by the backend
                                </p>
                                <p className="mt-2 text-sm leading-6 text-white/65">
                                    The Retell backend normalises incoming
                                    numbers before attaching calls to users.
                                </p>
                            </div>
                        </div>

                        {isPhoneRequired ? (
                            <div className="rounded-[3px] border border-sodium/40 bg-sodium/[0.06] p-4">
                                <p className="font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                                    Phone required
                                </p>
                                <p className="mt-1 text-sm text-white/85">
                                    Save a number below to unlock the live
                                    cockpit.
                                </p>
                            </div>
                        ) : null}
                    </section>

                    <section className="rounded-[4px] border border-white/12 bg-ink-panel/95 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-8">
                        <header className="mb-6 space-y-2">
                            <p className="font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                                Phone settings
                            </p>
                            <h2 className="font-display text-xl text-white">
                                Dispatch routing
                            </h2>
                            <p className="text-sm leading-6 text-white/65">
                                {isPhoneRequired
                                    ? "Add a number to unlock the live dispatch cockpit."
                                    : "Update the number used to route calls into your workspace."}
                            </p>
                        </header>

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
