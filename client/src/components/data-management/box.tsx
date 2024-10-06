import { cn } from "@/lib/utils";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export function Box({ children, className }: BoxProps) {
    return (
        <div
            className={cn("border border-dp-outlineNotSelected p-3", className)}
        >
            {children}
        </div>
    );
}
