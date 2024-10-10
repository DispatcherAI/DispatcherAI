import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: LucideIcon;
    startIconClassName?: string;
    endIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, startIconClassName, type, startIcon, endIcon, ...props },
        ref
    ) => {
        const StartIcon = startIcon;
        const EndIcon = endIcon;

        return (
            <div className="relative w-full">
                {StartIcon && (
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                        <StartIcon
                            size={18}
                            className={cn(
                                "text-muted-foreground",
                                startIconClassName
                            )}
                        />
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-none border border-dp-outline bg-transparent px-4 py-2 text-sm text-dp-headingText ring-offset-background placeholder:text-dp-inputText focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dp-outline focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                        startIcon ? "pl-8" : "",
                        endIcon ? "pr-8" : "",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {EndIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                        <EndIcon
                            className="text-muted-foreground"
                            size={18}
                        />
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
