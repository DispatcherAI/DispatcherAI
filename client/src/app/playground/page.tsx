"use client";

import { Button } from "@/components/dispatch/button";
import { dispatchToast } from "@/components/dispatch/dispatch-toast";

export default function page() {
    const handleToast = () => {
        dispatchToast({
            title: "Critical house fire detected",
            description: "Detected 3mi away in Spring Ave.",
            variant: "success",
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
