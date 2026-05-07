"use client";

import { Buttons } from "./components/buttons";
import { Checkboxes } from "./components/checkboxes";
import { Labels } from "./components/labels";
import { Selects } from "./components/selects";
import { Tabs } from "./components/tabs";
import { Toasts } from "./components/toasts";

export default function Page() {
    return (
        <div className="min-h-[100dvh] w-full bg-ink p-6 text-white">
            <header className="mx-auto mb-6 max-w-5xl">
                <p className="font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                    /playground
                </p>
                <h1 className="mt-2 font-display text-3xl text-white">
                    Component sandbox
                </h1>
                <p className="mt-1 text-sm text-white/55">
                    Internal QA surface for the dispatch component library.
                </p>
            </header>
            <div className="mx-auto flex max-w-5xl flex-col gap-3">
                <Checkboxes />
                <Labels />
                <Tabs />
                <Selects />
                <Toasts />
                <Buttons />
            </div>
        </div>
    );
}
