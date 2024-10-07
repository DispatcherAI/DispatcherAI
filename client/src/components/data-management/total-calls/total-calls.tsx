import { DataManagementBox } from "@/components/data-management/data-management-box";
import { TotalCallsCard } from "@/components/data-management/total-calls/total-calls-card";

export function TotalCalls() {
    return (
        <DataManagementBox
            title={"Total calls"}
            className="grow"
        >
            <div className="grid grid-cols-4 gap-x-4">
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls received"}
                    value={"146"}
                />
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total calls resolved"}
                    value={"139"}
                />
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Total wait time"}
                    value={"31:21 min"}
                />
                <TotalCallsCard
                    status={"Nominal"}
                    label={"Average wait time"}
                    value={"5 sec"}
                />
            </div>
        </DataManagementBox>
    );
}
