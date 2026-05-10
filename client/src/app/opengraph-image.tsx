import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
    "DispatchAI — empathetic AI for 911. Grand prize, UC Berkeley AI Hackathon 2024.";
export const runtime = "edge";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "#0A0B0D",
                    color: "#F4EFE6",
                    fontFamily:
                        "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
                    position: "relative",
                    padding: "72px 80px",
                }}
            >
                {/* Background atmosphere */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(circle at 14% 18%, rgba(244,176,31,0.14), transparent 45%), radial-gradient(circle at 88% 88%, rgba(105,210,255,0.10), transparent 50%)",
                    }}
                />
                {/* Hairline grid */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        maskImage:
                            "linear-gradient(180deg, black, transparent 80%)",
                    }}
                />

                {/* Top row: brand + meta */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <div
                            style={{
                                width: 52,
                                height: 52,
                                borderRadius: 8,
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "radial-gradient(circle at 30% 25%, rgba(244,176,31,0.28), transparent 55%)",
                                }}
                            />
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
                                    stroke="#F4B01F"
                                    strokeWidth="1.6"
                                    strokeLinecap="square"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="3.4"
                                    stroke="#F4EFE6"
                                    strokeWidth="1.4"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="1.1"
                                    fill="#FF3B30"
                                />
                            </svg>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                lineHeight: 1.05,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 28,
                                    fontWeight: 600,
                                    letterSpacing: "-0.01em",
                                    color: "#F4EFE6",
                                }}
                            >
                                DispatchAI
                            </div>
                            <div
                                style={{
                                    marginTop: 6,
                                    fontFamily:
                                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                                    fontSize: 13,
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: "rgba(244,239,230,0.55)",
                                }}
                            >
                                Case study · 2024
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "8px 14px",
                            border: "1px solid rgba(244,176,31,0.35)",
                            background: "rgba(244,176,31,0.06)",
                            borderRadius: 999,
                            color: "#F4B01F",
                            fontFamily:
                                "ui-monospace, SFMono-Regular, Menlo, monospace",
                            fontSize: 14,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 999,
                                background: "#F4B01F",
                            }}
                        />
                        Grand prize · Berkeley AI Hackathon
                    </div>
                </div>

                {/* Headline */}
                <div
                    style={{
                        position: "relative",
                        marginTop: 96,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            fontFamily:
                                "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
                            fontSize: 96,
                            fontWeight: 500,
                            lineHeight: 1.02,
                            letterSpacing: "-0.02em",
                            color: "#F4EFE6",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span>An empathetic AI dispatcher</span>
                        <span style={{ color: "rgba(244,239,230,0.55)" }}>
                            for 911 emergency calls.
                        </span>
                    </div>
                    <div
                        style={{
                            marginTop: 36,
                            fontSize: 28,
                            lineHeight: 1.4,
                            color: "rgba(244,239,230,0.7)",
                            maxWidth: 920,
                            display: "flex",
                        }}
                    >
                        Real-time triage, transcription, and emotional context
                        — built in 36 hours, awarded grand prize at UC Berkeley
                        AI Hackathon 2024.
                    </div>
                </div>

                {/* Bottom rule + footer */}
                <div
                    style={{
                        position: "absolute",
                        left: 80,
                        right: 80,
                        bottom: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, monospace",
                        fontSize: 16,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(244,239,230,0.55)",
                    }}
                >
                    <div style={{ display: "flex", gap: 28 }}>
                        <span>Twilio</span>
                        <span style={{ color: "rgba(244,239,230,0.25)" }}>
                            ·
                        </span>
                        <span>Retell</span>
                        <span style={{ color: "rgba(244,239,230,0.25)" }}>
                            ·
                        </span>
                        <span>FastAPI</span>
                        <span style={{ color: "rgba(244,239,230,0.25)" }}>
                            ·
                        </span>
                        <span>Mistral 7B</span>
                        <span style={{ color: "rgba(244,239,230,0.25)" }}>
                            ·
                        </span>
                        <span>Hume EVI</span>
                    </div>
                    <span>dispatch-ai · case study</span>
                </div>

                {/* Sodium underline accent */}
                <div
                    style={{
                        position: "absolute",
                        left: 80,
                        right: 80,
                        bottom: 56,
                        height: 1,
                        background:
                            "linear-gradient(90deg, transparent, rgba(244,176,31,0.45), transparent)",
                    }}
                />
            </div>
        ),
        size,
    );
}
