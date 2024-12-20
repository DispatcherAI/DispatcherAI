import { Button } from "@/components/dispatch/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

interface CloseButtonProps {
    buttonClassname?: string;
    iconClassname?: string;
    handleClose: VoidFunction;
}

export function CloseButton({
    buttonClassname,
    iconClassname,
    handleClose,
}: CloseButtonProps) {
    return (
        <Button
            variant={"secondary"}
            size={"icon"}
            className={cn(
                "group border-l border-dp-outline bg-dp-background hover:ring-0",
                buttonClassname
            )}
            onClick={handleClose}
        >
            <XIcon
                className={cn(
                    "text-dp-text group-hover:text-dp-headingText",
                    iconClassname
                )}
            />
        </Button>
    );
}
