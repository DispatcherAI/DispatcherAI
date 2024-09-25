import { useState } from "react";

export interface UseSidebarProps {
    isOpen: boolean;
    toggle: () => void;
}

export const useSidebar = (): UseSidebarProps => {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen((prevState) => !prevState);
    };

    return {
        isOpen,
        toggle,
    };
};
