"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group rounded-none p-3 border-l-[6px] border-y-0 border-r-0 toast group-[.toaster]:bg-dp-background group-[.toaster]:text-dp-headingText group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-dp-text",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    closeButton: "right-0",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
