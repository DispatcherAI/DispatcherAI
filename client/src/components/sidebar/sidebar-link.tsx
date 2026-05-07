import Link from "next/link";
import { Button } from "@/components/dispatch/button";
import { cn } from "@/lib/utils";

import { NavLinkItem } from "./sidebar-constants";

interface SidebarLinkProps {
    item: NavLinkItem;
    isOpen: boolean;
    path: string;
    handleClick: VoidFunction;
}

export function SidebarLink({
    item,
    isOpen,
    path,
    handleClick,
}: SidebarLinkProps) {
    return (
        <Link
            key={item.title}
            href={item.href}
            prefetch={false}
            className={cn("w-full", item.disabled && "pointer-events-none")}
        >
            <Button
                variant={"secondary"}
                className={cn(
                    "group flex w-full justify-center space-x-2 overflow-hidden rounded-xl border border-transparent bg-transparent font-normal text-dp-text",
                    "hover:border-dp-primary/15 hover:bg-dp-primary/10 hover:text-dp-headingText",
                    isOpen && "justify-start",
                    !isOpen && "w-fit max-w-full",
                    path === item.href &&
                        "border-dp-primary/25 bg-dp-primary/15 text-dp-primary shadow-[0_0_24px_rgba(105,210,255,0.12)]"
                )}
                disabled={item.disabled}
                onClick={handleClick}
            >
                <item.icon
                    className={cn(
                        "size-4 min-h-4 min-w-4 transition group-hover:stroke-dp-primary"
                    )}
                />

                <p className={cn("flex", !isOpen && "hidden opacity-0")}>
                    {item.title}
                </p>
            </Button>
        </Link>
    );
}
