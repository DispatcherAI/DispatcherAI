import { DataManagementBox } from "@/components/data-management/data-management-box";

import { TotalCallsCard } from "../total-calls/total-calls-card";

export function CommunicationStatus() {
    function handleDownload() {
        console.log("download!");
    }

    return (
        <DataManagementBox
            title={"Communication status"}
            className="grow"
            onDownload={handleDownload}
        >
            <div className="grid grid-cols-3 gap-x-4">
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls received"}
                    value={"146"}
                />
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls received"}
                    value={"146"}
                />
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls received"}
                    value={"146"}
                />
            </div>
        </DataManagementBox>
    );
}
