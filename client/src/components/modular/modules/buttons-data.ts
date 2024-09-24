import {
    HeadsetIcon,
    RadioIcon,
    SettingsIcon,
    TruckIcon,
    ZapIcon,
    type LucideIcon,
} from "lucide-react";

type ModuleButton = {
    icon: LucideIcon;
    label: string;
};

export const MODULE_BUTTONS: ModuleButton[] = [
    { icon: TruckIcon, label: "Units" },
    { icon: RadioIcon, label: "Comms" },
    { icon: ZapIcon, label: "Actions" },
    { icon: HeadsetIcon, label: "Dispatch" },
    { icon: SettingsIcon, label: "Settings" },
];
