#!/usr/bin/env python3
"""Pre-bake Google Street View imagery for the case-study cockpit preview.

Calls Google's Street View Static API once for each incident shown in
client/src/components/case-study/CockpitPreview.tsx and saves the JPEG
to client/public/street-view/<id>.jpg. The cockpit references those static
paths at runtime, so the case study works in environments without
GOOGLE_API_KEY (preview deployments, local dev without the secret, etc).

Usage (from repo root):
    python server/scripts/download_streetview.py

Requires GOOGLE_API_KEY in the environment, or in server/.env if
python-dotenv is installed (matches server/main.py loading). Re-run after
changing the preview incidents.
"""

from __future__ import annotations

import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Optional

try:
    from dotenv import load_dotenv

    load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / ".env")
    load_dotenv()
except ImportError:
    pass

REPO_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = REPO_ROOT / "client" / "public" / "street-view"
STREET_VIEW_URL = "https://maps.googleapis.com/maps/api/streetview"


@dataclass(frozen=True)
class StreetViewSpec:
    name: str
    lat: float
    lng: float
    # 16:10 to match the preview's aspect-[16/10] image slot. 1024x640
    # gives a crisp render on retina without bloating the bundle.
    size: str = "1024x640"
    heading: Optional[float] = None
    pitch: Optional[float] = None
    fov: Optional[float] = None


# Keep this in sync with the incidents in CockpitPreview.tsx.
INCIDENTS: tuple[StreetViewSpec, ...] = (
    StreetViewSpec(name="golden-gate", lat=37.8199109, lng=-122.4785598),
    StreetViewSpec(name="synthetic-medical", lat=37.7599, lng=-122.4148),
    StreetViewSpec(name="synthetic-fire", lat=37.7785, lng=-122.4034),
)


def build_url(spec: StreetViewSpec, api_key: str) -> str:
    params: dict[str, str] = {
        "size": spec.size,
        "location": f"{spec.lat},{spec.lng}",
        "key": api_key,
        "return_error_code": "true",
    }
    for key in ("heading", "pitch", "fov"):
        value = getattr(spec, key)
        if value is not None:
            params[key] = str(value)
    return f"{STREET_VIEW_URL}?{urllib.parse.urlencode(params)}"


def fetch(spec: StreetViewSpec, api_key: str) -> bytes:
    url = build_url(spec, api_key)
    req = urllib.request.Request(
        url, headers={"User-Agent": "DispatcherAI/streetview-bake"}
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        content_type = resp.headers.get("content-type", "")
        body = resp.read()
    if not content_type.startswith("image/"):
        raise RuntimeError(
            f"Street View returned non-image response: {content_type!r} "
            f"{body[:200]!r}"
        )
    return body


def write(spec: StreetViewSpec, payload: bytes) -> Path:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / f"{spec.name}.jpg"
    path.write_bytes(payload)
    return path


def run(specs: Iterable[StreetViewSpec] = INCIDENTS) -> int:
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print(
            "ERROR: GOOGLE_API_KEY is not set. Add it to server/.env or "
            "your shell environment before re-running.",
            file=sys.stderr,
        )
        return 1

    print(f"Saving Street View images to {OUTPUT_DIR.relative_to(REPO_ROOT)}")
    failures = 0
    for spec in specs:
        try:
            payload = fetch(spec, api_key)
            path = write(spec, payload)
            rel = path.relative_to(REPO_ROOT)
            print(
                f"  OK   {spec.name:<22}  {len(payload):>7,} bytes   {rel}"
            )
        except urllib.error.HTTPError as exc:
            failures += 1
            print(
                f"  FAIL {spec.name:<22}  HTTP {exc.code}: {exc.reason}",
                file=sys.stderr,
            )
        except Exception as exc:
            failures += 1
            print(f"  FAIL {spec.name:<22}  {exc}", file=sys.stderr)
    return 0 if failures == 0 else 2


if __name__ == "__main__":
    sys.exit(run())
