import QRCodeCard from "@/components/qr/QRCodeCard";
import DownloadQRButton from "@/components/qr/DownloadQRButton";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";
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

    const { data } = await supabase
        .from("registrants")
        .select("*")
        .eq("qr_code", qr)
        .single();

    if (!data) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 py-16">
            <div className="mx-auto max-w-2xl px-6">
                <Card className="p-8 space-y-8">

                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-green-600">
                            Registration Successful!
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Thank you for registering for our
                            Youth Praise Jam.
                        </p>
                    </div>

                    <div className="space-y-3">

                        <div>
                            <strong>Name:</strong>
                            <br />
                            {data.name}
                        </div>

                        <div>
                            <strong>Email:</strong>
                            <br />
                            {data.email}
                        </div>

                        <div>
                            <strong>Ministries:</strong>

                            <ul className="list-disc ml-6 mt-2">
                                {data.ministries.map(
                                    (ministry: string) => (
                                        <li key={ministry}>
                                            {ministry}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                    </div>

                    <QRCodeCard value={data.qr_code} />

                    <DownloadQRButton
                        filename={data.name}
                    />

                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-700">
                        Please save your QR Code.
                        Present it during event registration
                        for attendance.
                    </div>

                </Card>
            </div>
        </main>
    );
}