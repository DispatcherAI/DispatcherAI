import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: cn(
                    "bg-dp-primary text-dp-card transition-all",
                    "hover:bg-dp-primary2"
                ),
                secondary: cn(
                    "bg-dp-card text-dp-headingText transition-all",
                    "hover:bg-dp-hoverCard hover:ring-1 hover:ring-dp-outline"
                ),
                icon: cn(
                    "border border-dp-outlineNotSelected bg-transparent",
                    "hover:border-dp-outline hover:bg-dp-hoverCard"
                ),
            },
            size: {
                default: "h-8 px-4 py-2 text-xs",
                mini: "h-5 px-4 py-[2px] text-xxs",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
