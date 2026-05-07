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
            : ""
    );
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const normalizedPreview = useMemo(
        () => normalizePhoneNumber(phoneNumber),
        [phoneNumber]
    );

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            const response = await fetch("/api/user/phone", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
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
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-dp-headingText"
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
                    className="h-12 border-white/10 bg-white/[0.03] text-base"
                    disabled={isSaving}
                    required
                />
                <p className="text-xs leading-5 text-dp-text">
                    Incoming Retell calls are routed by matching their caller
                    number to this stored number.
                </p>
            </div>

            {normalizedPreview ? (
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs text-dp-primary">
                    Stored as {normalizedPreview}
                </div>
            ) : null}

            {error ? (
                <div className="rounded-xl border border-dp-critical/30 bg-dp-critical/10 px-4 py-3 text-sm text-dp-critical">
                    {error}
                </div>
            ) : null}

            <Button
                type="submit"
                className="h-11 w-full rounded-xl text-sm"
                disabled={isSaving}
            >
                <SaveIcon className="mr-2 size-4" />
                {isSaving
                    ? "Saving..."
                    : isRequired
                      ? "Save and open live dispatch"
                      : "Save phone number"}
            </Button>
        </form>
    );
}
