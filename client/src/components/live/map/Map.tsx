"use client";

import React, { useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";

import { cn } from "@/lib/utils";
//@ts-expect-error trust me bro
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import L from "leaflet";

import styles from "./map.module.css";

const Pin = L.divIcon({
    className: "dispatch-map-pin",
    html: `<span class="dispatch-map-pin__pulse"></span><span class="dispatch-map-pin__outer"><span class="dispatch-map-pin__inner"></span></span>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
});

const INCIDENT_ZOOM = 17;

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
    /** Disable scroll-wheel zoom so the page scrolls naturally over an embedded map. */
    scrollWheelZoom?: boolean;
    /** Initial zoom level (defaults to incident close-up). */
    zoom?: number;
    /** Horizontal offset applied to center, in degrees. Defaults to the live cockpit value. */
    centerOffsetLng?: number;
}

const Map: React.FC<MapProps> = ({
    center,
    pins,
    className,
    scrollWheelZoom = true,
    zoom = INCIDENT_ZOOM,
    centerOffsetLng = 0.0025,
}) => {
    const mapContainer = useRef(null);
    const map = useRef<L.Map | null>(null);

    const adjustedCenter = {
        lng: center.lng + centerOffsetLng,
        lat: center.lat,
    };

    useEffect(() => {
        if (map.current) {
            return;
        }

        //@ts-expect-error trust me bro
        map.current = new L.Map(mapContainer.current, {
            center: L.latLng(adjustedCenter.lat, adjustedCenter.lng),
            zoom,
            dragging: true,
            scrollWheelZoom,
            doubleClickZoom: true,
            touchZoom: true,
            boxZoom: true,
            keyboard: true,
        });

        const mtLayer = new MaptilerLayer({
            apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
            style: `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
        });

        mtLayer.addTo(map.current);
        // Intentionally only run on mount; the map instance is created once and
        // subsequent center/pin updates are handled by the effects below.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fly to a focused incident only when the coordinates actually change, so
    // unrelated re-renders (e.g. polling that produces a new `pins` reference)
    // don't yank the camera away from wherever the user is exploring.
    useEffect(() => {
        if (!map.current) {
            return;
        }

        map.current.flyTo(
            [adjustedCenter.lat, adjustedCenter.lng],
            zoom,
            {
                animate: true,
                duration: 1,
            }
        );
    }, [adjustedCenter.lat, adjustedCenter.lng, zoom]);

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
