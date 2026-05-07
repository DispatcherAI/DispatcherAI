import { ConnectionStatus } from "@/components/header/connection-status";
import { Time } from "@/components/header/time";
import { WeatherCondition } from "@/components/header/weather-condition";
import { formatPhoneNumberForDisplay } from "@/lib/phone";
import { PhoneCallIcon, RadioTowerIcon } from "lucide-react";

interface HeaderProps {
    dispatcherPhoneNumber: string | null;
}

export function Header({ dispatcherPhoneNumber }: HeaderProps) {
    const displayDispatcherPhoneNumber =
        formatPhoneNumberForDisplay(dispatcherPhoneNumber) ||
        "Dispatcher line not set";

    return (
        <header className="relative z-20 flex h-header w-full items-stretch border-b border-white/8 bg-ink-deep/95">
            <div className="flex items-center gap-3 border-r border-white/8 px-4">
                <RadioTowerIcon className="size-4 text-white/55" />
                <span className="text-sm font-medium text-white">
                    Live Dispatch
                </span>
                <span className="hidden items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-2 py-0.5 text-xs text-white/65 md:inline-flex">
                    <span className="size-1.5 rounded-full bg-white/55" />
                    Demo build
                </span>
            </div>

            <div className="flex flex-1 items-center px-4">
                <WeatherCondition />
            </div>

            <div className="flex items-stretch divide-x divide-white/8 border-l border-white/8">
                <div className="flex items-center gap-3 px-4">
                    <Time className="hidden min-w-[96px] text-right font-mono text-xs tabular-nums text-white/70 sm:block" />
                    <ConnectionStatus />
                </div>

                <div className="hidden items-center gap-2.5 px-4 sm:flex">
                    <PhoneCallIcon className="size-3.5 text-white/55" />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-white/50">
                            Dispatcher
                        </span>
                        <span className="mt-1 font-mono text-xs tabular-nums text-white">
                            {displayDispatcherPhoneNumber}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
