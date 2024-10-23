import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import axios from "axios";

const logTable = () => {
    const [calls, setCalls] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(String);

    // fetch data from API
    useEffect(() => {
        axios
            .get("/api/calls")
            .then((response: any) => {
                setCalls(response.data);
                setLoading(false);
            })
            .catch((error: any) => {
                console.error("Failed to fetch calls", error);
                setError("Failed to fetch calls");
            });
    }, []);

    if (loading) return <div>"Loading..."</div>;
    if (error) return <div>{error}</div>;
    return (
        <Table className = "outline outline-1 p-2 m-2 w-full ">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Wait Time</TableHead>
                    <TableHead>Severity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {calls.map(call  => (
                    <TableRow key = {call.id} className="dark:bg-[color:var(--card)]">
                      <TableCell>{call.id}</TableCell>
                      <TableCell>{call.type}</TableCell>
                      <TableCell>{call.createdAt}</TableCell>
                      <TableCell>{call.duration}</TableCell>
                      <TableCell>{call.waitTime}</TableCell>
                      <TableCell>{call.severity}</TableCell>
                      <TableCell>{call.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default logTable;
