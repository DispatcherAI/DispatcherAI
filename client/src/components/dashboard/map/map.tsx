import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/live/map/Map"), {
    loading: () => <p>Rendering Map...</p>,
    ssr: false,
});

export { Map };
