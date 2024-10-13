"use client";

import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

interface EmergencyContextType {
    selectedId: string | undefined;
    setSelectedId: Dispatch<SetStateAction<string | undefined>>;
    handleSelect: (id: string) => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(
    undefined
);

export const EmergencyProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    const handleSelect = (id: string) => {
        setSelectedId(id === selectedId ? undefined : id);
    };

    return (
        <EmergencyContext.Provider
            value={{ selectedId, setSelectedId, handleSelect }}
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
