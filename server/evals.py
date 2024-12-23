import dotenv

dotenv.load_dotenv()
from openai import AsyncOpenAI

import os
import websockets
import json
from pydantic import ValidationError, BaseModel
from typing import Literal, List

websocket_url = f"wss://api.hume.ai/v0/stream/models"

HUME_API_KEY = os.getenv("HUME_API_KEY")

# Using the pydantic model defined above
class DispatchEval(BaseModel):
    recommendation: str
    severity: Literal["Low", "Medium", "High", "Critical"]
    type: Literal["Fire", "Medical", "Police"]
    name: str
    title: str
    summary: str
    location_name: str
    topics: List[str]


async def eval(message: str, current_data: str):
    client = AsyncOpenAI()
    system_message = """
    You are an ai system to evaluate 911 transcripts. You should analyze the calls for their severity, type, name, type, title, summary, topics, and location.
    
    You are given the following data:
    Last message spoken by the user.
    
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
    
    # Construct the prompt for the user message + current data
    user_content = (
        f"User message: {message}\n\n"
        f"Current Data:\n\n{current_data}"
    )
    
    predicted_output = {
        "type": "content",
        "content": """
{
  "recommendation": "",
  "severity": "",
  "type": "",
  "name": "",
  "title": "",
  "summary": "",
  "location_name": "",
  "topics": []
}
""".strip()
    }


    try:
        # Make the request with structured outputs
        completion = await client.beta.chat.completions.parse(
            model="gpt-4o",  # or another GPT-4o model snapshot with structured outputs
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_content},
            ],
            response_format=DispatchEval,     # Our Pydantic schema
            prediction=predicted_output,      # Optional predicted output
        )

        # The model may refuse (for safety reasons) or produce valid data
        if completion.choices[0].message.refusal:
            # Model gave us a refusal
            return {
                "error": "Request was refused for safety reasons.",
                "refusal": completion.choices[0].message.refusal
            }
        else:
            # All good — parse out the typed data
            result: DispatchEval = completion.choices[0].message.parsed
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


async def hume_eval(message: str):
    async with websockets.connect(
        websocket_url, extra_headers={"X-Hume-Api-Key": HUME_API_KEY}
    ) as websocket:
        await websocket.send(
            json.dumps({"data": message, "models": {"language": {}}, "raw_text": True})
        )
        data = await websocket.recv()
        response_data = json.loads(data)
        emotions_data = response_data.get("language", {}).get("predictions", [])
        emotion_scores = {}
        total_words = len(emotions_data)

        for word_data in emotions_data:
            word_emotions = word_data.get("emotions", [])
            for emotion in word_emotions:
                if emotion["name"].lower() in interesting_emotions:
                    if emotion["name"] in emotion_scores:
                        emotion_scores[emotion["name"]] += emotion["score"]
                    else:
                        emotion_scores[emotion["name"]] = emotion["score"]

        # Calculating average scores
        for emotion in emotion_scores:
            emotion_scores[emotion] /= total_words

        # Sorting and selecting the top three emotions for the entire text chunk
        top_three_overall_emotions = sorted(
            emotion_scores.items(), key=lambda item: item[1], reverse=True
        )[:3]

        # Format the result according to the specified structure
        formatted_result = [
            {"emotion": emotion, "intensity": score}
            for emotion, score in top_three_overall_emotions
        ]

        return formatted_result
