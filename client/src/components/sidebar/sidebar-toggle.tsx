import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";

interface SidebarToggleProps {
    isOpen: boolean;
    handleToggle: VoidFunction;
}

export function SidebarToggle({ isOpen, handleToggle }: SidebarToggleProps) {
    return (
        <button
            type="button"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            title={isOpen ? "Collapse" : "Expand"}
            onClick={handleToggle}
            className={cn(
                "flex size-7 items-center justify-center rounded-[3px] border border-white/10 bg-white/[0.02] text-white/55 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white",
                !isOpen && "mx-auto mt-2",
            )}
        >
            <ChevronLeftIcon
                className={cn("size-3.5", !isOpen && "rotate-180")}
            />
        </button>
    );
}
