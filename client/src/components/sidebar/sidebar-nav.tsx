"use client";

import { usePathname } from "next/navigation";

import { NAV_LINKS } from "./sidebar-constants";
import { SidebarLink } from "./sidebar-link";
import { useOpenItemHook } from "./useOpenItem";
import { useSidebar } from "./useSidebar";

interface SidebarNavProps {
    setOpen?: (open: boolean) => void;
}

export function SidebarNav({ setOpen }: SidebarNavProps) {
    const path = usePathname();
    const { isOpen } = useSidebar();
    const { handleClick } = useOpenItemHook({ isOpen, setOpen });

    return (
        <nav className="flex flex-col gap-y-1 py-4">
            {isOpen ? (
                <p className="mb-1 px-2 text-xs text-white/40">Navigate</p>
            ) : null}
            {NAV_LINKS.map((item) => (
                <SidebarLink
                    key={item.title}
                    item={item}
                    isOpen={isOpen}
                    path={path}
                    handleClick={handleClick}
                />
            ))}
        </nav>
    );
}
