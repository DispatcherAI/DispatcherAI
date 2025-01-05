import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";
import { Separator } from "@/components/dispatch/separator";
import { ConnectionStatus } from "@/components/header/connection-status";
import { Time } from "@/components/header/time";
import { WeatherCondition } from "@/components/header/weather-condition";
import { HeadsetIcon } from "lucide-react";

export function Header() {
    return (
        <div className="flex-between h-[52px] w-full flex-row border-b-[1px] border-dp-outline bg-dp-background p-3">
            <div className="flex space-x-1">
                <HeadsetIcon className="h-5 text-dp-headingText" />

                <div className="my-auto flex text-xs font-semibold uppercase text-dp-headingText">
                    Emergency Dashboard
                </div>
            </div>

            <div className="flex max-h-full flex-row">
                <WeatherCondition />

                <div className="mx-3 my-auto h-6">
                    <Separator
                        orientation="vertical"
                        className="w-[1px] bg-dp-outline"
                    />
                </div>

                <div className="flex min-w-full flex-row space-x-3">
                    <div className="my-auto flex h-fit min-w-fit justify-center space-x-1">
                        <Time className="min-w-[100px] text-right text-xs text-dp-text" />
                        <ConnectionStatus />
                    </div>

                    <Select defaultValue="SF">
                        <SelectTrigger className="h-full w-40 p-2 text-left text-xs uppercase">
                            <SelectValue placeholder="LOCATION" />
                        </SelectTrigger>
                        <SelectContent className="uppercase">
                            <SelectItem
                                value="SF"
                                className="text-xs"
                            >
                                San Francisco, CA
                            </SelectItem>
                            <SelectItem
                                value="BER"
                                className="text-xs"
                                disabled
                            >
                                Berkeley, CA
                            </SelectItem>
                            <SelectItem
                                value="OAK"
                                disabled
                                className="text-xs"
                            >
                                Oakland, CA
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
