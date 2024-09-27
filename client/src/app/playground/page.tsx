"use client";

import { Button } from "@/components/dispatch/button";
import { dispatchToast } from "@/components/dispatch/dispatch-toast";

export default function page() {
    const handleEmergencyToast = () => {
        dispatchToast({
            title: "Emergency",
            description: "Ad nisi elit dolor veniam officia velit velit.",
            variant: "emergency",
        });
    };
    const handleWarningToast = () => {
        dispatchToast({
            title: "Warning",
            description: "Ad nisi elit dolor veniam officia velit velit.",
            variant: "warning",
        });
    };
    const handleSuccessToast = () => {
        dispatchToast({
            title: "Success",
            description: "Ad nisi elit dolor veniam officia velit velit.",
            variant: "success",
        });
    };
    const handleNotificationToast = () => {
        dispatchToast({
            title: "Notification",
            description: "Ad nisi elit dolor veniam officia velit velit.",
            variant: "notification",
        });
    };

    return (
        <div className="flex h-[100dvh] w-[100dvw] flex-col space-y-4 bg-[#111111] p-4">
            <div className="space-x-2">
                <Button onClick={handleEmergencyToast}>Emergency</Button>
                <Button onClick={handleWarningToast}>Warning</Button>
                <Button onClick={handleSuccessToast}>Success</Button>
                <Button onClick={handleNotificationToast}>Notification</Button>
            </div>

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
