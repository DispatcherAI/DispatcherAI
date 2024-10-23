import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";

export function Selects() {
    return (
        <div className="uppercase">
            <Select defaultValue="SF">
                <SelectTrigger className="uppercase">
                    <SelectValue placeholder="LOCATION" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="SF">San Francisco, CA</SelectItem>
                    <SelectItem value="BER">Berkeley, CA</SelectItem>
                    <SelectItem
                        value="OAK"
                        disabled
                    >
                        Oakland, CA
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
