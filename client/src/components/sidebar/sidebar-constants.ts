import { BookOpenCheck, LayoutDashboard, type LucideIcon } from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    color?: string;
    isChildren?: boolean;
    children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        color: "text-sky-500",
    },
    {
        title: "Example",
        icon: BookOpenCheck,
        href: "/example",
        color: "text-orange-500",
        isChildren: true,
        children: [
            {
                title: "Example-01",
                icon: BookOpenCheck,
                color: "text-red-500",
                href: "/example/employees",
            },
            {
                title: "Example-02",
                icon: BookOpenCheck,
                color: "text-red-500",
                href: "/example/example-02",
            },
            {
                title: "Example-03",
                icon: BookOpenCheck,
                color: "text-red-500",
                href: "/example/example-03",
            },
        ],
    },
];
