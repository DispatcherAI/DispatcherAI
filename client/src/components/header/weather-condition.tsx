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
        <div className="text-fill-dp-text my-auto flex min-w-fit space-x-3 text-dp-text">
            {CONDITIONS.map(
                (
                    item,
                    index // FIX ME
                ) => (
                    <div
                        className="flex space-x-1 text-sm"
                        key={index}
                    >
                        <item.icon className="my-auto h-5 w-5" />
                        <p>{item.label}</p>
                    </div>
                )
            )}
        </div>
    );
}
