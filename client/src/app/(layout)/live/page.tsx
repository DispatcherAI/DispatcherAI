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

type GeocodedDispatchCall = DispatchCall & {
    callAnalytics: CallAnalytics & {
        latitude: number;
        longitude: number;
    };
};

function hasGeocodedLocation(
    call: DispatchCall | undefined
): call is GeocodedDispatchCall {
    const latitude = call?.callAnalytics.latitude;
    const longitude = call?.callAnalytics.longitude;

    return typeof latitude === "number" && typeof longitude === "number";
}

function isActiveCall(call: DispatchCall) {
    return call.inProgress === true || call.status === "Active";
}

function isFinishedCall(call: DispatchCall) {
    return call.inProgress === false || call.status === "Resolved";
}

export default function Page() {
    const { selectedId, data } = useEmergencyContext();
    const calls = Object.values(data);
    const selectedCall = selectedId ? data[selectedId] : undefined;
    const geocodedCalls = calls.filter(hasGeocodedLocation);
    const liveCalls = calls.filter((call) => !isFinishedCall(call));
    const activeGeocodedCall = geocodedCalls.find(isActiveCall);
    const focusCall = hasGeocodedLocation(selectedCall)
        ? selectedCall
        : activeGeocodedCall;
    const focusLatitude = focusCall?.callAnalytics.latitude;
    const focusLongitude = focusCall?.callAnalytics.longitude;
    const activeCritical = liveCalls.filter(({ callAnalytics: analytics }) =>
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
        if (
            typeof focusLatitude !== "number" ||
            typeof focusLongitude !== "number"
        ) {
            return;
        }

        const nextCenter = {
            lat: focusLatitude,
            lng: focusLongitude,
        };

        setCenter((currentCenter) =>
            currentCenter.lat === nextCenter.lat &&
            currentCenter.lng === nextCenter.lng
                ? currentCenter
                : nextCenter
        );
    }, [focusLatitude, focusLongitude]);

    return (
        <div className="relative flex h-full min-h-0 w-full justify-between overflow-hidden">
            <AlertsEmergenciesPanel data={calls} />

            <div className="pointer-events-none absolute left-[374px] top-4 z-20 hidden gap-3 xl:flex">
                {[
                    {
                        label: "Live calls",
                        value: liveCalls.length,
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
                            popupHtml: `<b>${analytics.name || analytics.title || "911 Call"}</b><br>Location: ${analytics.location || analytics.address || "Unknown"}`,
                        };
                    }) ?? []
                }
            />
        </div>
    );
}
