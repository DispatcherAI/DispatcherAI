import { Button } from "@/components/dispatch/button";

export function Buttons() {
    return (
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
    );
}
