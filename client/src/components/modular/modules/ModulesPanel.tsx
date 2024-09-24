import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TruckIcon } from "lucide-react";

export function ModulesPanel() {
    return (
        <div className="mt-auto w-modules space-y-[2px] bg-dp-background">
            <div>
                <div className="flex h-6 px-3 py-1 align-middle">
                    <p className="text-xs text-dp-text">Modules Panel</p>
                </div>
                <Separator className="m-0 bg-dp-outline" />
            </div>

            <div className="flex-between p-3">
                <Button
                    className={cn(
                        "group size-15 flex-col space-y-1 rounded-none bg-[#292929] p-2", // fix me: color is not in design system
                        "hover:bg-dp-cards hover:ring-1 hover:ring-dp-accent",
                    )}
                >
                    <TruckIcon
                        className={cn(
                            "stroke-dp-text",
                            "group-hover:stroke-dp-heading",
                        )}
                    />
                    <p
                        className={cn(
                            "text-xs font-semibold text-dp-text",
                            "group-hover:text-dp-heading",
                        )}
                    >
                        Units
                    </p>
                </Button>
            </div>
        </div>
    );
}
