"use client";

import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import DetailsPanel from "@/components/live/DetailsPanel";
import EventPanel from "@/components/live/EventPanel";
import TranscriptPanel from "@/components/live/TranscriptPanel";

import { MESSAGES } from "./messages";

// const Map = dynamic(() => import("@/components/live/map/Map"), {
//     loading: () => <p>Rendering Map...</p>,
//     ssr: false,
// });

interface ServerMessage {
    event: "db_response";
    data: Record<string, Call>;
}

export type Call = {
    emotions?: {
        emotion: string;
        intensity: number;
    }[];
    id: string;
    location_name: string;
    location_coords?: {
        lat: number;
        lng: number;
    };
    street_view?: string; // base 64
    name: string;
    phone: string;
    recommendation: string;
    severity?: "CRITICAL" | "MODERATE" | "RESOLVED";
    summary: string;
    time: string; // ISO Date String
    title?: string;
    transcript: {
        role: "assistant" | "user" | "agent";
        content: string;
    }[];
    type: string;
};

export interface CallProps {
    call?: Call;
    selectedId: string | undefined;
}

const wss = new WebSocket(
    "wss://planned-halimeda-wecracked2-c8137aa7.koyeb.app/ws?client_id=1234"
);

const emptyCall: Call = {
    emotions: [],
    id: "",
    location_name: "",
    location_coords: {
        lat: 0,
        lng: 0,
    },
    street_view: "", // base 64
    name: "",
    phone: "",
    recommendation: "",
    severity: "RESOLVED",
    summary: "",
    time: "",
    title: "",
    transcript: [],
    type: "",
};

const Page = () => {
    const [_connected, setConnected] = useState(false);
    const [data, setData] = useState<Record<string, Call>>(MESSAGES);
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [resolvedIds, setResolvedIds] = useState<string[]>([]);

    const [_center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: 37.867989,
        lng: -122.271507,
    });

    const handleSelect = (id: string) => {
        setSelectedId(id === selectedId ? undefined : id);
    };

    const handleResolve = (id: string) => {
        setResolvedIds((prev) => {
            const newResolvedIds = [...prev, id];

            const newData = { ...data };
            Object.keys(newData).forEach((key) => {
                if (newResolvedIds.includes(newData[key].id)) {
                    newData[key].severity = "RESOLVED";
                }
            });

            setData(newData);
            return newResolvedIds;
        });
    };

    const handleTransfer = (id: string) => {
        console.log("transfer: ", id);

        wss.send(
            JSON.stringify({
                event: "transfer",
                id: id,
            })
        );
    };

    useEffect(() => {
        if (!selectedId) return;

        if (!data[selectedId]?.location_coords) return;

        setCenter(
            data[selectedId].location_coords as { lat: number; lng: number } // TS being lame, so type-cast
        );
    }, [selectedId, data]);

    useEffect(() => {
        wss.onopen = () => {
            console.log("WebSocket connection established");
            setConnected(true);

            wss.send(
                JSON.stringify({
                    event: "get_db",
                })
            );

            wss.onmessage = (event: MessageEvent) => {
                console.log("Received message");
                const message = JSON.parse(event.data) as ServerMessage;
                console.log("message:", message);
                const data = message.data;
                console.log("data:", data);

                if (data) {
                    console.log("Got data");

                    Object.keys(data).forEach((key) => {
                        if (resolvedIds?.includes(data[key].id)) {
                            data[key].severity = "RESOLVED";
                        }
                    });

                    setData(data);
                } else {
                    console.warn("Received unknown message");
                }
            };

            wss.onclose = () => {
                console.log("Closing websocket");
                setConnected(false);
            };
        };
    }, []);

    return (
        <div className="relative flex h-full justify-between">
            <EventPanel
                data={data}
                selectedId={selectedId || undefined}
                handleSelect={handleSelect}
            />

            {selectedId && data ? (
                <div className="absolute right-0 z-50 flex">
                    <DetailsPanel
                        call={selectedId ? data[selectedId] : emptyCall}
                        handleResolve={handleResolve}
                    />
                    <TranscriptPanel
                        call={selectedId ? data[selectedId] : emptyCall}
                        selectedId={selectedId || undefined}
                        handleTransfer={handleTransfer}
                    />
                </div>
            ) : null}

            <div className="absolute h-full max-h-full w-full max-w-full bg-dp-nonEmergency/10" />

            {/* <Map
                    center={center}
                    pins={Object.entries(data)
                        .filter(
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            ([_, call]) =>
                                call.location_coords && call.location_name
                        )
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        .map(([_, call]) => {
                            return {
                                coordinates: [
                                    call.location_coords?.lat as number, // type-cast cuz TS trolling
                                    call.location_coords?.lng as number, // type-cast cuz TS trolling
                                ],
                                popupHtml: `<b>${call.title}</b><br>Location: ${call.location_name}`,
                            };
                        })}
                /> */}
        </div>
    );
};

export default Page;
