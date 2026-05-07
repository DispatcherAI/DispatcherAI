import { Separator } from "@/components/dispatch/separator";
import { ConnectionStatus } from "@/components/header/connection-status";
import { Time } from "@/components/header/time";
import { WeatherCondition } from "@/components/header/weather-condition";
import { formatPhoneNumberForDisplay } from "@/lib/phone";
import { HeadsetIcon, PhoneIcon, RadioTowerIcon } from "lucide-react";

interface HeaderProps {
    phoneNumber: string | null;
}

export function Header({ phoneNumber }: HeaderProps) {
    const displayPhoneNumber =
        formatPhoneNumberForDisplay(phoneNumber) || "Phone not set";

    return (
        <div className="flex-between relative z-20 h-[52px] w-full flex-row border-b border-white/10 bg-[#080d13]/90 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex items-center space-x-3">
                <div className="flex size-8 items-center justify-center rounded-xl border border-dp-primary/20 bg-dp-primary/10">
                    <HeadsetIcon className="h-4 text-dp-primary" />
                </div>

                <div>
                    <div className="my-auto flex text-xs font-semibold uppercase tracking-[0.24em] text-dp-headingText">
                        Emergency Dashboard
                    </div>
                    <div className="hidden items-center gap-1 text-xxs uppercase tracking-[0.2em] text-dp-text sm:flex">
                        <RadioTowerIcon className="size-3 text-dp-nonEmergency" />
                        AI triage network
                    </div>
                </div>
            </div>

            <div className="flex max-h-full flex-row items-center">
                <WeatherCondition />

                <div className="mx-3 my-auto hidden h-6 sm:block">
                    <Separator
                        orientation="vertical"
                        className="w-[1px] bg-white/10"
                    />
                </div>

                <div className="flex min-w-fit flex-row space-x-3">
                    <div className="my-auto flex h-fit min-w-fit items-center justify-center space-x-2">
                        <Time className="hidden min-w-[100px] text-right font-mono text-xs text-dp-text sm:block" />
                        <ConnectionStatus />
                    </div>

                    <div className="hidden h-8 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs sm:flex">
                        <PhoneIcon className="size-3.5 text-dp-primary" />
                        <div className="flex flex-col leading-none">
                            <span className="text-xxs font-semibold uppercase tracking-[0.18em] text-dp-text">
                                Dispatch line
                            </span>
                            <span className="mt-1 font-mono text-[11px] text-dp-headingText">
                                {displayPhoneNumber}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
