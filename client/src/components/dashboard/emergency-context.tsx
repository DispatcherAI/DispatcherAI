"use client";

import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { Severity } from "@/lib/constants";

interface EmergencyContextType {
    selectedId: string | undefined;
    setSelectedId: Dispatch<SetStateAction<string | undefined>>;
    handleSelect: (id: string) => void;

    filterValue: Severity | undefined;
    setFilterValue: Dispatch<SetStateAction<Severity | undefined>>;
    handleFilterValueChange: (newValue: Severity | "_CLEAR") => void;
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
    const [filterValue, setFilterValue] = useState<Severity | undefined>();

    const handleSelect = (id: string) => {
        setSelectedId(id === selectedId ? undefined : id);
    };

    const handleFilterValueChange = (newValue: Severity | "_CLEAR") => {
        setFilterValue(newValue === "_CLEAR" ? undefined : newValue);
    };

    return (
        <EmergencyContext.Provider
            value={{
                selectedId,
                setSelectedId,
                handleSelect,

                filterValue,
                setFilterValue,
                handleFilterValueChange,
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
