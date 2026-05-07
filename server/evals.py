import os
import dotenv

dotenv.load_dotenv()
from openai import AsyncOpenAI

from pydantic import BaseModel, ConfigDict, ValidationError
from typing import Literal, List

OPENAI_ANALYTICS_MODEL = "gpt-5-mini"
OPENAI_MINIMAL_REASONING = {"effort": "minimal"}


# Using the pydantic model defined above
class DispatchEval(BaseModel):
    model_config = ConfigDict(extra="forbid")

    recommendation: str
    severity: Literal["", "Low", "Medium", "High", "Critical"]
    type: Literal["", "Fire", "Medical", "Police"]
    name: str
    title: str
    summary: str
    location_name: str
    topics: List[str]
    
class Message(BaseModel):
    role: Literal["user", "agent"]
    content: str
    

class EmotionScore(BaseModel):
    model_config = ConfigDict(extra="forbid")

    emotion: str
    intensity: float


class EmotionEval(BaseModel):
    model_config = ConfigDict(extra="forbid")

    emotions: List[EmotionScore]


def _text_format(model: type[BaseModel], name: str):
    return {
        "type": "json_schema",
        "name": name,
        "schema": model.model_json_schema(),
        "strict": True,
    }


def _message_field(message, field: str):
    if isinstance(message, dict):
        return message.get(field, "")
    return getattr(message, field, "")




async def eval(transcript: List[Message], current_data: str):
    client = AsyncOpenAI()
    system_message = """
    You are an ai system to evaluate 911 transcripts. You should analyze the calls for their severity, type, name, type, title, summary, topics, and location.
    
    You are given the following data:
    The transcript of the call to the current point.
    
    Current data processed from previous evaluations:
    
    Follow these rules:
        If not enough information is provided, set values to empty strings.
        If no new information is provided, use the current data.
        The title should be a short description of the call.
        Always have a title, even if its "Not enough information provided"
        The audio transcription is sometimes not perfect, try to make your best guess.
        
    Output a json in the following format:
    {
        "recommendation": str,
        "severity": "Low" | "Medium" | "High" | "Critical",
        "type": "Fire" | "Medical" | "Police",
        "name": str,
        "title": str,
        "summary": str,
        "location_name": str,
        "topics": list[str]
    }
    """
    
    constructed_content = "\n".join(
        [
            f"{_message_field(message, 'role')}: {_message_field(message, 'content')}"
            for message in transcript
        ]
    )
    
    # Construct the prompt for the user message + current data
    user_content = (
        f"Transcript:\n\n{constructed_content}\n\n"
        f"Current Data:\n\n{current_data}"
    )


    try:
        response = await client.responses.create(
            model=OPENAI_ANALYTICS_MODEL,
            input=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_content},
            ],
            reasoning=OPENAI_MINIMAL_REASONING,
            text={"format": _text_format(DispatchEval, "dispatch_eval")},
        )

        result = DispatchEval.model_validate_json(response.output_text)
        print("Eval result", result.model_dump(), "\n")
        return result.model_dump()

    except ValidationError as e:
        # The model returned JSON that failed Pydantic validation
        return {
            "error": "The model returned invalid data for our schema.",
            "details": str(e),
        }
    except Exception as e:
        return {
            "error": "An unexpected error occurred.",
            "details": str(e),
        }


interesting_emotions = [
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
]


async def emotion_eval(message: str):
    """Score the latest utterance for dispatch-relevant emotions.

    Prefers Hume's Expression Measurement language model when ``HUME_API_KEY``
    is configured — that's the integration the project was originally built
    around. Falls back to the OpenAI scorer when Hume is unavailable so local
    dev still works without a Hume key.
    """
    if os.getenv("HUME_API_KEY"):
        try:
            from server.hume_emotions import hume_language_emotion

            return await hume_language_emotion(message)
        except Exception as exc:
            print(
                f"[emotion_eval] Hume scoring failed, falling back to OpenAI: {exc!r}"
            )

    return await _openai_emotion_eval(message)


async def _openai_emotion_eval(message: str):
    client = AsyncOpenAI()
    system_message = f"""
    Analyze the latest caller message from a 911 dispatch transcript.

    Return up to three emotions that are most useful for dispatch triage. Use only
    these emotion names: {", ".join(interesting_emotions)}.

    Intensity must be a number from 0 to 1. If there is no useful emotional signal,
    return an empty emotions list.
    """

    try:
        response = await client.responses.create(
            model=OPENAI_ANALYTICS_MODEL,
            input=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": message},
            ],
            reasoning=OPENAI_MINIMAL_REASONING,
            text={"format": _text_format(EmotionEval, "emotion_eval")},
        )
        result = EmotionEval.model_validate_json(response.output_text)
        return [emotion.model_dump() for emotion in result.emotions]
    except Exception as e:
        return {
            "error": "An unexpected error occurred.",
            "details": str(e),
        }


async def hume_eval(message: str):
    return await emotion_eval(message)
