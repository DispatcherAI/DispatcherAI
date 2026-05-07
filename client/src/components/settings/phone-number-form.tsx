"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/dispatch/button";
import { Input } from "@/components/dispatch/input";
import { formatPhoneNumberForDisplay, normalizePhoneNumber } from "@/lib/phone";
import { PhoneIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";

interface PhoneNumberFormProps {
    initialPhoneNumber: string | null;
    isRequired: boolean;
}

export function PhoneNumberForm({
    initialPhoneNumber,
    isRequired,
}: PhoneNumberFormProps) {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState(
        initialPhoneNumber
            ? formatPhoneNumberForDisplay(initialPhoneNumber)
            : "",
    );
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const normalizedPreview = useMemo(
        () => normalizePhoneNumber(phoneNumber),
        [phoneNumber],
    );

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            const response = await fetch("/api/user/phone", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? "Failed to save phone number.");
            }

            toast.success("Phone number saved");

            if (isRequired) {
                router.push("/live");
                return;
            }

            setPhoneNumber(formatPhoneNumberForDisplay(data.phoneNumber));
            router.refresh();
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Failed to save phone number.";
            setError(message);
            toast.error(message);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form
            className="space-y-5"
            onSubmit={handleSubmit}
        >
            <div className="space-y-2">
                <label
                    htmlFor="phone-number"
                    className="font-mono text-[10px] uppercase tracking-ribbon text-white/55"
                >
                    Dispatch phone number
                </label>
                <Input
                    id="phone-number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    placeholder="+1 (415) 555-0184"
                    startIcon={PhoneIcon}
                    className="h-12 border-white/10 bg-white/[0.02] font-mono text-base tracking-[0.04em] text-white"
                    disabled={isSaving}
                    required
                />
                <p className="text-xs leading-5 text-white/55">
                    Incoming Retell calls are routed by matching their caller
                    number to this stored number.
                </p>
            </div>

            {normalizedPreview ? (
                <div className="rounded-[3px] border border-sodium/30 bg-sodium/[0.05] px-4 py-3 font-mono text-[11px] tracking-[0.04em] text-sodium">
                    Stored as {normalizedPreview}
                </div>
            ) : null}

            {error ? (
                <div className="rounded-[3px] border border-signal/40 bg-signal/[0.06] px-4 py-3 text-sm text-signal">
                    {error}
                </div>
            ) : null}

            <Button
                type="submit"
                className="h-11 w-full rounded-[3px] bg-sodium font-mono text-[11px] uppercase tracking-console text-ink hover:bg-sodium-soft"
                disabled={isSaving}
            >
                <SaveIcon className="mr-2 size-3.5" />
                {isSaving
                    ? "Saving…"
                    : isRequired
                      ? "Save and open live console"
                      : "Save phone number"}
            </Button>
        </form>
    );
}
