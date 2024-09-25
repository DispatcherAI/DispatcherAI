import { Button } from "@/components/dispatch/button";

export default function page() {
    return (
        <div className="h-[100dvh] w-[100dvw] space-y-1 bg-dp-background p-4 flex flex-col">
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
    );
}
