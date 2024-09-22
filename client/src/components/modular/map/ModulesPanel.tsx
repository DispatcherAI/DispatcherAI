import { Button } from "@/components/ui/button";
import { TruckIcon } from "lucide-react";

export function ModulesPanel() {
    return (
        <div className="bg-dp-background">
            <div>
                <p className="">Modules Panel</p>
            </div>

            <div>
                <Button>
                    <TruckIcon />
                    <p>Units</p>
                </Button>
            </div>
        </div>
    );
}
