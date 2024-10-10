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
    loading: () => <p className="h-0 w-0">Rendering Map...</p>,
    ssr: false,
});

export default function Page() {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, maxW: 1, maxH: 4 },
        { i: "b", x: 0, y: 2, w: 1, h: 2, maxW: 1, maxH: 4 },
        { i: "c", x: 0, y: 4, w: 1, h: 2, maxW: 1, maxH: 4 },
    ];

    const [dragging, setDragging] = useState(false);
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
        <div className={`h-fullWithHeader w-full`}>
            <Map
                center={{ lat: 37.867989, lng: -122.271507 }}
                pins={[]}
            />

            <div className="flex-between ml-auto h-full w-modules flex-col">
                <GridLayout
                    className={cn(
                        "layout",
                        `h-full w-modules border-2 border-green-500`
                    )}
                    layout={layout}
                    cols={1}
                    rowHeight={innerHeight ? innerHeight / 8 : undefined}
                    width={MODULES_WIDTH}
                    compactType={"vertical"}
                    // preventCollision={true}
                    margin={[0, 0]}
                    isBounded={true}
                    onDragStart={handleDragStart}
                    onDragStop={handleDragStop}
                    resizeHandles={["sw"]}
                >
                    {layout.map((item) => (
                        <div
                            key={item.i}
                            className={cn("border-2 border-blue-500")}
                        >
                            {item.i}
                        </div>
                    ))}
                </GridLayout>

                <ModulesPanel />
            </div>
        </div>
    );
}
