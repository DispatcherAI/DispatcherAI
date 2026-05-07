"use client";

import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { MESSAGES } from "@/app/(layout)/live/messages";
import { DispatchCall } from "@/app/(layout)/live/page";
import { Severity } from "@/lib/constants";
import { useAuth } from "@clerk/nextjs";
import { User } from "@prisma/client";

const POLL_INTERVAL_MS = 5_000;
const ACTIVE_WINDOW_MS = 5 * 60_000;
const HARD_CAP_MS = 30 * 60_000;
const ACTIVITY_EVENTS = [
    "mousemove",
    "mousedown",
    "keydown",
    "touchstart",
    "scroll",
] as const;

type PollingStatus =
    | "loading"
    | "live"
    | "idle"
    | "paused"
    | "expired"
    | "error";

interface EmergencyContextType {
    selectedId: string | undefined;
    setSelectedId: Dispatch<SetStateAction<string | undefined>>;
    handleSelect: (id: string) => void;

    filterValue: Severity | undefined;
    setFilterValue: Dispatch<SetStateAction<Severity | undefined>>;
    handleFilterValueChange: (newValue: Severity | "_CLEAR") => void;

    connected: boolean;
    pollingStatus: PollingStatus;
    data: Record<string, DispatchCall>;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(
    undefined
);

export const EmergencyProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { userId } = useAuth();
    const [user, setUser] = useState<User>();

    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [filterValue, setFilterValue] = useState<Severity | undefined>();

    const handleSelect = (id: string) => {
        setSelectedId(id === selectedId ? undefined : id);
    };

    const handleFilterValueChange = (newValue: Severity | "_CLEAR") => {
        setFilterValue(newValue === "_CLEAR" ? undefined : newValue);
    };

    const [connected, setConnected] = useState(false);
    const [pollingStatus, setPollingStatus] =
        useState<PollingStatus>("loading");
    const [data, setData] = useState<Record<string, DispatchCall>>(MESSAGES);

    const fetchUserData = useCallback(async () => {
        if (!userId) {
            setUser(undefined);
            return;
        }

        try {
            const response = await fetch(`/api/user?clerkUserId=${userId}`);
            const data = await response.json();

            if (response.ok) {
                setUser(data);
            }
        } catch (e: unknown) {
            console.error(e);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        if (!user?.id) {
            setData(MESSAGES);
            setConnected(false);
            setPollingStatus("loading");
            return;
        }

        let cancelled = false;
        let isFetching = false;
        let status: PollingStatus = "loading";
        const sessionStartedAt = Date.now();
        const hardCapAt = sessionStartedAt + HARD_CAP_MS;
        let activeUntil = sessionStartedAt + ACTIVE_WINDOW_MS;

        const updatePollingStatus = (nextStatus: PollingStatus) => {
            if (cancelled) {
                return;
            }

            status = nextStatus;
            setPollingStatus(nextStatus);
            setConnected(nextStatus === "live");
        };

        const expirePolling = () => {
            updatePollingStatus("expired");
        };

        const mapCallsById = (calls: DispatchCall[]) => {
            const idKeyData: Record<string, DispatchCall> = {};

            for (const call of calls) {
                if (call.callAnalytics) {
                    idKeyData[call.id] = call;
                }
            }

            return idKeyData;
        };

        const fetchCalls = async () => {
            if (cancelled) {
                return;
            }

            const now = Date.now();

            if (now >= hardCapAt) {
                expirePolling();
                return;
            }

            if (document.visibilityState === "hidden") {
                updatePollingStatus("paused");
                return;
            }

            if (now > activeUntil) {
                updatePollingStatus("idle");
                return;
            }

            if (isFetching) {
                return;
            }

            isFetching = true;

            try {
                const response = await fetch(
                    `/api/calls?userId=${encodeURIComponent(user.id)}`,
                    { cache: "no-store" }
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch calls: ${response.status}`
                    );
                }

                const calls = (await response.json()) as DispatchCall[];

                if (cancelled) {
                    return;
                }

                setData({
                    ...MESSAGES,
                    ...mapCallsById(calls),
                });
                updatePollingStatus("live");
            } catch (e: unknown) {
                console.error(e);

                if (!cancelled) {
                    updatePollingStatus("error");
                }
            } finally {
                isFetching = false;
            }
        };

        const handleActivity = () => {
            const now = Date.now();

            if (now >= hardCapAt) {
                expirePolling();
                return;
            }

            activeUntil = Math.min(now + ACTIVE_WINDOW_MS, hardCapAt);

            if (
                document.visibilityState === "visible" &&
                (status === "idle" || status === "paused" || status === "error")
            ) {
                void fetchCalls();
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                handleActivity();
                return;
            }

            updatePollingStatus("paused");
        };

        void fetchCalls();
        const pollingInterval = window.setInterval(
            fetchCalls,
            POLL_INTERVAL_MS
        );
        const hardCapTimeout = window.setTimeout(expirePolling, HARD_CAP_MS);

        for (const eventName of ACTIVITY_EVENTS) {
            window.addEventListener(eventName, handleActivity, {
                passive: true,
            });
        }
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            cancelled = true;
            window.clearInterval(pollingInterval);
            window.clearTimeout(hardCapTimeout);
            for (const eventName of ACTIVITY_EVENTS) {
                window.removeEventListener(eventName, handleActivity);
            }
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [user?.id]);

    return (
        <EmergencyContext.Provider
            value={{
                selectedId,
                setSelectedId,
                handleSelect,

                filterValue,
                setFilterValue,
                handleFilterValueChange,

                connected,
                pollingStatus,
                data,
            }}
        >
            {children}
        </EmergencyContext.Provider>
    );
};

export const useEmergencyContext = (): EmergencyContextType => {
    const context = useContext(EmergencyContext);
    if (!context) {
        throw new Error(
            "useEmergencyContext must be used within a EmergencyProvider"
        );
    }
    return context;
};
