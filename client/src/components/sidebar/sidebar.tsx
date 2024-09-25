"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { Separator } from "../ui/separator";
import { NAV_ITEMS } from "./sidebar-constants";
import { SideNav } from "./sidebar-nav";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebar } from "./useSidebar";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const { isOpen, toggle } = useSidebar();
    const [status, setStatus] = useState(false);

    const handleToggle = () => {
        setStatus(true);
        toggle();
        setTimeout(() => setStatus(false), 500);
    };

    return (
        <nav
            className={cn(
                `relative z-50 hidden h-screen border-r bg-dp-background px-2 pb-4 pt-3 md:block`,
                status && "duration-500",
                isOpen ? "w-52 min-w-52" : "w-[50px] min-w-[50px]",
                className
            )}
        >
            <SidebarToggle
                isOpen={isOpen}
                handleToggle={handleToggle}
            />

            <Separator className="bg-dp-outlineNotSelected my-2 h-[1px]" />

            <div></div>

            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mt-3 space-y-1">
                        <SideNav
                            className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
                            items={NAV_ITEMS}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
