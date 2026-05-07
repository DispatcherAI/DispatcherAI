import {
    BarChart3Icon,
    BookmarkIcon,
    BookOpenCheck,
    LayoutDashboard,
    RadioTowerIcon,
    SettingsIcon,
    type LucideIcon,
} from "lucide-react";

export interface NavLinkItem {
    title: string;
    href: string;
    icon: LucideIcon;
    disabled?: boolean;
}

export interface NavAccordionItem extends Omit<NavLinkItem, "href"> {
    isChildren?: boolean;
    children?: NavLinkItem[];
}

export const NAV_LINKS: NavLinkItem[] = [
    {
        title: "Live Dispatch",
        icon: LayoutDashboard,
        href: "/live",
    },
    {
        title: "Analytics",
        icon: BarChart3Icon,
        href: "/data-management",
    },
    {
        title: "Settings",
        icon: SettingsIcon,
        href: "/settings",
    },
    {
        title: "Command Center",
        icon: RadioTowerIcon,
        href: "/",
    },
];

export const NAV_ACCORDIONS: NavAccordionItem[] = [
    {
        title: "Protocols",
        icon: BookmarkIcon,
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
