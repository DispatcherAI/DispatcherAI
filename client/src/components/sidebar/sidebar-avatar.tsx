import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ClerkLoading, useAuth, UserButton, useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback } from "../ui/avatar";

interface SidebarAvatarProps {
    isOpen: boolean;
}

export function SidebarAvatar({ isOpen }: SidebarAvatarProps) {
    const { userId } = useAuth();
    const { user } = useUser();

    const displayName =
        user?.fullName ||
        user?.firstName ||
        user?.username ||
        user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
        "Operator";
    const initials = (
        (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "")
    ).toUpperCase() || "OP";

    return (
        <div className="flex items-center gap-3 px-1 py-3">
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
                <Avatar className="size-8 border border-white/15">
                    <AvatarFallback className="bg-white/[0.04] text-xs font-semibold text-white/85">
                        {initials}
                    </AvatarFallback>
                </Avatar>
            )}

            <div className={cn("min-w-0 flex-1", !isOpen && "hidden")}>
                <p className="line-clamp-1 text-[13px] font-medium text-white">
                    {displayName}
                </p>
                <p className="text-xs text-white/45">Operator</p>
            </div>
        </div>
    );
}
