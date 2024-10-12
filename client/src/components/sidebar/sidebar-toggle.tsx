import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";

interface SidebarToggleProps {
    isOpen: boolean;
    handleToggle: VoidFunction;
}

export function SidebarToggle({ isOpen, handleToggle }: SidebarToggleProps) {
    return (
        <div
            className={cn(
                "flex h-3 w-fit cursor-pointer text-xxs",
                !isOpen && "w-full"
            )}
            onClick={handleToggle}
        >
            <ChevronLeftIcon
                className={cn(
                    "my-auto h-full w-fit text-dp-headingText",
                    !isOpen && "w-full rotate-180"
                )}
            />
            <p className={cn("text-dp-text", !isOpen && "hidden")}>Collapse</p>
        </div>
    );
}
