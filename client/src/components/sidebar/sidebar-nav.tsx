"use client";

import { usePathname } from "next/navigation";

import { Separator } from "../ui/separator";
import { SidebarAccordion } from "./sidebar-accordion";
import { NAV_ACCORDIONS, NAV_LINKS } from "./sidebar-constants";
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
        <nav className="flex flex-col gap-y-2 py-5">
            {NAV_LINKS.map((item) => (
                <SidebarLink
                    item={item}
                    isOpen={isOpen}
                    path={path}
                    handleClick={handleClick}
                />
            ))}

            <Separator className="bg-dp-outlineNotSelected h-[1px]" />

            {/* {NAV_ACCORDIONS.map((item) => (
                <SidebarAccordion
                    item={item}
                    path={path}
                />
            ))} */}
        </nav>
    );
}
