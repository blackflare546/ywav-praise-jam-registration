"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Clock } from "lucide-react";

import DashboardCards from "./DashboardCards";
import AdminToolbar from "./AdminToolbar";
import { createClient } from "@/lib/supabase/client";
import RegistrantsTable from "./RegistrantsTable";
import LogoutButton from "../auth/LogoutButton";

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
        relative
        mb-8
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-emerald-700
        via-emerald-600
        to-green-500
        px-8
        py-8
        text-white
        shadow-xl
    "
                >

                    {/* Background Decoration */}

                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative z-10">

                        {/* Top Row */}

                        <div
                            className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-start
                lg:justify-between
            "
                        >

                            {/* Left */}

                            <div>

                                <span
                                    className="
                        inline-flex
                        rounded-full
                        bg-white/15
                        px-4
                        py-1
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        backdrop-blur
                    "
                                >
                                    Admin Dashboard
                                </span>

                                <h1
                                    className="
                        mt-4
                        text-4xl
                        font-extrabold
                        leading-tight
                    "
                                >
                                    Welcome Back 👋
                                </h1>

                                <p
                                    className="
                        mt-2
                        max-w-2xl
                        text-emerald-50
                        text-base
                    "
                                >
                                    Manage registrations, monitor attendance, and keep track
                                    of everyone joining the Youth With a Vision Praise Jam.
                                </p>

                            </div>

                            {/* Right */}

                            <div
                                className="
                    flex
                    flex-col
                    items-start
                    gap-4
                    lg:items-end
                "
                            >

                                <div
                                    className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-emerald-500/30
                        px-4
                        py-2
                        backdrop-blur
                    "
                                >
                                    <span className="h-2 w-2 rounded-full bg-green-300" />

                                    <span className="text-sm font-medium">
                                        System Online
                                    </span>
                                </div>

                                <LogoutButton />

                            </div>

                        </div>

                        {/* Event Information */}

                        <div
                            className="
                mt-8
                grid
                gap-4
                md:grid-cols-3
            "
                        >

                            <div
                                className="
                    rounded-2xl
                    bg-white/15
                    p-4
                    backdrop-blur-md
                    ring-1
                    ring-white/20
                "
                            >

                                <div className="mb-2 flex items-center gap-2 text-emerald-100">

                                    <CalendarDays size={18} />

                                    <span className="text-xs uppercase tracking-wider">
                                        Event Date
                                    </span>

                                </div>

                                <p className="text-lg font-semibold">
                                    Friday
                                </p>

                            </div>

                            <div
                                className="
                    rounded-2xl
                    bg-white/15
                    p-4
                    backdrop-blur-md
                    ring-1
                    ring-white/20
                "
                            >

                                <div className="mb-2 flex items-center gap-2 text-emerald-100">

                                    <Clock size={18} />

                                    <span className="text-xs uppercase tracking-wider">
                                        Start Time
                                    </span>

                                </div>

                                <p className="text-lg font-semibold">
                                    6:00 PM
                                </p>

                            </div>

                            <div
                                className="
                    rounded-2xl
                    bg-white/15
                    p-4
                    backdrop-blur-md
                    ring-1
                    ring-white/20
                "
                            >

                                <div className="mb-2 flex items-center gap-2 text-emerald-100">

                                    <MapPin size={18} />

                                    <span className="text-xs uppercase tracking-wider">
                                        Venue
                                    </span>

                                </div>

                                <p className="text-sm leading-relaxed">
                                    At the Back of Julie's Bakeshop,
                                    <br />
                                    Brgy. Galas, Dipolog City
                                </p>

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