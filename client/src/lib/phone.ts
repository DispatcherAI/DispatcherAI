const E164_PHONE_NUMBER = /^\+[1-9]\d{7,14}$/;

export function normalizePhoneNumber(value: string | null | undefined) {
    const rawValue = value?.trim();

    if (!rawValue) {
        return null;
    }

    const digits = rawValue.replace(/\D/g, "");

    if (!digits) {
        return null;
    }

    if (rawValue.startsWith("+")) {
        return `+${digits}`;
    }

    if (digits.length === 10) {
        return `+1${digits}`;
    }

    if (digits.length === 11 && digits.startsWith("1")) {
        return `+${digits}`;
    }

    return `+${digits}`;
}

export function isValidPhoneNumber(value: string | null | undefined) {
    const normalized = normalizePhoneNumber(value);

    return Boolean(normalized && E164_PHONE_NUMBER.test(normalized));
}

export function formatPhoneNumberForDisplay(value: string | null | undefined) {
    const normalized = normalizePhoneNumber(value);

    if (!normalized) {
        return "";
    }

    const usNumberMatch = normalized.match(/^\+1(\d{3})(\d{3})(\d{4})$/);

    if (!usNumberMatch) {
        return normalized;
    }

    return `+1 (${usNumberMatch[1]}) ${usNumberMatch[2]}-${usNumberMatch[3]}`;
}
