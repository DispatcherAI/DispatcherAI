import { HeadsetIcon } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
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

            <div className="flex flex-row space-x-2">
                <Time className="my-auto" />

                <div className="uppercase">
                    <Select
                        defaultValue="SF"
                        disabled
                    >
                        <SelectTrigger className="h-[30px] min-h-0 w-[200px] rounded-md border-[1px] border-[#D7D7D7] py-0 uppercase text-[#6C6C6C]">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent className="uppercase">
                            <SelectItem
                                value="SF"
                                className="uppercase"
                            >
                                San Francisco, CA
                            </SelectItem>
                            <SelectItem
                                value="BER"
                                disabled
                            >
                                Berkeley, CA
                            </SelectItem>
                            <SelectItem
                                value="OAK"
                                disabled
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
