import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ClerkLoading, useAuth, UserButton } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SidebarAvatarProps {
    isOpen: boolean;
}

export function SidebarAvatar({ isOpen }: SidebarAvatarProps) {
    const { userId } = useAuth();

    return (
        <div className="flex space-x-2 py-5">
            {userId ? (
                <div className="size-8 min-h-8 min-w-8">
                    <ClerkLoading>
                        <Skeleton className="size-8 rounded-full bg-dp-hoverCard" />
                    </ClerkLoading>
                    <UserButton
                        appearance={{
                            elements: { userButtonAvatarBox: "size-8" },
                        }}
                    />
                </div>
            ) : (
                <Avatar className={"size-8"}>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback />
                </Avatar>
            )}

            <div className={cn(!isOpen && "hidden")}>
                <p className="line-clamp-1 text-ellipsis text-sm text-dp-headingText">
                    John Smith
                </p>
                <p className="line-clamp-1 text-ellipsis text-xxs text-dp-text">
                    911 Operator
                </p>
            </div>
        </div>
    );
}
