"use client";

import React, { useEffect, useRef, useState } from "react";
import { AlertsEmergenciesPanel } from "@/components/dashboard/alerts-emergencies-panel/alerts-emergencies-panel";
import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { EmergencyDetailsPanel } from "@/components/dashboard/emergency-details-panel/emergency-details-panel";
import { Map } from "@/components/dashboard/map/map";
import { TranscriptPanel } from "@/components/dashboard/transcript-panel/transcript-panel";
import { useAuth } from "@clerk/nextjs";
import { Call, CallAnalytics, User } from "@prisma/client";

export type DispatchCall = Call & { callAnalytics: CallAnalytics };

// import TranscriptPanel from "@/components/live/TranscriptPanel";

// import { MESSAGES } from "./messages";

// interface ServerMessage {
//     event: "db_response";
//     data: Record<string, Call>;
// }

// export type Emotion = {
//     emotion: string;
//     intensity: number;
// };

// export type Call = {
//     emotions?: Emotion[];
//     id: string;
//     location_name: string;
//     location_coords?: {
//         lat: number;
//         lng: number;
//     };
//     street_view?: string; // base 64
//     name: string;
//     phone: string;
//     recommendation: string;
//     severity?: "CRITICAL" | "MODERATE" | "RESOLVED";
//     summary: string;
//     time: string; // ISO Date String
//     title?: string;
//     transcript: {
//         role: "assistant" | "user" | "agent";
//         content: string;
//     }[];
//     type: string;
// };

// export interface CallProps {
//     call?: Call;
//     selectedId: string | undefined;
// }

// const wss = new WebSocket(
//     // "wss://planned-halimeda-wecracked2-c8137aa7.koyebZ.app/ws?client_id=1234"
//     "wss://fitting-correctly-lioness.ngrok-free.app/ws?client_id=cm4zfisqo00086736j4qqfd0j"
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

const DEFAULT_CENTER = { lat: 37.867989, lng: -122.271507 };

export default function Page() {
    const { userId } = useAuth();

    const websocket = useRef<WebSocket>();

    const [_connected, setConnected] = useState(false);
    const [data, setData] = useState<Record<string, DispatchCall>>({});
    const [user, setUser] = useState<User>();

    // const [resolvedIds, setResolvedIds] = useState<string[]>([]);

    const { selectedId } = useEmergencyContext();

    const [_center, setCenter] = useState<{ lat: number; lng: number }>(
        DEFAULT_CENTER
    );

    // const handleResolve = (id: string) => {
    //     setResolvedIds((prev) => {
    //         const newResolvedIds = [...prev, id];

    //         const newData = { ...data };
    //         Object.keys(newData).forEach((key) => {
    //             if (newResolvedIds.includes(newData[key].id)) {
    //                 newData[key].severity = "RESOLVED";
    //             }
    //         });

    //         setData(newData);
    //         return newResolvedIds;
    //     });
    // };

    const handleTransfer = (id?: string) => {
        console.log("transfer: ", id);

        websocket.current?.send(
            JSON.stringify({
                event: "transfer",
                id: id ?? selectedId,
            })
        );
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/user?clerkUserId=${userId}`);
            const data = await response.json();

            if (response.ok) {
                setUser(data);
            }
        } catch (e: unknown) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (!selectedId) {
            setCenter(DEFAULT_CENTER);
            return;
        }

        if (
            !data[selectedId].callAnalytics.latitude ||
            !data[selectedId].callAnalytics.longitude
        )
            return;

        setCenter({
            lat: data[selectedId].callAnalytics.latitude,
            lng: data[selectedId].callAnalytics.longitude,
        });
    }, [selectedId, data]);

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        websocket.current = new WebSocket(
            `wss://fitting-correctly-lioness.ngrok-free.app/ws?client_id=${user?.id}`
        );

        const wss = websocket.current;

        wss.onopen = () => {
            console.log("WebSocket connection established");
            setConnected(true);

            wss.send(
                JSON.stringify({
                    event: "get_db",
                })
            );

            // TODO: check the types
            wss.onmessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                const data = message.data;
                console.log("Call Data:", data);

                if (data) {
                    // Object.keys(data).forEach((key) => {
                    //     if (resolvedIds?.includes(data[key].id)) {
                    //         data[key].severity = "RESOLVED";
                    //     }
                    // });

                    const idKeyData: Record<string, DispatchCall> = {};

                    for (const call of data) {
                        idKeyData[call.id] = call;
                    }

                    setData(idKeyData);
                } else {
                    console.warn("Received unknown message");
                }
            };

            wss.onclose = () => {
                console.log("Closing websocket");
                setConnected(false);
            };
        };

        return () => {
            wss.close();
        };
    }, [user]);

    return (
        <div className="relative flex h-full w-full justify-between">
            <AlertsEmergenciesPanel data={Object.values(data)} />

            {selectedId && data && data[selectedId] ? (
                <div className="absolute right-0 z-50 flex h-full">
                    <EmergencyDetailsPanel call={data[selectedId]} />

                    <TranscriptPanel
                        call={data[selectedId]}
                        handleTransfer={handleTransfer}
                    />
                </div>
            ) : null}

            <Map
                center={{ lat: 37.867989, lng: -122.271507 }}
                pins={
                    Object.values(data)
                        ?.filter(
                            ({ callAnalytics: analytics }) =>
                                analytics?.latitude &&
                                analytics?.longitude &&
                                analytics?.location
                        )
                        .map(({ callAnalytics: analytics }) => {
                            return {
                                coordinates: [
                                    analytics.latitude as number, // type-cast cuz TS trolling
                                    analytics.longitude as number, // type-cast cuz TS trolling
                                ],
                                popupHtml: `<b>${analytics?.name}</b><br>Location: ${analytics?.location}`,
                            };
                        }) ?? []
                }
            />
        </div>
    );
}
