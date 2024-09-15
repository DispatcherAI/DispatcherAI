"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DetailsPanel from "@/components/live/DetailsPanel";
import EventPanel from "@/components/live/EventPanel";
import Header from "@/components/live/Header";
import TranscriptPanel from "@/components/live/TranscriptPanel";

// import { MESSAGES } from "./messages";

const Map = dynamic(() => import("@/components/live/map/Map"), {
    loading: () => <p>Rendering Map...</p>,
    ssr: false,
});

// create interfaces to type data from server
interface ServerMessage {
    type: "initial_data" | "emergency_data";
    data: Record<string, Call>;
}

// interface Call {
//     id: string;
//     title: string;
//     time: string;
//     severity: "CRITICAL" | "MODERATE" | "RESOLVED";
//     location_coords?: {
//         lat: number;
//         lng: number;
//     };
// }

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
    location: string;
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

// const wss = new WebSocket(
//     "wss://planned-halimeda-wecracked2-c8137aa7.koyeb.app/ws?client_id=1234",
// );

// const emptyCall: Call = {
//     emotions: [],
//     id: "",
//     location_name: "",
//     location_coords: {
//         lat: 0,
//         lng: 0,
//     },
//     street_view: "", // base 64
//     name: "",
//     phone: "",
//     recommendation: "",
//     severity: "RESOLVED",
//     summary: "",
//     time: "",
//     title: "",
//     transcript: [],
//     type: "",
// };

const Page = () => {
    const [connected, setConnected] = useState(false);
    const [data, setData] = useState<Record<string, Call>>({}); // initialize data as an empty object
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [resolvedIds, setResolvedIds] = useState<string[]>([]);
    const ws = new WebSocket('ws://localhost:8000/ws');
    // initialize data from redis transferred from websocket
    
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
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

        ws.send(
            JSON.stringify({
                event: "transfer",
                id: id,
            }),
        );
    };

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws');
        
        ws.onmessage = (event: MessageEvent) => {
            console.log("Received message:", event.data);
            try {
                const message = JSON.parse(event.data) as ServerMessage;
                console.log("Parsed message:", message);
                if (message.type === 'initial_data' || message.type === 'emergency_data') {
                    const formattedData: Record<string, Call> = {};
                    Object.entries(message.data).forEach(([key, value]) => {
                        formattedData[key] = {
                            id: value.id || key,
                            title: value.title || `${value.type || 'Unknown Severity'} on ${value.location || 'Unknown Location'}`,
                            time: value.time || new Date().toISOString(),
                            severity: value.severity || 'MODERATE',
                            location_name: value.location_name || 'Unknown Location',
                            name: value.name || 'Loading Name',
                            phone: value.phone || 'Loading Phone',
                            recommendation: value.recommendation || 'Unknown Recommendation',
                            summary: value.summary || 'Unknown Summary',
                            transcript: value.transcript || [],
                            type: value.type || 'Unknown Type',
                        };
                    });
                    setData(formattedData);
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error, "Raw message:", event.data);
            }
        };
        
        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        if (!selectedId) return;
        if (!data[selectedId]?.location_coords) return;
        setCenter(data[selectedId].location_coords);
    }, [selectedId, data]);

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Connected');
        };

        ws.onmessage = (event: MessageEvent) => {
            try {
                const message = JSON.parse(event.data);
                console.log("Received message:", message);
                if (message.type === 'initial_data') {
                    setData(message.data);
                }
                // Handle other message types here
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

            ws.onclose = () => {
                console.log("Closing websocket");
                setConnected(false);
            };
        
    }, []);

    return (
        <div className="h-full max-h-[calc(100dvh-50px)]">
            <Header connected={true} />
            <div className="relative flex h-full justify-between">
                <EventPanel
                    data={data}
                    selectedId={selectedId}
                    handleSelect={handleSelect}
                />
                {selectedId && data[selectedId] && (
                    <div className="absolute right-0 z-50 flex">
                        <DetailsPanel
                            call={data[selectedId]}
                            handleResolve={handleResolve}
                        />
                        <TranscriptPanel
                            call={data[selectedId]}
                            selectedId={selectedId}
                            handleTransfer={handleTransfer}
                        />
                    </div>
                )}
                <Map
                    center={center}
                    pins={Object.values(data)
                        .filter((call) => call.location_coords && call.location_name)
                        .map((call) => ({
                            coordinates: [
                                call.location_coords!.lat,
                                call.location_coords!.lng,
                            ],
                            popupHtml: `<b>${call.title}</b><br>Location: ${call.location_name}`,
                        }))}
                />
            </div>
        </div>
    );
};

export default Page;
