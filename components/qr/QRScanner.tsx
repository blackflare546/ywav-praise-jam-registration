"use client";

import { useState, useEffect } from "react"; // UPDATED
import { Scanner } from "@yudiel/react-qr-scanner";
import { Card } from "@/components/ui/card";

type ResultStatus =
    | "idle"
    | "success"
    | "already"
    | "not_found"
    | "error";


export default function QRScanner() {

    const [status, setStatus] =
        useState<ResultStatus>("idle");

    const [message, setMessage] =
        useState(
            "📷 Ready to scan"
        );


    const [loading, setLoading] =
        useState(false);



    // NEW: Auto return to scanner after 3 seconds
    useEffect(() => {

        if (status === "idle") return;


        const timer = setTimeout(() => {

            resetScanner();

        }, 3000);


        return () => {
            clearTimeout(timer);
        };


    }, [status]);



    async function processScan(
        qr: string
    ) {

        if (loading) return;


        setLoading(true);


        try {

            const response =
                await fetch(
                    "/api/attendance",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            qr,
                        }),
                    }
                );


            const data =
                await response.json();



            setMessage(data.message);



            switch (data.status) {

                case "success":

                    setStatus("success");

                    break;


                case "already_checked_in":

                    setStatus("already");

                    break;


                case "not_found":

                    setStatus("not_found");

                    break;


                default:

                    setStatus("error");

            }


        }
        catch (error) {

            console.error(error);

            setStatus("error");

            setMessage(
                "Server error."
            );

        }
        finally {

            setLoading(false);

        }

    }



    function resetScanner() {

        setStatus("idle");

        setMessage(
            "📷 Ready to scan"
        );

    }



    return (

        <main
            className="
            min-h-screen
            bg-gradient-to-br
            from-emerald-50
            via-white
            to-green-100
            p-6
            "
        >


            <Card
                className="
                mx-auto
                max-w-xl
                overflow-hidden
                rounded-3xl
                shadow-xl
                "
            >


                <div
                    className="
                    bg-gradient-to-r
                    from-emerald-700
                    to-green-500
                    p-8
                    text-white
                    "
                >

                    <h1
                        className="
                        text-3xl
                        font-bold
                        "
                    >
                        Youth Praise Jam
                    </h1>


                    <p>
                        Attendance Scanner
                    </p>

                </div>



                <div className="p-6">


                    {
                        status === "idle" ? (


                            <div
                                className="
                                overflow-hidden
                                rounded-2xl
                                border-4
                                border-emerald-500
                                "
                            >

                                <Scanner

                                    constraints={{
                                        facingMode:
                                            "environment",
                                    }}

                                    scanDelay={500}


                                    onScan={(result) => {

                                        if (!result.length)
                                            return;


                                        processScan(
                                            result[0].rawValue
                                        );

                                    }}


                                    onError={(error) => {

                                        console.error(error);

                                        setStatus(
                                            "error"
                                        );

                                        setMessage(
                                            "Camera error"
                                        );

                                    }}


                                    styles={{
                                        video: {
                                            height: "420px",
                                            objectFit: "cover",
                                        }
                                    }}

                                />

                            </div>


                        ) : (


                            <div
                                className={`
                                rounded-3xl
                                p-10
                                text-center
                                ${status === "success"
                                        ?
                                        "bg-green-100 text-green-800"
                                        :
                                        status === "already"
                                            ?
                                            "bg-blue-100 text-blue-800"
                                            :
                                            "bg-red-100 text-red-800"
                                    }
                                `}
                            >


                                <div
                                    className="text-6xl"
                                >

                                    {
                                        status === "success"
                                            ?
                                            "✅"
                                            :
                                            status === "already"
                                                ?
                                                "⚠️"
                                                :
                                                "❌"
                                    }

                                </div>



                                <h2
                                    className="
                                    mt-5
                                    text-2xl
                                    font-bold
                                    "
                                >
                                    {message}
                                </h2>


                                <p className="mt-3 text-sm opacity-70">
                                    Returning to scanner...
                                </p>


                            </div>


                        )}



                </div>


            </Card>


        </main>

    );

}