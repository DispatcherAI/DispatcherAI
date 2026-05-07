import Link from "next/link";
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
    const active = path === item.href;

    return (
        <Link
            key={item.title}
            href={item.href}
            prefetch={false}
            title={item.title}
            onClick={handleClick}
            aria-current={active ? "page" : undefined}
            className={cn(
                "group relative flex items-center gap-3 rounded-[3px] border px-2.5 py-2 text-[13px] transition",
                "border-transparent text-white/65 hover:text-white",
                isOpen ? "justify-start" : "justify-center",
                active
                    ? "border-sodium/35 bg-sodium/[0.06] text-white"
                    : "hover:border-white/10 hover:bg-white/[0.03]",
                item.disabled && "pointer-events-none opacity-40",
            )}
        >
            {active ? (
                <span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-[2px] bg-sodium shadow-[0_0_12px_rgba(244,176,31,0.45)]"
                />
            ) : null}
            <item.icon
                className={cn(
                    "size-4 shrink-0",
                    active ? "text-sodium" : "text-white/55 group-hover:text-white",
                )}
                strokeWidth={1.6}
            />
            {isOpen ? (
                <span
                    className={cn(
                        "font-mono text-[11px] uppercase tracking-console",
                        active ? "text-white" : "text-white/65",
                    )}
                >
                    {item.title}
                </span>
            ) : null}
        </Link>
    );
}
