# DispatcherAI

DispatcherAI is a Next.js operator dashboard backed by a FastAPI service that
handles Retell voice-agent calls, live transcript updates, call analytics,
geocoding, and dashboard polling. Originally built in 36 hours for the UC
Berkeley AI Hackathon 2024, where it won grand prize plus the Intel,
LlamaIndex, Hume, and You.com track awards.

## Live Deployment & Links

- **Live deployment / case study:** https://dispatchai.art3m1s.me
- **Original hackathon submission:** https://devpost.com/software/dispatch-ai
- **Demo video (3 min):** https://www.youtube.com/watch?v=hdpdgxrilQM
- **Open-source model (Mistral 7B fine-tune):**
  https://huggingface.co/spikecodes/ai-911-operator
- **Open-source dataset (518 transcripts):**
  https://huggingface.co/datasets/spikecodes/911-call-transcripts
- **Design doc:** [`Design.md`](./Design.md) — design language, type system,
  color tokens, motion, and component catalog.

## Repository Layout

- `client/`: Next.js frontend for the dispatcher dashboard.
- `server/`: FastAPI backend, Retell integration, Prisma Python client, call
  analytics, geocoding, and webhook handling.
- `Dockerfile`: Cloud Run backend image definition.
- `.gcloudignore`: Cloud Run source deploy include/exclude rules.

## Backend Runtime

The backend entrypoint is `server.main:app`.

Local development:

```bash
uvicorn server.main:app --reload
```

Production runs on Google Cloud Run:

- Project: `spiritual-storm-469704-n2`
- Service: `dispatch`
- Region: `us-west1`
- Base URL: `https://dispatch-815644024160.us-west1.run.app`
- Cloud Run `status.url` alias: `https://dispatch-kkvf2gesjq-uw.a.run.app`
- Retell webhook:
  `https://dispatch-815644024160.us-west1.run.app/retell/webhook`
- Retell custom LLM websocket:
  `wss://dispatch-815644024160.us-west1.run.app/retell/llm-websocket`

## Required Backend Environment

Set these on Cloud Run before handling live calls:

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `RETELL_API_KEY`
- `RETELL_AGENT_ID`
- `RETELL_PHONE_NUMBER`
- `RETELL_WEBHOOK_SECRET`
- `GOOGLE_API_KEY`
- `HUME_API_KEY`

Do not commit `.env` files. `.gcloudignore` excludes local environment files
from source deploys.

To sync the local `server/.env` values into Cloud Run from PowerShell:

```powershell
$vars = @{}
Get-Content "server/.env" | ForEach-Object {
  if ($_ -match '^\s*([^#=]+)=(.*)$') {
    $key = $matches[1].Trim()
    $value = $matches[2].Trim().Trim('"')
    $vars[$key] = $value
  }
}

$envArg = '^|^DATABASE_URL=' + $vars['DATABASE_URL'] +
  '|OPENAI_API_KEY=' + $vars['OPENAI_API_KEY'] +
  '|RETELL_API_KEY=' + $vars['RETELL_API_KEY'] +
  '|RETELL_AGENT_ID=' + $vars['RETELL_AGENT_ID'] +
  '|RETELL_PHONE_NUMBER=' + $vars['RETELL_PHONE_NUMBER'] +
  '|RETELL_WEBHOOK_SECRET=' + $vars['RETELL_WEBHOOK_SECRET'] +
  '|GOOGLE_API_KEY=' + $vars['GOOGLE_API_KEY'] +
  '|HUME_API_KEY=' + $vars['HUME_API_KEY']

gcloud run services update dispatch `
  --project spiritual-storm-469704-n2 `
  --region us-west1 `
  --platform managed `
  --update-env-vars $envArg
```

The custom `^|^` delimiter avoids parsing failures for values that contain
characters such as `&`.

## Deploy Backend

Deploy from the repository root:

```bash
gcloud run deploy dispatch \
  --source . \
  --project spiritual-storm-469704-n2 \
  --region us-west1 \
  --platform managed \
  --allow-unauthenticated
```

The deploy uses:

- `Dockerfile` for the backend image.
- `.gcloudignore` to exclude the frontend, local virtualenvs, and secrets.
- Existing Cloud Run environment variables unless explicitly changed.

After deploy, verify the service:

```bash
gcloud run services describe dispatch \
  --project spiritual-storm-469704-n2 \
  --region us-west1 \
  --format="value(status.url,status.latestReadyRevisionName)"
```

The deploy command may print the canonical project-number URL
(`https://dispatch-815644024160.us-west1.run.app`) while `status.url` may return
the older `a.run.app` alias. Both route to the same Cloud Run service; Retell is
configured to the canonical project-number URL.

## Retell Agent Configuration

The Retell agent should point to the Cloud Run backend, not an ngrok or Koyeb
URL.

Use the SDK update shape below when changing the backend URL:

```python
import os
from dotenv import load_dotenv
from retell import Retell

load_dotenv("server/.env")

base_url = "https://dispatch-815644024160.us-west1.run.app"
websocket_url = base_url.replace("https://", "wss://") + "/retell/llm-websocket"
webhook_url = base_url + "/retell/webhook"

client = Retell(api_key=os.environ["RETELL_API_KEY"])
client.agent.update(
    os.environ["RETELL_AGENT_ID"],
    webhook_url=webhook_url,
    extra_body={
        "response_engine": {
            "type": "custom-llm",
            "llm_websocket_url": websocket_url,
        }
    },
)
```

Then confirm:

```python
agent = client.agent.retrieve(os.environ["RETELL_AGENT_ID"])
print(agent.response_engine)
print(agent.webhook_url)
```

Expected values:

- `response_engine.llm_websocket_url`:
  `wss://dispatch-815644024160.us-west1.run.app/retell/llm-websocket`
- `webhook_url`:
  `https://dispatch-815644024160.us-west1.run.app/retell/webhook`

## Call Flow

1. Retell connects to `/retell/llm-websocket/{call_id}`.
2. The backend receives `call_details`, finds the registered user, creates a
   `Call`, and creates an empty `CallAnalytics` row.
3. Retell sends transcript updates through websocket messages.
4. The backend responds to the caller immediately, then runs analytics in the
   background.
5. Analytics updates `CallAnalytics` with severity, title, summary,
   recommendation, location, latitude, longitude, and Street View data when
   available.
6. The frontend polls `/api/calls` and reflects active call analytics on the
   dashboard map and detail panels.
7. The Retell webhook handles lifecycle events, especially `call_ended`, as a
   backup source of truth for resolving calls.
