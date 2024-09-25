import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

import { buttonVariants } from "../dispatch/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./sidebar-accordion-radix";
import { NavAccordionItem } from "./sidebar-constants";
import { useOpenItemHook } from "./useOpenItem";
import { useSidebar } from "./useSidebar";

interface SidebarAccordionProps {
    item: NavAccordionItem;
    path: string;
    setOpen?: (open: boolean) => unknown;
}

export function SidebarAccordion({
    item,
    path,
    setOpen,
}: SidebarAccordionProps) {
    const { isOpen } = useSidebar();
    const { openItem, setOpenItem } = useOpenItemHook({ isOpen, setOpen });

    return (
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
                    <div
                        className={cn(
                            "absolute left-12 text-base duration-200"
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
                                    "absolute left-12 text-base duration-200"
                                )}
                            >
                                {child.title}
                            </div>
                        </Link>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
