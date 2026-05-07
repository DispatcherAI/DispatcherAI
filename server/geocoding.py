import googlemaps
from datetime import datetime
import os
import requests
import base64

gmaps = googlemaps.Client(key=os.environ["GOOGLE_API_KEY"])


def geocode(address: str):
    return gmaps.geocode(address)


def street_view(lat, lon):
    url = f"https://maps.googleapis.com/maps/api/streetview?size=700x400&location={lat},{lon}&return_error_code=true&key={os.environ['GOOGLE_API_KEY']}"
    img = requests.get(url, timeout=10)
    content_type = img.headers.get("content-type", "")
    img.raise_for_status()
    if not content_type.startswith("image/"):
        raise ValueError(f"Street View returned non-image content: {content_type}")
    return base64.b64encode(img.content).decode("utf-8")
