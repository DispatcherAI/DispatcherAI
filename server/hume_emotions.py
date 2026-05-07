"""Hume Expression Measurement integration for the Retell pipeline.

Scores the latest user utterance's text via Hume's `language` model over a
streaming websocket. Returns the same shape the OpenAI emotion eval was
producing so `CallAnalytics.sentiment` and the frontend stay unchanged:

    [{"emotion": "anger", "intensity": 0.83}, ...]

Callers should treat any raised exception as "fall back to a different
provider" — see `server.evals.emotion_eval`.
"""

import asyncio
import os
from typing import Dict, FrozenSet, List

from hume import AsyncHumeClient
from hume.expression_measurement.stream import Config
from hume.expression_measurement.stream.socket_client import StreamConnectOptions
from hume.expression_measurement.stream.types import StreamLanguage


# Curated subset of Hume's 53 emotions that are useful for 911 dispatch triage.
# Matches the list the previous OpenAI eval prompt was restricted to so the
# downstream UI contract (sentiment chips, sorting) stays identical.
DISPATCH_RELEVANT_EMOTIONS: FrozenSet[str] = frozenset(
    {
        "anger",
        "anxiety",
        "calmness",
        "concentration",
        "confusion",
        "distress",
        "fear",
        "horror",
        "pain",
        "sadness",
    }
)

# Hume streaming language calls usually return in <1s. Cap aggressively so a
# bad connection can't stall the per-turn analytics task.
HUME_REQUEST_TIMEOUT_SECONDS = 5.0


async def hume_language_emotion(
    text: str,
    *,
    top_n: int = 3,
    relevant_emotions: FrozenSet[str] = DISPATCH_RELEVANT_EMOTIONS,
) -> List[Dict[str, float]]:
    """Score `text` via Hume's Expression Measurement language model.

    Returns up to `top_n` entries shaped {"emotion": str, "intensity": float},
    sorted by intensity descending. Emotion names are lowercased to match the
    existing OpenAI eval contract the frontend already consumes.

    Raises whatever the Hume SDK raises on transport/auth errors, plus
    `asyncio.TimeoutError` when Hume doesn't respond in time. The caller is
    expected to fall back to another provider on exception.
    """
    if not text or not text.strip():
        return []

    api_key = os.environ["HUME_API_KEY"]

    client = AsyncHumeClient(api_key=api_key)
    options = StreamConnectOptions(
        config=Config(language=StreamLanguage(granularity="sentence"))
    )

    return await asyncio.wait_for(
        _score_text(client, options, text, relevant_emotions, top_n),
        timeout=HUME_REQUEST_TIMEOUT_SECONDS,
    )


async def _score_text(
    client: AsyncHumeClient,
    options: StreamConnectOptions,
    text: str,
    relevant_emotions: FrozenSet[str],
    top_n: int,
) -> List[Dict[str, float]]:
    async with client.expression_measurement.stream.connect(options=options) as socket:
        result = await socket.send_text(text)

    predictions = (
        getattr(getattr(result, "language", None), "predictions", None) or []
    )

    # Peak-pool each emotion across all sentence-level predictions so a single
    # high-intensity moment in a multi-sentence utterance isn't averaged away.
    peak: Dict[str, float] = {}
    for prediction in predictions:
        for emotion in getattr(prediction, "emotions", []) or []:
            name = getattr(emotion, "name", "").lower()
            if name not in relevant_emotions:
                continue
            score = float(getattr(emotion, "score", 0.0))
            if score > peak.get(name, 0.0):
                peak[name] = score

    ranked = sorted(peak.items(), key=lambda item: item[1], reverse=True)
    return [{"emotion": name, "intensity": score} for name, score in ranked[:top_n]]
