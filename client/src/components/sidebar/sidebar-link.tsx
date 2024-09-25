import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button } from "../dispatch/button";
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
            className={cn("w-full", item.disabled && "pointer-events-none")}
        >
            <Button
                variant={"secondary"}
                className={cn(
                    "flex space-x-2 justify-center bg-transparent font-normal w-full",
                    isOpen && "justify-start",
                    !isOpen && "w-fit max-w-full",
                    path === item.href && "text-dp-primary"
                )}
                disabled={item.disabled}
                onClick={handleClick}
            >
                <item.icon className={cn("size-4 min-h-4 min-w-4")} />

                <p className={cn("flex", !isOpen && "hidden opacity-0")}>
                    {item.title}
                </p>
            </Button>
        </Link>
    );
}
