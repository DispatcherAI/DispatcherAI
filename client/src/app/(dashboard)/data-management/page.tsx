"use client";

import { CommunicationStatus } from "@/components/data-management/communication-status/communication-status";
import { TotalCalls } from "@/components/data-management/total-calls/total-calls";

export default function Page() {
    return (
        <div className="h-full bg-dp-backgroundHover px-15 py-10">
            <div className="flex space-x-3">
                <TotalCalls />

                <CommunicationStatus />
            </div>
        </div>
    );
}
