"use client";

import { Buttons } from "./components/buttons";
import { Toasts } from "./components/toasts";

export default function page() {
    return (
        <div className="flex h-[100dvh] w-[100dvw] flex-col space-y-2 bg-[#111111] p-4">
            <Toasts />

            <Buttons />
        </div>
    );
}
