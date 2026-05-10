import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const runtime = "edge";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background:
                        "radial-gradient(circle at 28% 22%, #1A1A1F 0%, #0A0B0D 60%)",
                    borderRadius: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 36,
                        background:
                            "radial-gradient(circle at 32% 26%, rgba(244,176,31,0.22), transparent 55%)",
                    }}
                />
                <svg
                    width="116"
                    height="116"
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
                    <circle cx="12" cy="12" r="1.1" fill="#FF3B30" />
                </svg>
                <div
                    style={{
                        position: "absolute",
                        left: 16,
                        right: 16,
                        bottom: 14,
                        height: 2,
                        background:
                            "linear-gradient(90deg, transparent, rgba(244,176,31,0.6), transparent)",
                    }}
                />
            </div>
        ),
        size,
    );
}
