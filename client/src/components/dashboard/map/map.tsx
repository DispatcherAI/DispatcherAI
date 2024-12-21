import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/live/map/Map"), {
    loading: () => <div className="h-full w-full bg-[#292929]" />,
    ssr: false,
});

export { Map };
