"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";

import { Buttons } from "./components/buttons";
import { Toasts } from "./components/toasts";

export default function page() {
    return (
        <div className="flex h-[100dvh] w-[100dvw] flex-col space-y-2 bg-[#111111] p-4">
            <div className="uppercase">
                <Select defaultValue="SF">
                    <SelectTrigger>
                        <SelectValue placeholder="LOCATION" />
                    </SelectTrigger>
                    <SelectContent>
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

            <Toasts />

            <Buttons />
        </div>
    );
}
