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
        <main
            className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-emerald-950
    via-gray-900
    to-black
    px-5
    py-6
    "
        >

            <div
                className="
            w-full
            max-w-xl
            "
            >

                <Card
                    className="
                overflow-hidden
                rounded-3xl
                border-0
                bg-white
                shadow-2xl
                "
                >

                    {/* Header */}

                    <CardHeader
                        className="
    bg-gradient-to-br
    from-emerald-50
    to-white
    px-6
    py-4
    text-center
    "
                    >

                        <CardTitle
                            className="
                        text-2xl
                        font-extrabold
                        text-emerald-700
                        "
                        >
                            🎉 Registration Successful!
                        </CardTitle>


                        <p
                            className="
                        mt-2
                        text-gray-600
                        "
                        >
                            Thank you for joining
                            <br />
                            <span className="font-semibold">
                                Youth With a Vision Praise Jam
                            </span>
                        </p>


                    </CardHeader>



                    <CardContent
                        className="
    space-y-3
    bg-white
    px-5
    py-4
    text-gray-900
    "
                    >


                        {/* Details */}

                        <div
                            className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-4
space-y-2
                        "
                        >


                            <div>

                                <p
                                    className="
                                text-xs
                                font-medium
                                uppercase
                                text-gray-500
                                "
                                >
                                    Full Name
                                </p>


                                <p
                                    className="
                                text-lg
                                font-bold
                                text-gray-900
                                "
                                >
                                    {data.name}
                                </p>

                            </div>



                            <div>

                                <p
                                    className="
                                text-xs
                                font-medium
                                uppercase
                                text-gray-500
                                "
                                >
                                    Email
                                </p>


                                <p
                                    className="
                                font-semibold
                                text-gray-800
                                "
                                >
                                    {data.email}
                                </p>

                            </div>



                            <div>

                                <p
                                    className="
                                text-xs
                                font-medium
                                uppercase
                                text-gray-500
                                "
                                >
                                    Ministries
                                </p>



                                <div
                                    className="
                                mt-2
                                flex
                                flex-wrap
                                gap-2
                                "
                                >

                                    {data.ministries.map(
                                        (ministry: string) => (

                                            <span
                                                key={ministry}
                                                className="
                                            rounded-full
                                            bg-emerald-100
                                            px-3
                                            py-1
                                            text-sm
                                            font-semibold
                                            text-emerald-700
                                            "
                                            >
                                                {ministry}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>


                        </div>




                        {/* QR */}

                        <div
                            className="
    flex
    justify-center
    rounded-2xl
    border
    border-gray-200
    bg-white
    p-2
    "
                        >

                            <QRCodeCard
                                value={data.qr_code}
                            />

                        </div>




                        {/* Download */}

                        <DownloadQRButton
                            filename={data.name}
                        />





                        {/* Reminder */}

                        <div
                            className="
                        rounded-2xl
                        border
                        border-emerald-200
                        bg-emerald-50
                        p-4
                        "
                        >

                            <h3
                                className="
                            font-bold
                            text-emerald-700
                            "
                            >
                                📌 Event Reminder
                            </h3>


                            <p
                                className="
                            mt-1
                            text-sm
                            text-emerald-800
                            "
                            >
                                Save your QR Code and present it
                                during registration on the event day.
                            </p>


                        </div>



                    </CardContent>


                </Card>



            </div>


        </main>
    );
}