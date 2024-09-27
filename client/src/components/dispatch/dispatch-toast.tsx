import { useEffect, useState } from "react";
import { Button } from "@/components/dispatch/button";
import {
    CircleAlertIcon,
    CircleCheckIcon,
    LucideIcon,
    MessageSquareDotIcon,
    TriangleAlertIcon,
} from "lucide-react";
import { toast } from "sonner-b4ffb609";

type Position =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";

type ToastVariant = "emergency" | "warning" | "success" | "notification";

const TOAST_ICONS: Record<ToastVariant, LucideIcon> = {
    emergency: CircleAlertIcon,
    warning: TriangleAlertIcon,
    success: CircleCheckIcon,
    notification: MessageSquareDotIcon,
};

const TOAST_BORDER: Record<ToastVariant, string> = {
    emergency: "border-dp-critical",
    warning: "border-dp-medium",
    success: "border-dp-nonEmergency",
    notification: "border-dp-primary",
};

interface DispatchToastProps {
    position?: Position;
    variant: ToastVariant;
    title: string;
    description: string;
    closeButton?: boolean;
    dismissible?: boolean;
    duration?: number;
    handleView?: VoidFunction;
    handleDismiss?: VoidFunction;
}

interface DescriptionAndTimeProps {
    description: string;
    createdTime: number;
}

function DescriptionAndTime({
    description,
    createdTime,
}: DescriptionAndTimeProps) {
    const [timeSince, setTimeSince] = useState(timeAgo(createdTime));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeSince(timeAgo(createdTime));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [createdTime]);

    return (
        <div className="flex-col">
            <div className="line-clamp-1 overflow-hidden text-ellipsis text-xs leading-none">
                {description}
            </div>

            <div className="absolute left-3 top-3 line-clamp-1 overflow-hidden text-ellipsis text-xs leading-none">
                {timeSince}
            </div>
        </div>
    );
}

/**
 * Custom wrapper around sonner's toast component with custom Dispatch styling
 *
 * @see {@link https://sonner.emilkowal.ski/} Sonner docs
 *
 * @see {@link https://github.com/emilkowalski/sonner/issues/479} There is currently a bug where a toast stack disappears when the first toast disappears
 */
export function dispatchToast({
    position = "top-center",
    variant,
    title,
    description,
    closeButton = true,
    dismissible = true,
    duration = 4000,
    handleView,
    handleDismiss,
}: DispatchToastProps) {
    const IconComponent = TOAST_ICONS[variant];
    const borderColor = TOAST_BORDER[variant];
    const createdTime = Date.now();

    const toastId = toast(title, {
        position: position,
        classNames: {
            toast: `pt-7 pr-5 pb-14 w-80 ${borderColor}`,
            title: "text-lg leading-none line-clamp-1 overflow-hidden text-ellipsis pb-1",
            description: "",
            closeButton:
                "ml-auto mt-[8px] w-fit h-fit border-0 hover:!bg-transparent hover:text-dp-primary",
            icon: "w-5 flex mb-auto align-top",
        },
        description: (
            <DescriptionAndTime
                description={description}
                createdTime={createdTime}
            />
        ),
        icon: (
            <div className="flex-center ml-1 mt-[2px] size-5">
                <IconComponent className="size-5 w-full fill-dp-headingText stroke-dp-background" />
            </div>
        ),
        action: (
            <Button
                variant={"secondary"}
                className="absolute bottom-3 right-5"
                onClick={handleView}
            >
                View
            </Button>
        ),
        cancel: (
            <Button
                className="absolute bottom-3 right-[81px] bg-transparent text-dp-text hover:bg-transparent hover:text-dp-headingText"
                onClick={
                    handleDismiss ? handleDismiss : () => toast.dismiss(toastId)
                }
            >
                Dismiss
            </Button>
        ),
        closeButton: dismissible && closeButton,
        dismissible: dismissible,
        duration: duration,
    });
}

function timeAgo(date: number) {
    const seconds = Math.floor((Date.now() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval == 1) return `${interval} minute ago`;

    return `just now`;
}
