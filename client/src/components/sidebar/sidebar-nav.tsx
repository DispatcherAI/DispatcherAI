"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

import { Button, buttonVariants } from "../dispatch/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./sidebar-accordion";
import { type NavItem } from "./sidebar-constants";
import { useSidebar } from "./useSidebar";

interface SidebarNavProps {
    items: NavItem[];
    setOpen?: (open: boolean) => void;
    className?: string;
}

export function SidebarNav({ items, setOpen, className }: SidebarNavProps) {
    const path = usePathname();
    const { isOpen } = useSidebar();

    const [openItem, setOpenItem] = useState("");
    const [lastOpenItem, setLastOpenItem] = useState("");

    const handleClick = () => {
        if (setOpen) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setOpenItem(lastOpenItem);
        } else {
            setLastOpenItem(openItem);
            setOpenItem("");
        }
    }, [isOpen]);

    return (
        <nav className="flex flex-col gap-y-2">
            {items.map((item) =>
                item.isChildren ? (
                    <Accordion
                        type="single"
                        collapsible
                        className="space-y-2"
                        key={item.title}
                        value={openItem}
                        onValueChange={setOpenItem}
                    >
                        <AccordionItem
                            value={item.title}
                            className="border-none"
                        >
                            <AccordionTrigger
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline"
                                )}
                            >
                                <div>
                                    <item.icon className={cn("h-5 w-5")} />
                                </div>
                                <div
                                    className={cn(
                                        "absolute left-12 text-base duration-200",
                                        !isOpen && className
                                    )}
                                >
                                    {item.title}
                                </div>

                                {isOpen && (
                                    <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                                )}
                            </AccordionTrigger>
                            <AccordionContent className="mt-2 space-y-4 pb-1">
                                {item.children?.map((child) => (
                                    <Link
                                        key={child.title}
                                        href={child.href}
                                        onClick={() => {
                                            if (setOpen) setOpen(false);
                                        }}
                                        className={cn(
                                            buttonVariants({
                                                variant: "default",
                                            }),
                                            "group relative flex h-12 justify-start gap-x-3",
                                            path === child.href &&
                                                "bg-muted font-bold hover:bg-muted"
                                        )}
                                    >
                                        <child.icon className={cn("h-5 w-5")} />
                                        <div
                                            className={cn(
                                                "absolute left-12 text-base duration-200",
                                                !isOpen && className
                                            )}
                                        >
                                            {child.title}
                                        </div>
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                            "w-full",
                            item.disabled && "pointer-events-none"
                        )}
                    >
                        <Button
                            variant={"secondary"}
                            className={cn(
                                "flex space-x-2 justify-center bg-transparent font-normal w-full",
                                isOpen && "justify-start",
                                path === item.href && "text-dp-primary"
                            )}
                            disabled={item.disabled}
                            onClick={handleClick}
                        >
                            <item.icon
                                className={cn("size-4 min-h-4 min-w-4")}
                            />

                            <p
                                className={cn(
                                    "flex",
                                    !isOpen && "hidden opacity-0"
                                )}
                            >
                                {item.title}
                            </p>
                        </Button>
                    </Link>
                )
            )}
        </nav>
    );
}
