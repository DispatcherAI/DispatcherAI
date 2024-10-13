import { Dispatch, SetStateAction } from "react";
import { Alert } from "@/components/dashboard/alerts-emergencies-panel/alert/alerts.type";
import { Button } from "@/components/dispatch/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dispatch/dialog";

interface AlertDetailsDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    alert: Alert;
}

export function AlertDetailsAction({
    open,
    setOpen,
    alert,
}: AlertDetailsDialogProps) {
    const active = alert.status === "active";

    const buttonText = `${active ? "Mark as Resolved" : "Reopen"}`;
    const title = `Are you sure you want to ${active ? "resolve" : "reopen"} this issue?`;

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    variant={"default"}
                    className="grow"
                >
                    {buttonText}
                </Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-sm">{title}</DialogTitle>
                    <DialogDescription>
                        <div className="space-y-2 border border-dp-outlineNotSelected p-2">
                            <p className="text-sm font-semibold leading-none text-dp-headingText">
                                {alert.title}
                            </p>
                            <p className="text-xs text-dp-text">
                                {alert.details}
                            </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant={"secondary"}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={"default"}
                        onClick={() => setOpen(false)}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
