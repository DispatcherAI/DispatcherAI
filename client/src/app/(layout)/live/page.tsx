"use client";

import React, { useEffect, useState } from "react";
import { AlertsEmergenciesPanel } from "@/components/dashboard/alerts-emergencies-panel/alerts-emergencies-panel";
import { useEmergencyContext } from "@/components/dashboard/emergency-context";
import { EmergencyDetailsPanel } from "@/components/dashboard/emergency-details-panel/emergency-details-panel";
import { Map } from "@/components/dashboard/map/map";
import { TranscriptPanel } from "@/components/dashboard/transcript-panel/transcript-panel";
import { Call, CallAnalytics } from "@prisma/client";
import { ActivityIcon, Clock3Icon, MapPinIcon } from "lucide-react";

export type DispatchCall = Call & { callAnalytics: CallAnalytics };

const DEFAULT_CENTER = { lat: 37.867989, lng: -122.271507 };

export default function Page() {
    const { selectedId, data } = useEmergencyContext();
    const calls = Object.values(data);
    const geocodedCalls = calls.filter(
        ({ callAnalytics: analytics }) =>
            analytics?.latitude && analytics?.longitude && analytics?.location
    );
    const activeCritical = calls.filter(({ callAnalytics: analytics }) =>
        ["Critical", "High", "critical"].includes(analytics?.severity ?? "")
    ).length;

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
        <div className="relative flex h-full min-h-0 w-full justify-between overflow-hidden">
            <AlertsEmergenciesPanel data={calls} />

            <div className="pointer-events-none absolute left-[374px] top-4 z-20 hidden gap-3 xl:flex">
                {[
                    {
                        label: "Open calls",
                        value: calls.length,
                        icon: ActivityIcon,
                    },
                    {
                        label: "Priority",
                        value: activeCritical,
                        icon: Clock3Icon,
                    },
                    {
                        label: "Mapped",
                        value: geocodedCalls.length,
                        icon: MapPinIcon,
                    },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-[#080d13]/80 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="size-4 text-dp-primary" />
                            <div>
                                <p className="font-mono text-lg leading-none text-dp-headingText">
                                    {item.value}
                                </p>
                                <p className="mt-1 text-xxs uppercase tracking-[0.2em] text-dp-text">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedId && data && data[selectedId] ? (
                <div className="absolute right-0 z-50 flex h-full shadow-[-24px_0_60px_rgba(0,0,0,0.35)]">
                    <EmergencyDetailsPanel call={data[selectedId]} />

                    <TranscriptPanel call={data[selectedId]} />
                </div>
            ) : null}

            <Map
                center={_center}
                pins={
                    geocodedCalls.map(({ callAnalytics: analytics }) => {
                        return {
                            coordinates: [
                                analytics.latitude as number,
                                analytics.longitude as number,
                            ],
                            popupHtml: `<b>${analytics?.name}</b><br>Location: ${analytics?.location}`,
                        };
                    }) ?? []
                }
            />
        </div>
    );
}
