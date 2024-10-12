import { Checkbox } from "@/components/dispatch/checkbox";

export function Checkboxes() {
    return (
        <div className="flex space-x-2">
            <Checkbox />
            <Checkbox disabled />
        </div>
    );
}
