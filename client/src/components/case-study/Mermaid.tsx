"use client";

import { useEffect, useId, useState } from "react";

type MermaidProps = {
    chart: string;
    className?: string;
    minHeight?: number;
};

export function Mermaid({ chart, className, minHeight = 280 }: MermaidProps) {
    const rawId = useId();
    const id = `mmd-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
    const [svg, setSvg] = useState<string>("");
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const mermaid = (await import("mermaid")).default;
                mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: "antiscript",
                    theme: "base",
                    fontFamily: "var(--font-mono), ui-monospace, monospace",
                    flowchart: {
                        curve: "basis",
                        htmlLabels: true,
                        nodeSpacing: 56,
                        rankSpacing: 64,
                        padding: 12,
                        useMaxWidth: true,
                    },
                    themeVariables: {
                        background: "transparent",
                        primaryColor: "#0E1116",
                        primaryBorderColor: "rgba(255,255,255,0.18)",
                        primaryTextColor: "#FFFFFF",
                        secondaryColor: "#13171B",
                        tertiaryColor: "#0E1116",
                        nodeBorder: "rgba(255,255,255,0.18)",
                        clusterBkg: "rgba(255,255,255,0.02)",
                        clusterBorder: "rgba(255,255,255,0.12)",
                        lineColor: "rgba(244,176,31,0.55)",
                        edgeLabelBackground: "#0E1116",
                        textColor: "#FFFFFF",
                        nodeTextColor: "#FFFFFF",
                        titleColor: "#FFFFFF",
                        mainBkg: "#0E1116",
                        fontSize: "13px",
                    },
                    themeCSS: `
                        .node rect, .node polygon, .node circle, .node ellipse, .node path {
                            stroke-width: 1px;
                            rx: 3;
                            ry: 3;
                        }
                        .node .label {
                            font-family: var(--font-mono), ui-monospace, monospace;
                            color: #fff;
                        }
                        .nodeLabel {
                            color: #fff !important;
                            line-height: 1.35;
                        }
                        .nodeLabel .title {
                            font-family: var(--font-display), serif;
                            font-size: 14px;
                            font-weight: 500;
                            letter-spacing: -0.01em;
                            color: #fff;
                        }
                        .nodeLabel .sub {
                            display: block;
                            margin-top: 2px;
                            font-family: var(--font-mono), ui-monospace, monospace;
                            font-size: 9.5px;
                            letter-spacing: 0.18em;
                            text-transform: uppercase;
                            color: rgba(255,255,255,0.55);
                        }
                        .edgeLabel, .edgeLabel p {
                            background: #0E1116 !important;
                            color: rgba(255,255,255,0.7) !important;
                            font-family: var(--font-mono), ui-monospace, monospace;
                            font-size: 9.5px;
                            letter-spacing: 0.16em;
                            text-transform: uppercase;
                            padding: 2px 6px;
                            border-radius: 2px;
                        }
                        .edgePath path {
                            stroke-width: 1.2px;
                        }
                        .marker {
                            fill: rgba(244,176,31,0.7);
                            stroke: rgba(244,176,31,0.7);
                        }
                        .accent-sodium > rect, .accent-sodium > polygon, .accent-sodium > path {
                            stroke: #F4B01F !important;
                            stroke-width: 1.5px !important;
                        }
                        .accent-signal > rect, .accent-signal > polygon, .accent-signal > path {
                            stroke: #FF3B30 !important;
                            stroke-width: 1.5px !important;
                        }
                        .accent-phosphor > rect, .accent-phosphor > polygon, .accent-phosphor > path {
                            stroke: #7BFFB2 !important;
                            stroke-width: 1.5px !important;
                        }
                        .dashed > .path {
                            stroke-dasharray: 4 4 !important;
                        }
                    `,
                });

                const { svg } = await mermaid.render(id, chart);
                if (!cancelled) setSvg(svg);
            } catch (e) {
                if (!cancelled)
                    setErr((e as Error)?.message ?? "Mermaid render failed");
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [chart, id]);

    if (err) {
        return (
            <div className="px-6 py-8 font-mono text-[11px] uppercase tracking-ribbon text-signal/80">
                Diagram failed to render: {err}
            </div>
        );
    }

    return (
        <div
            className={className}
            style={{ minHeight }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
