import { Button } from "@/components/dispatch/button";
import { dispatchToast } from "@/components/dispatch/dispatch-toast";

const handleEmergencyToast = () => {
    dispatchToast({
        title: "Emergency",
        description: "Ad nisi elit dolor veniam officia velit velit.",
        variant: "emergency",
    });
};
const handleWarningToast = () => {
    dispatchToast({
        title: "Warning",
        description: "Ad nisi elit dolor veniam officia velit velit.",
        variant: "warning",
    });
};
const handleSuccessToast = () => {
    dispatchToast({
        title: "Success",
        description: "Ad nisi elit dolor veniam officia velit velit.",
        variant: "success",
    });
};
const handleNotificationToast = () => {
    dispatchToast({
        title: "Notification",
        description: "Ad nisi elit dolor veniam officia velit velit.",
        variant: "notification",
    });
};

export function Toasts() {
    return (
        <div className="space-x-2">
            <Button onClick={handleEmergencyToast}>Emergency</Button>
            <Button onClick={handleWarningToast}>Warning</Button>
            <Button onClick={handleSuccessToast}>Success</Button>
            <Button onClick={handleNotificationToast}>Notification</Button>
        </div>
    );
}
