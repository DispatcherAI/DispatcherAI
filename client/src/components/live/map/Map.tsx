"use client";

import React, { useEffect, useRef, useState } from "react";

import "leaflet/dist/leaflet.css";

import { cn } from "@/lib/utils";
//@ts-expect-error trust me bro
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import L from "leaflet";

import styles from "./map.module.css";

const Pin = L.divIcon({
    className: "dispatch-map-pin",
    html: `<span class="dispatch-map-pin__outer"><span class="dispatch-map-pin__inner"></span></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
});

interface MapPin {
    coordinates: [number, number];
    popupHtml: string;
}

interface MapProps {
    center: {
        lng: number;
        lat: number;
    };
    pins: MapPin[];
    className?: string;
}

const Map: React.FC<MapProps> = ({ center, pins, className }) => {
    const mapContainer = useRef(null);
    const map = useRef<L.Map | null>(null);

    // Offset to account for right two panels blocking some of view
    const offset = { lng: 0.0025, lat: 0.0 };

    // Where to start the map (offset + start pos)
    const adjustedCenter = {
        lng: center.lng + offset.lng,
        lat: center.lat + offset.lat,
    };

    const [zoom] = useState(17);

    useEffect(() => {
        if (map.current) {
            return;
        }

        //@ts-expect-error trust me bro
        map.current = new L.Map(mapContainer.current, {
            center: L.latLng(adjustedCenter.lat, adjustedCenter.lng),
            zoom: zoom,
            dragging: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            touchZoom: true,
            boxZoom: true,
            keyboard: true,
        });

        const mtLayer = new MaptilerLayer({
            apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
            style: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
        });

        mtLayer.addTo(map.current);
        // Intentionally only run on mount; the map instance is created once and
        // subsequent center/pin updates are handled by the effects below.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fly to a new center only when the coordinates actually change, so
    // unrelated re-renders (e.g. polling that produces a new `pins` reference)
    // don't yank the camera away from wherever the user is exploring.
    useEffect(() => {
        if (!map.current) {
            return;
        }

        map.current.flyTo(
            [adjustedCenter.lat, adjustedCenter.lng],
            map.current.getZoom(),
            {
                animate: true,
                duration: 1,
            }
        );
    }, [adjustedCenter.lat, adjustedCenter.lng]);

    useEffect(() => {
        if (!map.current) {
            return;
        }

        map.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.current!.removeLayer(layer);
            }
        });

        pins.forEach((pin) => {
            L.marker(pin.coordinates, { icon: Pin })
                .addTo(map.current!)
                .bindPopup(pin.popupHtml);
        });
    }, [pins]);

    return (
        <div className={cn(styles.mapWrap, className)}>
            <div
                ref={mapContainer}
                className={styles.map}
            />
        </div>
    );
};

export default Map;
