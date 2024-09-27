"use client";

import { Button } from "@/components/dispatch/button";
import { CircleAlertIcon } from "lucide-react";
import { toast } from "sonner";

export default function page() {
    const handleToast = () => {
        toast("Critical house fire detected", {
            position: "top-center",
            classNames: {
                toast: "pr-5 pb-14 w-80",
                title: "text-lg leading-none line-clamp-1 overflow-hidden text-ellipsis",
                description:
                    "text-xs leading-none line-clamp-1 overflow-hidden text-ellipsis",
                closeButton:
                    "ml-auto -mr-[3px] mt-[6px] w-fit h-fit border-0 hover:!bg-transparent hover:text-dp-primary",
                icon: "w-5 flex mb-auto align-top",
            },
            description: "Detected 3mi away in Spring Ave.",
            icon: (
                <div className="flex-center ml-1 mt-[2px] size-5">
                    <CircleAlertIcon className="size-5 w-full fill-dp-headingText stroke-dp-background" />
                </div>
            ),
            // action: { label: "View", onClick: () => {} },
            action: (
                <Button
                    variant={"secondary"}
                    className="absolute bottom-3 right-5"
                >
                    View
                </Button>
            ),
            // cancel: { label: "Dismiss", onClick: () => {} },
            cancel: (
                <Button className="absolute bottom-3 right-[81px] bg-transparent text-dp-text hover:bg-transparent hover:text-dp-headingText">
                    Dismiss
                </Button>
            ),
            closeButton: true,
            dismissible: true,
            duration: 100000,
        });
    };

    return (
        <div className="flex h-[100dvh] w-[100dvw] flex-col space-y-4 bg-[#111111] p-4">
            <Button onClick={handleToast}>Toast me!</Button>

            <div className="space-y-1">
                <div className="space-x-2">
                    <Button>Primary</Button>
                    <Button disabled>Primary (disabled)</Button>
                    <Button variant={"secondary"}>Secondary</Button>
                    <Button
                        variant={"secondary"}
                        disabled
                    >
                        Secondary (disabled)
                    </Button>
                </div>
                <div className="space-x-2">
                    <Button size={"mini"}>Primary</Button>
                    <Button
                        disabled
                        size={"mini"}
                    >
                        Primary (disabled)
                    </Button>
                    <Button
                        variant={"secondary"}
                        size={"mini"}
                    >
                        Secondary
                    </Button>
                    <Button
                        variant={"secondary"}
                        disabled
                        size={"mini"}
                    >
                        Secondary (disabled)
                    </Button>
                </div>
            </div>
        </div>
    );
}
