import { Label } from "@/components/dispatch/label";

export function Labels() {
    return (
        <div className="flex space-x-2">
            <Label severity="critical" />
            <Label severity="warning" />
            <Label severity="safe" />
        </div>
    );
}
