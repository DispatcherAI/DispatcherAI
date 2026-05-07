// placeholder until weather APIs are hooked up

import {
    CloudFogIcon,
    CloudRainIcon,
    EyeIcon,
    LucideIcon,
    SunIcon,
    WindIcon,
} from "lucide-react";

type Condition = {
    icon: LucideIcon;
    label: string;
};

const CONDITIONS: Condition[] = [
    {
        icon: SunIcon,
        label: "75°",
    },
    {
        icon: WindIcon,
        label: "3mph",
    },
    {
        icon: CloudRainIcon,
        label: '0.1" in 2hrs',
    },
    {
        icon: CloudFogIcon,
        label: "2 humid°",
    },
    {
        icon: EyeIcon,
        label: "12mi visible",
    },
];

export function WeatherCondition() {
    return (
        <div className="text-fill-dp-text my-auto hidden min-w-fit space-x-2 text-dp-text lg:flex">
            {CONDITIONS.map(
                (
                    item,
                    index // FIX ME
                ) => (
                    <div
                        className="flex items-center space-x-1 rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 text-xs"
                        key={index}
                    >
                        <item.icon className="my-auto h-3.5 w-3.5 text-dp-primary" />
                        <p>{item.label}</p>
                    </div>
                )
            )}
        </div>
    );
}
