export type Status = "active" | "resolved";

export interface Alert {
    id: string;
    title: string;
    details: string;
    time: string; // TODO: should be a UNIX date time
    status: Status;
}

export interface ActiveAlert extends Alert {
    status: "active";
}

export interface ResolvedAlert extends Alert {
    status: "resolved";
}

export const ALERTS: { active: ActiveAlert[]; resolved: ResolvedAlert[] } = {
    active: [
        {
            id: "1",
            title: "Unit unreachable",
            details: "The unit cannot be reached. Possible radio failure.",
            time: "11:56AM",
            status: "active",
        },
        {
            id: "2",
            title: "High Call Volume Alert",
            details:
                "Multiple 911 calls received in the last 10 minutes. Prioritize response based on severity.",
            time: "10:31AM",
            status: "active",
        },
        {
            id: "3",
            title: "Large bush fire in the region",
            details: "May impact several homes in the Coarse County region.",
            time: "7:41AM",
            status: "active",
        },
        {
            id: "4",
            title: "Communication lines unstable",
            details:
                "Recent rainstorm has caused communication in the region to be unstable.",
            time: "4:12AM",
            status: "active",
        },
    ],
    resolved: [
        {
            id: "1",
            title: "High Call Volume Alert",
            details:
                "Multiple 911 calls received in the last 10 minutes. Prioritize response based on severity.",
            time: "10:31AM",
            status: "resolved",
        },
        {
            id: "2",
            title: "FPD 2334 Unavailable",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget purus id erat volutpat ultricies.",
            time: "10:31AM",
            status: "resolved",
        },
    ],
};
