import {
    BookmarkIcon,
    BookOpenCheck,
    BoxesIcon,
    FolderIcon,
    LayoutDashboard,
    RotateCcwIcon,
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
        title: "Incident Management",
        icon: BoxesIcon,
        href: "/",
        disabled: true,
    },
    {
        title: "Data Management",
        icon: FolderIcon,
        href: "/data-management",
        disabled: false,
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
