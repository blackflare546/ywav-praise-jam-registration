import { notFound } from "next/navigation";
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
            via-slate-900
            to-black
            px-6
            py-10
            "
        >
            <Card
                className="
                w-full
                max-w-xl
                rounded-3xl
                border-0
                bg-white
                shadow-2xl
                overflow-hidden
                "
            >
                <CardHeader
                    className="
                    bg-gradient-to-r
                    from-emerald-600
                    to-green-500
                    py-8
                    text-center
                    text-white
                    "
                >
                    <div className="mb-4 text-6xl">
                        🎉
                    </div>

                    <CardTitle className="text-3xl font-bold">
                        Registration Successful!
                    </CardTitle>

                    <p className="mt-2 text-emerald-100">
                        Welcome to the
                        <br />
                        <span className="font-semibold">
                            Youth With a Vision Praise Jam
                        </span>
                    </p>
                </CardHeader>

                <CardContent className="space-y-6 p-8">

                    {/* Registrant */}

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">
                            Registered as
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                            {data.name}
                        </h2>

                        <p className="text-gray-600">
                            {data.email}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {data.ministries.map((ministry: string) => (
                                <span
                                    key={ministry}
                                    className="
                                    rounded-full
                                    bg-emerald-100
                                    px-3
                                    py-1
                                    text-sm
                                    font-medium
                                    text-emerald-700
                                    "
                                >
                                    {ministry}
                                </span>
                            ))}
                        </div>

                    </div>

                    {/* Email Notice */}

                    <div
                        className="
                        rounded-2xl
                        border
                        border-blue-200
                        bg-blue-50
                        p-5
                        "
                    >
                        <h3 className="text-lg font-bold text-blue-800">
                            📧 Check Your Email
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-blue-700">
                            We've sent a confirmation email to
                            <span className="font-semibold">
                                {" "}{data.email}
                            </span>
                            .
                        </p>

                        <p className="mt-3 text-sm leading-6 text-blue-700">
                            Your email contains your official QR Code,
                            event details, and important reminders.
                        </p>
                    </div>

                    {/* Instructions */}

                    <div
                        className="
                        rounded-2xl
                        border
                        border-emerald-200
                        bg-emerald-50
                        p-5
                        "
                    >
                        <h3 className="text-lg font-bold text-emerald-700">
                            📌 What's Next?
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-emerald-800">
                            <li>
                                ✅ Check your inbox (and Spam folder if needed).
                            </li>

                            <li>
                                ✅ Save your QR Code on your phone.
                            </li>

                            <li>
                                ✅ Present your QR Code during check-in.
                            </li>

                            <li>
                                ✅ Arrive before the event starts on Friday at 6:00 PM.
                            </li>
                        </ul>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        See you at the Praise Jam! 💚
                    </div>

                </CardContent>
            </Card>
        </main>
    );
}