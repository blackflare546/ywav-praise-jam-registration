"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Clock } from "lucide-react";

import DashboardCards from "./DashboardCards";
import RegistrantsTable from "./RegistrantsTable";
import AdminToolbar from "./AdminToolbar";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
    const [registrants, setRegistrants] = useState<any[]>([]);

    const supabase = createClient();

    async function loadRegistrants() {
        const { data, error } = await supabase
            .from("registrants")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        if (error) {
            console.error(error);
            return;
        }

        setRegistrants(data ?? []);
    }

    useEffect(() => {
        loadRegistrants();

        const channel = supabase
            .channel("registrants-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "registrants",
                },
                () => {
                    loadRegistrants();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <main
            className="
            min-h-screen
            bg-gradient-to-br
            from-emerald-100
            via-green-50
            to-white
            p-6
            "
        >
            <div className="mx-auto max-w-7xl">

                {/* Hero Header */}

                <div
                    className="
    mb-6
    overflow-hidden
    rounded-2xl
    bg-gradient-to-r
    from-emerald-700
    via-emerald-600
    to-green-500
    px-8
    py-6
    text-white
    shadow-lg
    "
                >

                    <div
                        className="
        flex
        flex-col
        gap-5
        md:flex-row
        md:items-center
        md:justify-between
        "
                    >

                        {/* Left */}

                        <div>

                            <p
                                className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-emerald-100
                "
                            >
                                Admin Dashboard
                            </p>

                            <h1
                                className="
                mt-2
                text-3xl
                font-bold
                leading-tight
                md:text-4xl
                "
                            >
                                Youth With a Vision
                                <span className="block text-emerald-100">
                                    Praise Jam
                                </span>
                            </h1>

                        </div>

                        {/* Right */}

                        <div
                            className="
            flex
            flex-wrap
            gap-2
            "
                        >

                            <div
                                className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white/15
                px-3
                py-2
                text-sm
                backdrop-blur
                "
                            >
                                <CalendarDays size={16} />
                                Friday
                            </div>

                            <div
                                className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white/15
                px-3
                py-2
                text-sm
                backdrop-blur
                "
                            >
                                <Clock size={16} />
                                6:00 PM
                            </div>

                            <div
                                className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white/15
                px-3
                py-2
                text-sm
                backdrop-blur
                "
                            >
                                <MapPin size={16} />
                                Galas, Dipolog
                            </div>

                        </div>

                    </div>

                </div>

                {/* Statistics */}

                <DashboardCards
                    registrants={registrants}
                />

                {/* Toolbar */}

                <div className="mt-8">

                    <div
                        className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                        "
                    >
                        <AdminToolbar
                            registrants={registrants}
                        />
                    </div>

                </div>

                {/* Table */}

                <div className="mt-8">

                    <div
                        className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        shadow-sm
                        "
                    >

                        <div
                            className="
                            border-b
                            bg-gray-50
                            px-6
                            py-4
                            "
                        >

                            <h2
                                className="
                                text-xl
                                font-bold
                                text-gray-900
                                "
                            >
                                Registered Participants
                            </h2>

                            <p
                                className="
                                mt-1
                                text-sm
                                text-gray-500
                                "
                            >
                                View all registrants and
                                monitor attendance.
                            </p>

                        </div>

                        <div className="p-6">

                            <RegistrantsTable
                                registrants={registrants}
                            />

                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}