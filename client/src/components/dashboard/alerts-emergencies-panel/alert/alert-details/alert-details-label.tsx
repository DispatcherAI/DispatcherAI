import { CloseButton } from "@/components/shared/CloseButton";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

interface AlertDetailsLabel {
    handleClose: VoidFunction;
}

export function AlertDetailsLabel({ handleClose }: AlertDetailsLabel) {
    return (
        <DropdownMenuLabel className="relative px-3 py-1 text-xs font-normal text-dp-text">
            <p>Alert Details</p>
            <CloseButton
                buttonClassname="size-6 absolute right-0 top-0 hover:bg-dp-backgroundHover"
                iconClassname="size-4"
                handleClose={handleClose}
            />
        </DropdownMenuLabel>
    );
}
