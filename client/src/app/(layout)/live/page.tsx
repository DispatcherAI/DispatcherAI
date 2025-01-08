"use client";

import React, { useEffect, useState } from "react";
import { AlertsEmergenciesPanel } from "@/components/dashboard/alerts-emergencies-panel/alerts-emergencies-panel";
import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { EmergencyDetailsPanel } from "@/components/dashboard/emergency-details-panel/emergency-details-panel";
import { Map } from "@/components/dashboard/map/map";
import { TranscriptPanel } from "@/components/dashboard/transcript-panel/transcript-panel";
import { Call, CallAnalytics } from "@prisma/client";

export type DispatchCall = Call & { callAnalytics: CallAnalytics };

const DEFAULT_CENTER = { lat: 37.867989, lng: -122.271507 };

export default function Page() {
    const { selectedId, data, handleTransfer } = useEmergencyContext();

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

    useEffect(() => {
        if (!selectedId) {
            // setCenter(DEFAULT_CENTER);
            return;
        }

        if (
            !data[selectedId].callAnalytics.latitude ||
            !data[selectedId].callAnalytics.longitude
        ) {
            return;
        }

        setCenter({
            lat: data[selectedId].callAnalytics.latitude,
            lng: data[selectedId].callAnalytics.longitude,
        });
    }, [selectedId, data]);

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
                center={_center}
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
