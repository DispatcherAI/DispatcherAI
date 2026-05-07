"use client";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ModulesPanel } from "@/components/modular/modules/ModulesPanel";
import { cn } from "@/lib/utils";
import { MODULES_WIDTH } from "@/root/tailwind.config";
import GridLayout from "react-grid-layout";

const Map = dynamic(() => import("@/components/modular/map/Map"), {
    loading: () => (
        <p className="h-0 w-0 font-mono text-[10px] uppercase tracking-ribbon text-white/45">
            Rendering map…
        </p>
    ),
    ssr: false,
});

export default function Page() {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, maxW: 1, maxH: 4 },
        { i: "b", x: 0, y: 2, w: 1, h: 2, maxW: 1, maxH: 4 },
        { i: "c", x: 0, y: 4, w: 1, h: 2, maxW: 1, maxH: 4 },
    ];

    const [, setDragging] = useState(false);
    const [innerHeight, setInnerHeight] = useState<number>();

    function handleDragStart() {
        setDragging(true);
    }

    function handleDragStop() {
        setDragging(false);
    }

    useEffect(() => {
        setInnerHeight(window.innerHeight);
    }, []);

    return (
        <div className="h-fullWithHeader relative w-full">
            <Map
                center={{ lat: 37.867989, lng: -122.271507 }}
                pins={[]}
            />

            <div className="pointer-events-none absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-[3px] border border-white/10 bg-ink/85 px-3 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-sodium shadow-[0_0_10px_rgba(244,176,31,0.6)]" />
                <span className="font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                    Experiments · modular layout
                </span>
            </div>

            <div className="ml-auto flex h-full w-modules flex-col items-stretch justify-between border-l border-white/8 bg-ink-deep/90 backdrop-blur-xl">
                <GridLayout
                    className={cn(
                        "layout",
                        "h-full w-modules border-y border-white/8",
                    )}
                    layout={layout}
                    cols={1}
                    rowHeight={innerHeight ? innerHeight / 8 : undefined}
                    width={MODULES_WIDTH}
                    compactType="vertical"
                    margin={[0, 0]}
                    isBounded
                    onDragStart={handleDragStart}
                    onDragStop={handleDragStop}
                    resizeHandles={["sw"]}
                >
                    {layout.map((item) => (
                        <div
                            key={item.i}
                            className="border border-white/8 bg-ink-panel p-3"
                        >
                            <p className="font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                                Module · {item.i.toUpperCase()}
                            </p>
                            <p className="mt-2 text-xs leading-5 text-white/55">
                                Drag the bottom-left handle to resize. This is
                                the experimental panel for prototyping new
                                console widgets.
                            </p>
                        </div>
                    ))}
                </GridLayout>

                <ModulesPanel />
            </div>
        </div>
    );
}
