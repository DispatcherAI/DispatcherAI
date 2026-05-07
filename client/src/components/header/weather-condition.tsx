// Placeholder until weather APIs are hooked up.

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
    { icon: SunIcon, label: "75°F" },
    { icon: WindIcon, label: "3 mph" },
    { icon: CloudRainIcon, label: '0.1"' },
    { icon: CloudFogIcon, label: "Hum 42%" },
    { icon: EyeIcon, label: "12 mi" },
];

export function WeatherCondition() {
    return (
        <div className="hidden items-center gap-3 lg:flex">
            <span className="text-xs text-white/45">San Francisco</span>
            <div className="flex items-center gap-3 text-xs text-white/60">
                {CONDITIONS.map((item, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1.5"
                    >
                        <item.icon className="size-3 text-white/45" />
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
