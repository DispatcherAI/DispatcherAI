import { Mermaid } from "./Mermaid";

const CHART = `flowchart LR
    Caller["<span class='title'>Caller</span><span class='sub'>911 inbound</span>"]:::signal
    Twilio["<span class='title'>Twilio</span><span class='sub'>Telephony</span>"]
    Retell["<span class='title'>Retell</span><span class='sub'>Voice agent · WS</span>"]:::sodium
    Hume["<span class='title'>Hume EVI</span><span class='sub'>Emotion</span>"]
    FastAPI["<span class='title'>FastAPI</span><span class='sub'>Orchestrator</span>"]:::phosphor
    Mistral["<span class='title'>Mistral-7B</span><span class='sub'>Intel Dev Cloud · IPEX</span>"]:::sodium
    Maps["<span class='title'>Google Maps</span><span class='sub'>Geocode + street view</span>"]
    Operator["<span class='title'>Operator</span><span class='sub'>Next.js cockpit</span>"]

    Caller -- "audio" --> Twilio
    Twilio -- "stream" --> Retell
    Retell -- "custom-llm" --> FastAPI
    FastAPI -- "ws / pcm" --> Hume
    FastAPI -- "prompt → tokens" --> Mistral
    FastAPI -- "geocode" --> Maps
    FastAPI -- "JSON" --> Operator

    classDef signal stroke:#FF3B30,stroke-width:1.5px;
    classDef sodium stroke:#F4B01F,stroke-width:1.5px;
    classDef phosphor stroke:#7BFFB2,stroke-width:1.5px;
`;

export function SystemDiagram() {
    return (
        <figure className="overflow-hidden rounded-[4px] border border-white/12 bg-ink-panel">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 text-sm">
                <span className="font-medium text-white/75">
                    System architecture
                </span>
                <span className="hidden text-white/45 md:inline">
                    Telephony &middot; Voice agent &middot; Inference &middot;
                    Operator
                </span>
            </div>
            <div className="overflow-x-auto p-6 sm:p-8">
                <Mermaid
                    chart={CHART}
                    className="mx-auto max-w-[1080px] [&_svg]:!h-auto [&_svg]:!max-w-full"
                    minHeight={300}
                />
            </div>
            <figcaption className="border-t border-white/10 px-6 py-4 text-sm leading-6 text-white/60">
                The caller reaches Twilio; Retell runs the voice agent over a
                websocket against the FastAPI orchestrator. FastAPI streams
                audio to Hume EVI for emotion, prompts the Mistral-7B LoRA on
                Intel Dev Cloud, and pushes geocoded incidents to the Next.js
                operator cockpit. A human dispatcher remains the final authority
                on dispatch.
            </figcaption>
        </figure>
    );
}
