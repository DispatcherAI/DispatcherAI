"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";

interface CallRow {
    id: string;
    type?: string;
    createdAt?: string;
    duration?: number;
    waitTime?: number;
    severity?: string;
    status?: string;
    callAnalytics?: {
        type?: string;
        severity?: string;
        title?: string;
    };
}

const SEVERITY_TONE: Record<string, string> = {
    Critical: "border-signal/40 bg-signal/[0.06] text-signal",
    High: "border-signal/40 bg-signal/[0.06] text-signal",
    Medium: "border-sodium/40 bg-sodium/[0.06] text-sodium",
    Low: "border-phosphor/40 bg-phosphor/[0.06] text-phosphor",
};

function severityChip(severity?: string | null) {
    if (!severity) return "border-white/15 bg-white/[0.02] text-white/55";
    const cap = severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();
    return SEVERITY_TONE[cap] ?? "border-white/15 bg-white/[0.02] text-white/55";
}

const LogTable = () => {
    const [calls, setCalls] = useState<CallRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        axios
            .get("/api/calls")
            .then((response) => {
                setCalls(response.data ?? []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch calls", err);
                setError("Failed to fetch calls");
                setLoading(false);
            });
    }, []);

    return (
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[4px] border border-white/10 bg-ink-panel">
            <header className="flex items-center justify-between border-b border-white/8 px-5 py-3">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-ribbon text-sodium">
                        Call history
                    </p>
                    <h1 className="mt-1 font-display text-xl text-white">
                        Raw call log
                    </h1>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                    {loading
                        ? "Loading…"
                        : error
                          ? "Error"
                          : `${calls.length.toString().padStart(3, "0")} entries`}
                </span>
            </header>

            {error ? (
                <div className="border-t border-signal/30 bg-signal/[0.05] px-5 py-3 font-mono text-[11px] tracking-[0.04em] text-signal">
                    {error}
                </div>
            ) : null}

            <Table>
                <TableHeader>
                    <TableRow className="border-white/8 hover:bg-transparent">
                        <TableHead className="w-[180px] font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                            ID
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                            Type
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                            Time
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                            Duration
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                            Wait
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                            Severity
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase tracking-ribbon text-white/55">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow className="border-white/8">
                            <TableCell
                                colSpan={7}
                                className="py-10 text-center font-mono text-[11px] uppercase tracking-ribbon text-white/45"
                            >
                                Connecting to /api/calls…
                            </TableCell>
                        </TableRow>
                    ) : calls.length === 0 && !error ? (
                        <TableRow className="border-white/8">
                            <TableCell
                                colSpan={7}
                                className="py-10 text-center font-mono text-[11px] uppercase tracking-ribbon text-white/45"
                            >
                                No calls recorded
                            </TableCell>
                        </TableRow>
                    ) : (
                        calls.map((call) => (
                            <TableRow
                                key={call.id}
                                className="border-white/8 hover:bg-white/[0.02]"
                            >
                                <TableCell className="font-mono text-[11px] tracking-[0.04em] text-white/65">
                                    {call.id?.slice(0, 16) ?? "—"}…
                                </TableCell>
                                <TableCell className="font-mono text-[12px] text-white">
                                    {call.callAnalytics?.type ??
                                        call.type ??
                                        "—"}
                                </TableCell>
                                <TableCell className="font-mono text-[11px] text-white/65">
                                    {call.createdAt
                                        ? new Date(call.createdAt).toLocaleString()
                                        : "—"}
                                </TableCell>
                                <TableCell className="font-mono text-[11px] text-white/65">
                                    {call.duration ?? "—"}
                                </TableCell>
                                <TableCell className="font-mono text-[11px] text-white/65">
                                    {call.waitTime ?? "—"}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`stamp ${severityChip(
                                            call.callAnalytics?.severity ??
                                                call.severity,
                                        )}`}
                                    >
                                        {call.callAnalytics?.severity ??
                                            call.severity ??
                                            "—"}
                                    </span>
                                </TableCell>
                                <TableCell className="font-mono text-[11px] uppercase tracking-ribbon text-white/65">
                                    {call.status ?? "—"}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default LogTable;
