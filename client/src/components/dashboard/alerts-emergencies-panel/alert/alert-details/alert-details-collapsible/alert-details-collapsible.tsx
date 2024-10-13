import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface AlertDetailsCollapsibleProps {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    collapsibleContentClassname?: string;
    children: React.ReactNode;
}

export function AlertDetailsCollapsible({
    defaultOpen,
    open,
    onOpenChange,
    title,
    collapsibleContentClassname,
    children,
}: AlertDetailsCollapsibleProps) {
    const Icon = open ? ChevronUpIcon : ChevronDownIcon;

    return (
        <Collapsible
            defaultOpen={defaultOpen}
            open={open}
            onOpenChange={onOpenChange}
        >
            <CollapsibleTrigger
                className={cn(
                    "flex-between group h-fit min-h-fit w-full px-3 py-2 text-left text-xs font-semibold uppercase text-dp-headingText",
                    "hover:bg-dp-backgroundHover"
                )}
            >
                <p>{title}</p>
                <Icon className="size-4 stroke-dp-text group-hover:stroke-dp-headingText" />
            </CollapsibleTrigger>

            <CollapsibleContent
                className={cn(
                    "space-y-2 px-3 pb-2",
                    collapsibleContentClassname
                )}
            >
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
}
