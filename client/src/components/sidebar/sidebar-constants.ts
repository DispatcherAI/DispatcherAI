import {
    BookOpenCheck,
    BoxesIcon,
    FolderIcon,
    LayoutDashboard,
    RotateCcwIcon,
    SettingsIcon,
    type LucideIcon,
} from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    isChildren?: boolean;
    children?: NavItem[];
    disabled?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        title: "Live Dispatch",
        icon: LayoutDashboard,
        href: "/live",
    },
    {
        title: "Incident Management",
        icon: BoxesIcon,
        href: "/",
        disabled: true,
    },
    {
        title: "Data Management",
        icon: FolderIcon,
        href: "/",
        disabled: true,
    },
    {
        title: "Call History",
        icon: RotateCcwIcon,
        href: "/",
        disabled: true,
    },
    {
        title: "Settings",
        icon: SettingsIcon,
        href: "/",
        disabled: true,
    },
    {
        title: "Example",
        icon: BookOpenCheck,
        href: "/example",
        isChildren: true,
        children: [
            {
                title: "Example-01",
                icon: BookOpenCheck,
                href: "/example/employees",
            },
            {
                title: "Example-02",
                icon: BookOpenCheck,
                href: "/example/example-02",
            },
            {
                title: "Example-03",
                icon: BookOpenCheck,
                href: "/example/example-03",
            },
        ],
    },
];
