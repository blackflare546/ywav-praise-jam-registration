"use client";

import { useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

type ScanStatus =
    | "idle"
    | "loading"
    | "success"
    | "already"
    | "not_found"
    | "error";

export default function QRScanner() {
    const [status, setStatus] = useState<ScanStatus>("idle");
    const [message, setMessage] = useState("📷 Ready to scan a QR Code");
    const [lastScan, setLastScan] = useState("");

    const audioRef = useRef<HTMLAudioElement>(null);

    async function processScan(qr: string) {
        if (!qr) return;

        // Prevent duplicate scans while processing
        if (status === "loading") return;

        // Ignore the same QR for a few seconds
        if (qr === lastScan) return;

        setStatus("loading");
        setLastScan(qr);

        console.log("QR:", qr);

        try {
            const response = await fetch("/api/attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    qr,
                }),
            });

            const data = await response.json();

            setMessage(data.message);

            switch (data.status) {
                case "success":
                    setStatus("success");

                    toast.success(data.message);

                    audioRef.current?.play().catch(() => { });

                    break;

                case "already_checked_in":
                    setStatus("already");

                    toast.warning(data.message);

                    break;

                case "not_found":
                    setStatus("not_found");

                    toast.error(data.message);

                    break;

                default:
                    setStatus("error");

                    toast.error(data.message ?? "Unknown error.");
            }
        } catch (error) {
            console.error(error);

            setStatus("error");

            setMessage("Unable to connect to server.");

            toast.error("Unable to connect to server.");
        } finally {
            // Allow rescanning after 2 seconds
            setTimeout(() => {
                setLastScan("");
                setStatus("idle");
                setMessage("📷 Ready to scan a QR Code");
            }, 2000);
        }
    }

    function getStatusClass() {
        switch (status) {
            case "loading":
                return "border-yellow-300 bg-yellow-100 text-yellow-800";

            case "success":
                return "border-green-300 bg-green-100 text-green-800";

            case "already":
                return "border-blue-300 bg-blue-100 text-blue-800";

            case "not_found":
                return "border-red-300 bg-red-100 text-red-800";

            case "error":
                return "border-red-300 bg-red-100 text-red-800";

            default:
                return "border-emerald-200 bg-emerald-50 text-emerald-700";
        }
    }

    return (
        <>
            {/* Optional success sound */}
            <audio
                ref={audioRef}
                src="/success.mp3"
                preload="auto"
            />

            <div className="mx-auto max-w-2xl py-10">

                <Card className="overflow-hidden rounded-3xl border-0 shadow-2xl">

                    {/* Header */}

                    <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 p-8 text-white">

                        <h1 className="text-3xl font-bold">
                            Youth Praise Jam
                        </h1>

                        <p className="mt-2 text-green-100">
                            Attendance QR Scanner
                        </p>

                    </div>

                    <div className="space-y-6 p-6">

                        {/* Camera */}

                        <div className="overflow-hidden rounded-2xl border-4 border-emerald-500 bg-black shadow-lg">

                            <Scanner
                                constraints={{
                                    facingMode: "environment",
                                }}
                                allowMultiple={false}
                                scanDelay={500}
                                onScan={(results) => {
                                    if (!results.length) return;

                                    processScan(results[0].rawValue);
                                }}
                                onError={(error) => {
                                    console.error(error);

                                    setStatus("error");

                                    setMessage("Unable to access camera.");

                                    toast.error("Unable to access camera.");
                                }}
                                styles={{
                                    container: {
                                        width: "100%",
                                    },
                                    video: {
                                        width: "100%",
                                        height: "420px",
                                        objectFit: "cover",
                                    },
                                }}
                            />

                        </div>

                        {/* Status */}

                        <div
                            className={`rounded-2xl border p-5 text-center text-lg font-semibold transition-all ${getStatusClass()}`}
                        >
                            {status === "loading"
                                ? "⏳ Checking attendee..."
                                : message}
                        </div>

                        {/* Instructions */}

                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                            <h2 className="mb-2 font-semibold text-emerald-700">
                                Instructions
                            </h2>

                            <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-700">
                                <li>Allow camera access if prompted.</li>
                                <li>Point the camera at the attendee's QR Code.</li>
                                <li>Wait for the confirmation message.</li>
                                <li>Each participant can only check in once.</li>
                            </ul>

                        </div>

                    </div>

                </Card>

            </div>
        </>
    );
}