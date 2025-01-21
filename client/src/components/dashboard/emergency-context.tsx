"use client";

import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { MESSAGES } from "@/app/(layout)/live/messages";
import { DispatchCall } from "@/app/(layout)/live/page";
import { Severity } from "@/lib/constants";
import { useAuth } from "@clerk/nextjs";
import { User } from "@prisma/client";

interface EmergencyContextType {
    selectedId: string | undefined;
    setSelectedId: Dispatch<SetStateAction<string | undefined>>;
    handleSelect: (id: string) => void;

    filterValue: Severity | undefined;
    setFilterValue: Dispatch<SetStateAction<Severity | undefined>>;
    handleFilterValueChange: (newValue: Severity | "_CLEAR") => void;

    connected: boolean;
    data: Record<string, DispatchCall>;
    handleTransfer: VoidFunction;
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

    const websocket = useRef<WebSocket>();
    const [connected, setConnected] = useState(false);
    const [data, setData] = useState<Record<string, DispatchCall>>(MESSAGES);

    // const [resolvedIds, setResolvedIds] = useState<string[]>([]);

    const handleTransfer = (id?: string) => {
        console.log("transfer: ", id);

        websocket.current?.send(
            JSON.stringify({
                event: "transfer",
                id: id ?? selectedId,
            })
        );
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/user?clerkUserId=${userId}`);
            const data = await response.json();

            if (response.ok) {
                setUser(data);
            }
        } catch (e: unknown) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        websocket.current = new WebSocket(
            `wss://fitting-correctly-lioness.ngrok-free.app/ws?client_id=${user?.id}`
        );

        const wss = websocket.current;

        wss.onopen = () => {
            console.log("WebSocket connection established");
            setConnected(true);

            wss.send(
                JSON.stringify({
                    event: "get_db",
                })
            );

            // TODO: check the types
            wss.onmessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                const data = message.data;
                console.log("Call Data:", data);

                if (data) {
                    // Object.keys(data).forEach((key) => {
                    //     if (resolvedIds?.includes(data[key].id)) {
                    //         data[key].severity = "RESOLVED";
                    //     }
                    // });

                    const idKeyData: Record<string, DispatchCall> = {};

                    for (const call of data) {
                        idKeyData[call.id] = call;
                    }

                    setData(idKeyData);
                } else {
                    console.warn("Received unknown message");
                }
            };

            wss.onclose = () => {
                console.log("Closing websocket");
                setConnected(false);
            };
        };

        return () => {
            wss.close();
        };
    }, [user]);

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
                data,
                handleTransfer,
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
