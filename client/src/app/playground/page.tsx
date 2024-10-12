"use client";

import { Buttons } from "./components/buttons";
import { Labels } from "./components/labels";
import { Selects } from "./components/selects";
import { Tabs } from "./components/tabs";
import { Toasts } from "./components/toasts";

export default function page() {
    return (
        <div className="flex h-[100dvh] w-[100dvw] flex-col space-y-2 bg-[#111111] p-4">
            <Labels />
            <Tabs />
            <Selects />
            <Toasts />
            <Buttons />
        </div>
    );
}
