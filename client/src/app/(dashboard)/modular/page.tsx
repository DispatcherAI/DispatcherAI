"use client";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import GridLayout from "react-grid-layout";

const Map = dynamic(() => import("@/components/modular/map/Map"), {
    loading: () => <p className="h-0 w-0">Rendering Map...</p>,
    ssr: false,
});

export default function Page() {
    const layout = [
        // { i: "tl", x: 0, y: 0, w: 1, h: 4, static: true },
        // { i: "bl", x: 0, y: 17.5, w: 1, h: 4, static: true },
        {
            i: "mid",
            x: 2,
            y: 1,
            w: 8,
            h: 3,
            static: true,
            hidden: true,
            showOnDrag: true,
            className:
                "stripes stripes-gray-500 stripes-opacity-30 border-gray-500 z-10 border-opacity-30",
        },
        { i: "b", x: 1, y: 0, w: 3, h: 1, minW: 2, maxW: 4 },
        { i: "c", x: 4, y: 0, w: 1, h: 1 },
        { i: "d", x: 5, y: 0, w: 1, h: 1 },
        { i: "e", x: 5, y: 0, w: 1, h: 1 },
    ];

    const [dragging, setDragging] = useState(false);

    function handleDragStart() {
        setDragging(true);
    }

    function handleDragStop() {
        setDragging(false);
    }

    function showItem(hidden?: boolean, showOnDrag?: boolean) {
        if (!hidden) return true;
        if (hidden && !showOnDrag) return false;
        if (hidden && showOnDrag && dragging) return true;

        return false;
    }

    return (
        <div className="max-h-[100dvh] min-h-[100dvh] min-w-[100dvw] max-w-[100dvw]">
            <Map center={{ lat: 37.867989, lng: -122.271507 }} pins={[]} />

            <GridLayout
                className={cn(
                    "layout",
                    "max-h-[100dvh] min-h-[100dvh] min-w-[100dvw] max-w-[100dvw] border-2 border-green-500",
                )}
                style={{ maxHeight: "100dvh" }}
                layout={layout}
                cols={12}
                rowHeight={window.innerHeight / 10}
                width={window.innerWidth}
                compactType={null}
                preventCollision={true}
                margin={[0, 0]}
                isBounded={true}
                onDragStart={handleDragStart}
                onDragStop={handleDragStop}
            >
                {layout.map((item) => (
                    <div
                        key={item.i}
                        className={cn(
                            showItem(item.hidden, item.showOnDrag)
                                ? ""
                                : "hidden",
                            "border-2 border-blue-500",
                            item.className,
                        )}
                    >
                        {item.i}
                    </div>
                ))}
            </GridLayout>

            {/* <Map center={{ lat: 37.867989, lng: -122.271507 }} pins={[]} /> */}
        </div>
    );
}
