"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { DossierMark } from "@/components/brand/DossierMark";
import { SidebarEmergencyWebsocket } from "@/components/sidebar/sidebar-emergency-websocket";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

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
    }, [toggle]);

    return (
        <nav
            className={cn(
                "relative z-50 hidden h-screen flex-col border-r border-white/8 bg-ink-deep/95 px-3 pb-4 pt-3 md:flex",
                status && "duration-500",
                isOpen ? "w-[232px] min-w-[232px]" : "w-[64px] min-w-[64px]",
                className,
            )}
        >
            <div className={cn("flex items-center justify-between", isOpen ? "px-1" : "px-0")}>
                <Link
                    href="/"
                    prefetch={false}
                    className="block"
                >
                    <DossierMark
                        size="sm"
                        showWordmark={isOpen}
                    />
                </Link>
                <SidebarToggle
                    isOpen={isOpen}
                    handleToggle={handleToggle}
                />
            </div>

            <div className="my-3 h-px w-full bg-white/8" />

            <SidebarAvatar isOpen={isOpen} />

            <div className="my-1 h-px w-full bg-white/8" />

            <SidebarNav />

            <div className="mt-auto flex flex-col gap-3">
                <div className="h-px w-full bg-white/8" />

                {isOpen ? (
                    <Link
                        href="/#sources"
                        prefetch={false}
                        className="group block rounded-[4px] border border-white/8 bg-white/[0.02] px-3 py-2.5 transition hover:border-white/20 hover:bg-white/[0.04]"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-white/55">
                                Berkeley AI ‘24
                            </p>
                            <ArrowUpRight className="size-3 text-white/40 transition group-hover:text-white" />
                        </div>
                        <p className="mt-1.5 text-sm font-medium leading-tight text-white">
                            Read the case study
                        </p>
                    </Link>
                ) : (
                    <Link
                        href="/#sources"
                        prefetch={false}
                        title="Read the case study"
                        className="mx-auto flex size-8 items-center justify-center rounded-[4px] border border-white/8 text-white/55 transition hover:border-white/20 hover:text-white"
                    >
                        <ArrowUpRight className="size-3.5" />
                    </Link>
                )}

                <div className="flex items-center justify-between px-1">
                    <SidebarEmergencyWebsocket />
                    {isOpen ? (
                        <span className="text-xs text-white/40">
                            Polls every 5s
                        </span>
                    ) : null}
                </div>
            </div>
        </nav>
    );
}
