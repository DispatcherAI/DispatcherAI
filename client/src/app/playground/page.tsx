"use client";

import { Button } from "@/components/dispatch/button";
import { useToast } from "@/components/dispatch/use-toast";

export default function page() {
    const { toast } = useToast();

    const handleToast = () => {
        toast({
            title: "toast!",
            description: "yay",
        });
    };

    return (
        <div className="flex h-[100dvh] w-[100dvw] flex-col space-y-4 bg-dp-background p-4">
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
