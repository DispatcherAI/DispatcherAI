import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";
import { HeadsetIcon } from "lucide-react";

import { Separator } from "../ui/separator";
import { ConnectionStatus } from "./connection-status";
import { Time } from "./time";

export function Header() {
    return (
        <div className="flex-between h-[52px] flex-row border-b-[1px] border-dp-outline bg-dp-background p-3">
            <div className="flex space-x-1">
                <HeadsetIcon className="h-5 text-dp-headingText" />

                <div className="my-auto flex text-xs font-semibold uppercase text-dp-headingText">
                    Emergency Dashboard
                </div>
            </div>

            <div className="flex max-h-full min-w-fit flex-row">
                <div className="flex-center">
                    <Separator
                        orientation="vertical"
                        className="mx-3 h-6 w-[1px] bg-dp-outline"
                    />
                </div>

                <div className="flex min-w-full flex-row space-x-3">
                    <div className="my-auto flex h-fit min-w-fit justify-center space-x-1">
                        <Time className="min-w-28 text-right text-xs text-dp-text" />
                        <ConnectionStatus />
                    </div>

                    <Select defaultValue="SF">
                        <SelectTrigger className="h-full p-[0.375rem] text-xs uppercase">
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
