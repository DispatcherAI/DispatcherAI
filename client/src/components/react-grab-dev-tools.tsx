"use client";

import { useEffect } from "react";

export function ReactGrabDevTools() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "development") return;

        let cancelled = false;

        (async () => {
            await import("react-grab");
            if (cancelled) return;
            try {
                const { attachMcpPlugin } = await import("@react-grab/mcp/client");
                await attachMcpPlugin();
            } catch (err) {
                console.warn(
                    "[react-grab/mcp] client plugin not attached:",
                    (err as Error)?.message,
                );
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return null;
}
