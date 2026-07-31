"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    CalendarDays,
    MapPin,
    Clock,
    QrCode,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import DashboardCards from "./DashboardCards";
import AdminToolbar from "./AdminToolbar";
import RegistrantsTable from "./RegistrantsTable";

import { createClient } from "@/lib/supabase/client";

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
                () => loadRegistrants()
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

                {/* ========================= */}
                {/* Hero Header */}
                {/* ========================= */}

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

                    {/* Decorations */}

                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative z-10">

                        {/* Top Section */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-8
                                lg:flex-row
                                lg:items-start
                                lg:justify-between
                            "
                        >

                            {/* Left */}

                            <div className="max-w-2xl">

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        rounded-full
                                        border
                                        border-white/20
                                        bg-white/10
                                        px-4
                                        py-1.5
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        backdrop-blur-md
                                    "
                                >
                                    Admin Dashboard
                                </span>

                                <h1
                                    className="
                                        mt-5
                                        text-4xl
                                        font-extrabold
                                        leading-tight
                                    "
                                >
                                    Welcome Back 👋
                                </h1>

                                <p
                                    className="
                                        mt-3
                                        text-base
                                        leading-7
                                        text-emerald-50
                                    "
                                >
                                    Manage registrations, monitor attendance,
                                    resend confirmation emails, manually
                                    check-in participants, and track event
                                    progress in real time.
                                </p>

                            </div>

                            {/* Right */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    items-start
                                    gap-5
                                    lg:items-end
                                "
                            >

                                {/* Status */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-white/20
                                        bg-white/10
                                        px-4
                                        py-2
                                        backdrop-blur-md
                                    "
                                >

                                    <span className="h-2.5 w-2.5 rounded-full bg-green-300 animate-pulse" />

                                    <span className="text-sm font-medium">
                                        System Online
                                    </span>

                                </div>

                                {/* Buttons */}

                                <div className="flex flex-wrap gap-3">

                                    <Button
                                        asChild
                                        size="lg"
                                        className="
                                            bg-white
                                            text-emerald-700
                                            hover:bg-emerald-50
                                            hover:text-emerald-800
                                            shadow-lg
                                            font-semibold
                                        "
                                    >

                                        <Link
                                            href="/scan"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >

                                            <QrCode className="mr-2 h-5 w-5" />

                                            Scan QR Code

                                        </Link>

                                    </Button>

                                    <LogoutButton />

                                </div>

                            </div>

                        </div>

                        {/* Event Cards */}

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
                                    p-5
                                    backdrop-blur-md
                                    ring-1
                                    ring-white/20
                                "
                            >

                                <div className="mb-3 flex items-center gap-2 text-emerald-100">

                                    <CalendarDays size={18} />

                                    <span className="text-xs uppercase tracking-wider">
                                        Event Date
                                    </span>

                                </div>

                                <p className="text-xl font-bold">
                                    Friday
                                </p>

                            </div>

                            <div
                                className="
                                    rounded-2xl
                                    bg-white/15
                                    p-5
                                    backdrop-blur-md
                                    ring-1
                                    ring-white/20
                                "
                            >

                                <div className="mb-3 flex items-center gap-2 text-emerald-100">

                                    <Clock size={18} />

                                    <span className="text-xs uppercase tracking-wider">
                                        Start Time
                                    </span>

                                </div>

                                <p className="text-xl font-bold">
                                    6:00 PM
                                </p>

                            </div>

                            <div
                                className="
                                    rounded-2xl
                                    bg-white/15
                                    p-5
                                    backdrop-blur-md
                                    ring-1
                                    ring-white/20
                                "
                            >

                                <div className="mb-3 flex items-center gap-2 text-emerald-100">

                                    <MapPin size={18} />

                                    <span className="text-xs uppercase tracking-wider">
                                        Venue
                                    </span>

                                </div>

                                <p className="leading-6">
                                    At the Back of Julie's Bakeshop
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
                                View all registrants and monitor attendance.
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