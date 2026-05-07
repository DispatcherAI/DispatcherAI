"use client";

import React, { useCallback, useState } from "react";
import { Separator } from "@/components/dispatch/separator";
import { SidebarEmergencyWebsocket } from "@/components/sidebar/sidebar-emergency-websocket";
import { cn } from "@/lib/utils";

import { SidebarAvatar } from "./sidebar-avatar";
import { SidebarNav } from "./sidebar-nav";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebar } from "./useSidebar";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const { isOpen, toggle } = useSidebar();
    const [status, setStatus] = useState(false);

    const handleToggle = useCallback(() => {
        setStatus(true);
        toggle();
        setTimeout(() => setStatus(false), 500);
    }, []);

    return (
        <nav
            className={cn(
                `relative z-50 hidden h-screen flex-col border-r border-white/10 bg-[#060a0f]/95 px-2 pb-4 pt-3 shadow-[18px_0_50px_rgba(0,0,0,0.32)] backdrop-blur-xl md:flex`,
                status && "duration-500",
                isOpen ? "w-60 min-w-60" : "w-[58px] min-w-[58px]",
                className
            )}
        >
            <SidebarToggle
                isOpen={isOpen}
                handleToggle={handleToggle}
            />

            <Separator className="mt-2 h-[1px] bg-white/10" />

            <SidebarAvatar isOpen={isOpen} />

            <Separator className="h-[1px] bg-white/10" />

            <SidebarNav />

            <Separator className="mt-auto h-[1px] bg-white/10" />

            <SidebarEmergencyWebsocket />
        </nav>
    );
}
