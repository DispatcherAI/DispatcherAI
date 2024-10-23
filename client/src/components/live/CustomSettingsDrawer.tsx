"use client";

import { FormEvent, memo, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Settings, X } from "lucide-react";

const _CustomSettingsDrawer = () => {
    const { user } = useUser();

    const [llm, setLlm] = useState<string | undefined>();
    const [prompt, setPrompt] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    function handleSelect(value: string) {
        setLlm(value);
    }

    function handleInput(e: FormEvent<HTMLTextAreaElement>) {
        setPrompt(e.currentTarget.value);
    }

    async function handleClose() {
        try {
            const response = await fetch("/api/user/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clerkUserId: user?.id,
                    userModel: llm,
                    userPrompt: prompt,
                }),
            });

            const data = await response.json();
            console.log("User updated successfully:", data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    async function fetchUserData() {
        setLoading(true);
        try {
            const response = await fetch(`/api/user?clerkUserId=${user?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data.userModal, data.userPrompt);

            if (response.ok) {
                setLlm(data.userModel);
                setPrompt(data.userPrompt);
            } else {
                console.error("Failed to fetch user:", data.error);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleOpen(open: boolean) {
        if (open) {
            await fetchUserData();
        }
    }

    return (
        <Drawer
            direction="left"
            onClose={handleClose}
            onOpenChange={handleOpen}
        >
            <DrawerTrigger>
                <Settings />
            </DrawerTrigger>
            <DrawerContent className="h-full w-[400px]">
                <DrawerHeader className="flex-between relative mt-4">
                    <div className="space-y-[6px]">
                        <DrawerTitle>Custom Settings</DrawerTitle>
                        <DrawerDescription>
                            More options coming soon!
                        </DrawerDescription>
                    </div>

                    <DrawerClose className="absolute right-2 top-0">
                        <X />
                    </DrawerClose>
                </DrawerHeader>

                <div className="space-y-4 p-4">
                    <div className="space-y-2">
                        <p className="text-normal font-semibold">
                            Select choice of Large Language Model
                        </p>
                        <Select
                            defaultValue="MISTRAL"
                            onValueChange={handleSelect}
                            value={llm}
                            disabled={loading}
                        >
                            <SelectTrigger className="h-10 min-h-0 w-full rounded-md border-[1px] border-[#D7D7D7] py-0 text-[#6C6C6C]">
                                <SelectValue placeholder="LLM" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MISTRAL">
                                    Mistral 7Bx8
                                </SelectItem>
                                <SelectItem
                                    value="OAI"
                                    disabled
                                >
                                    GPT 4o
                                </SelectItem>
                                <SelectItem
                                    value="LLAMA"
                                    disabled
                                >
                                    Llama 3.1 8B
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <p className="text-normal font-semibold">
                            Custom Instructions (for system prompt)
                        </p>
                        <Textarea
                            className="max-h-80 min-h-40 overflow-y-scroll"
                            placeholder="As an LLM-powered dispatcher, correctly evaluate calls based on severity and route calls to the appropriate resource..."
                            onInput={handleInput}
                            value={prompt}
                            disabled={loading}
                        />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export const CustomSettingsDrawer = memo(_CustomSettingsDrawer);
