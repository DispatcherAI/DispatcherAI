import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ClerkLoading, useAuth, UserButton } from "@clerk/nextjs";

import { Avatar, AvatarFallback } from "../ui/avatar";

interface SidebarAvatarProps {
    isOpen: boolean;
}

export function SidebarAvatar({ isOpen }: SidebarAvatarProps) {
    const { userId } = useAuth();

    return (
        <div className="flex items-center space-x-3 py-5">
            {userId ? (
                <div className="size-8 min-h-8 min-w-8">
                    <ClerkLoading>
                        <Skeleton className="size-8 rounded-full bg-white/10" />
                    </ClerkLoading>
                    <UserButton
                        appearance={{
                            elements: { userButtonAvatarBox: "size-8" },
                        }}
                    />
                </div>
            ) : (
                <Avatar className={"size-8 border border-dp-primary/20"}>
                    <AvatarFallback className="bg-dp-primary/10 text-xs font-semibold text-dp-primary">
                        JS
                    </AvatarFallback>
                </Avatar>
            )}

            <div className={cn(!isOpen && "hidden")}>
                <p className="line-clamp-1 text-ellipsis text-sm font-semibold text-dp-headingText">
                    Jordan Smith
                </p>
                <p className="line-clamp-1 text-ellipsis font-mono text-xxs uppercase tracking-[0.18em] text-dp-text">
                    Demo Operator
                </p>
            </div>
        </div>
    );
}
