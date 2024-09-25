import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// TODO: Hook up Clerk

interface SidebarAvatarProps {
    isOpen: boolean;
}

export function SidebarAvatar({ isOpen }: SidebarAvatarProps) {
    return (
        <div className="flex space-x-1 py-5">
            <Avatar className={cn("size-8")}>
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                />
                <AvatarFallback />
            </Avatar>

            <div className={cn(!isOpen && "hidden")}>
                <p className="line-clamp-1 text-ellipsis text-sm text-dp-heading">
                    John Smith
                </p>
                <p className="line-clamp-1 text-ellipsis text-xxs text-dp-text">
                    911 Operator
                </p>
            </div>
        </div>
    );
}
