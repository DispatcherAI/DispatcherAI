"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Headset, HomeIcon, RadioIcon } from "lucide-react";

import { Separator } from "../ui/separator";

const Sidebar = () => {
    const pathname = usePathname();
    const { isSignedIn } = useAuth();

    return (
        <div className="flex-between z-50 w-12 flex-col items-center border-r-2 border-[#C2C2C2] bg-[#F6F8FC] p-3">
            <div className="">
                <div className="flex-center flex-col rounded-full ">
                    <Link href="/">
                        <Headset className="m-auto" />
                    </Link>
                    <Separator className="mx-3 my-3 w-5 bg-[#6C6C6C] p-[1px]" />
                </div>
                <div className="flex-center flex-col space-y-3">
                    <Link href="/">
                        <HomeIcon />
                    </Link>
                    <Link href="/live">
                        <RadioIcon
                            className={cn(
                                pathname == "/live" && "text-blue-500",
                            )}
                        />
                    </Link>
                </div>
            </div>

            {isSignedIn ? <UserButton /> : null}
        </div>
    );
};

export default Sidebar;
