import re
from typing import Optional


E164_PHONE_NUMBER = re.compile(r"^\+[1-9]\d{7,14}$")


def normalize_phone_number(value: Optional[str]) -> Optional[str]:
    raw_value = value.strip() if value else ""

    if not raw_value:
        return None

    digits = re.sub(r"\D", "", raw_value)

    if not digits:
        return None

    if raw_value.startswith("+"):
        return f"+{digits}"

    if len(digits) == 10:
        return f"+1{digits}"

    if len(digits) == 11 and digits.startswith("1"):
        return f"+{digits}"

    return f"+{digits}"


def is_valid_phone_number(value: Optional[str]) -> bool:
    normalized = normalize_phone_number(value)

    return bool(normalized and E164_PHONE_NUMBER.match(normalized))
