import { Separator } from "@/components/dispatch/separator";
import { ConnectionStatus } from "@/components/header/connection-status";
import { Time } from "@/components/header/time";
import { WeatherCondition } from "@/components/header/weather-condition";
import { formatPhoneNumberForDisplay } from "@/lib/phone";
import { HeadsetIcon, PhoneCallIcon, RadioTowerIcon } from "lucide-react";

interface HeaderProps {
    dispatcherPhoneNumber: string | null;
}

export function Header({ dispatcherPhoneNumber }: HeaderProps) {
    const displayDispatcherPhoneNumber =
        formatPhoneNumberForDisplay(dispatcherPhoneNumber) ||
        "Dispatcher line not set";

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

                    <div className="hidden h-9 items-center gap-2.5 rounded-2xl border border-dp-primary/25 bg-[linear-gradient(135deg,rgba(105,210,255,0.16),rgba(255,255,255,0.04))] px-3.5 text-xs shadow-[0_0_24px_rgba(105,210,255,0.12)] sm:flex">
                        <span className="relative flex size-6 items-center justify-center rounded-full bg-dp-primary/15">
                            <span className="absolute size-2 rounded-full bg-dp-nonEmergency shadow-[0_0_14px_rgba(71,255,133,0.9)]" />
                            <PhoneCallIcon className="relative size-3.5 text-dp-primary" />
                        </span>
                        <div className="flex flex-col leading-none">
                            <span className="text-xxs font-semibold uppercase tracking-[0.18em] text-dp-text">
                                Dispatcher phone number
                            </span>
                            <span className="mt-1 font-mono text-[11px] text-dp-headingText">
                                {displayDispatcherPhoneNumber}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
