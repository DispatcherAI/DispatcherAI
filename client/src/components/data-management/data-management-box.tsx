import { Box } from "@/components/data-management/box";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/dispatch/select";
import { Separator } from "@/components/dispatch/separator";
import { MONTHS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";

import { Button } from "../dispatch/button";

interface DataManagementBoxProps {
    title: string;
    className?: string;
    children: React.ReactNode;
    onDownload?: VoidFunction;
    // onClickSettings: VoidFunction;
}

export function DataManagementBox({
    title,
    className,
    children,
    onDownload,
}: DataManagementBoxProps) {
    return (
        <Box className={className}>
            <div className="flex-between">
                <p
                    className={cn(
                        "line-clamp-1 text-ellipsis text-sm font-medium text-dp-headingText",
                        title.split(" ").length == 1 && "inline-block"
                    )}
                >
                    {title}
                </p>

                <div className="flex space-x-1">
                    {onDownload ? (
                        <Button
                            variant={"icon"}
                            size={"icon"}
                            className="group size-7 border-dp-outline"
                        >
                            <DownloadIcon className="size-4 stroke-dp-inputText group-hover:stroke-dp-headingText" />
                        </Button>
                    ) : null}

                    <Select defaultValue="2">
                        <SelectTrigger className="h-7 w-40 p-2 text-xs uppercase">
                            <SelectValue placeholder="MONTH" />
                        </SelectTrigger>
                        <SelectContent className="uppercase">
                            {MONTHS.map((month, index) => (
                                <SelectItem
                                    value={index.toString()}
                                    className="text-xs"
                                >
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Separator className="my-3" />

            {children}
        </Box>
    );
}
