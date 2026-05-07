"use client";

import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";

const VIDEO_ID = "hdpdgxrilQM";
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const POSTER_FALLBACK = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export function DemoVideo() {
    const [playing, setPlaying] = useState(false);

    return (
        <figure className="overflow-hidden rounded-[4px] border border-white/12 bg-ink-panel">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 text-sm">
                <span className="font-medium text-white/75">Product demo</span>
                <a
                    href={VIDEO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/55 transition hover:text-white"
                >
                    Watch on YouTube
                    <ExternalLink className="size-3.5" />
                </a>
            </div>

            <div className="relative aspect-video w-full bg-ink-deep">
                {playing ? (
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`}
                        title="DispatchAI product demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 size-full"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label="Play DispatchAI product demo"
                        className="group absolute inset-0 size-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sodium"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={POSTER}
                            onError={(e) => {
                                const img = e.currentTarget;
                                if (img.src !== POSTER_FALLBACK) {
                                    img.src = POSTER_FALLBACK;
                                }
                            }}
                            alt="DispatchAI product demo poster"
                            className="absolute inset-0 size-full object-cover transition group-hover:scale-[1.01]"
                            loading="lazy"
                        />
                        <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="flex size-20 items-center justify-center rounded-full border border-white/20 bg-ink/55 backdrop-blur-md transition group-hover:scale-105 group-hover:border-white/40 group-hover:bg-ink/75 sm:size-24">
                                <Play
                                    className="ml-1 size-7 fill-white text-white sm:size-9"
                                    strokeWidth={1}
                                />
                            </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 px-5 py-4 text-left">
                            <p className="font-display text-base leading-tight text-white sm:text-lg">
                                DispatchAI &mdash; AI-powered 911 response, in
                                60 seconds.
                            </p>
                            <p className="mt-1 text-sm text-white/65">
                                Click to play
                            </p>
                        </div>
                    </button>
                )}
            </div>

            <figcaption className="border-t border-white/10 px-6 py-4 text-sm leading-6 text-white/60">
                The submission video shown to the panel: an end-to-end run from
                911 inbound through Twilio &rarr; Retell &rarr; FastAPI &rarr;
                Mistral, surfacing a live transcript, emotion read, and dossier
                in the operator console.
            </figcaption>
        </figure>
    );
}
