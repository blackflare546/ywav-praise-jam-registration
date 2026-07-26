import { notFound } from "next/navigation";

import QRCodeCard from "@/components/qr/QRCodeCard";
import DownloadQRButton from "@/components/qr/DownloadQRButton";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

interface Props {
    searchParams: Promise<{
        qr?: string;
    }>;
}

export default async function ThankYouPage({
    searchParams,
}: Props) {
    const { qr } = await searchParams;

    if (!qr) {
        notFound();
    }

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("registrants")
        .select("*")
        .eq("qr_code", qr)
        .single();

    if (error || !data) {
        notFound();
    }

    return (
        <main className="min-h-screen  py-16">
            <div className="mx-auto max-w-2xl px-6">
                <Card className="shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl text-green-600">
                            🎉 Registration Successful!
                        </CardTitle>

                        <p className="text-muted-foreground mt-2">
                            Thank you for registering for our Youth Praise Jam.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        {/* Registrant Details */}

                        <div className="rounded-lg border bg-muted/40 p-5 space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Full Name
                                </p>

                                <p className="font-semibold">
                                    {data.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email
                                </p>

                                <p className="font-semibold">
                                    {data.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Ministries
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {data.ministries.map(
                                        (ministry: string) => (
                                            <span
                                                key={ministry}
                                                className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
                                            >
                                                {ministry}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* QR Code */}

                        <div className="flex justify-center">
                            <QRCodeCard value={data.qr_code} />
                        </div>

                        {/* Download */}

                        <DownloadQRButton
                            filename={data.name}
                        />

                        {/* Instructions */}

                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
                            <h3 className="font-semibold text-blue-700">
                                Event Reminder
                            </h3>

                            <p className="mt-2 text-sm text-blue-600">
                                Please save your QR Code and present it
                                during event registration for attendance.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}