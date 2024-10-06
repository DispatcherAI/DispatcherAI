"use client";

import { TotalCalls } from "@/components/data-management/total-calls/total-calls";

export default function Page() {
    return (
        <div className="h-full bg-dp-backgroundHover px-15 py-10">
            <div>
                <TotalCalls />
            </div>
        </div>
    );
}
