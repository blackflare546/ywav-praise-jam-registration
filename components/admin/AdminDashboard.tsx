"use client";

import { useEffect, useState } from "react";


import DashboardCards from "./DashboardCards";
import RegistrantsTable from "./RegistrantsTable";
import AdminToolbar from "./AdminToolbar";
import { createClient } from "@/lib/supabase/client";


export default function AdminDashboard() {

    const [registrants, setRegistrants] =
        useState<any[]>([]);


    const supabase =
        createClient();



    async function loadRegistrants() {

        const { data, error } = await supabase
            .from("registrants")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(error);

            return;

        }


        setRegistrants(data ?? []);

    }



    useEffect(() => {


        loadRegistrants();



        const channel =
            supabase
                .channel(
                    "registrants-changes"
                )
                .on(

                    "postgres_changes",

                    {
                        event: "*",
                        schema: "public",
                        table: "registrants",
                    },

                    (payload) => {


                        console.log(
                            "Realtime update:",
                            payload
                        );


                        loadRegistrants();


                    }

                )
                .subscribe();



        return () => {

            supabase.removeChannel(
                channel
            );

        };


    }, []);



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

            <div
                className="
        mx-auto
        max-w-7xl
        "
            >


                <h1
                    className="
          mb-8
          text-4xl
          font-bold
          text-emerald-700
          "
                >
                    Youth Praise Jam Dashboard
                </h1>



                <DashboardCards
                    registrants={registrants}
                />


                <div className="mt-6">

                    <AdminToolbar
                        registrants={registrants}
                    />

                </div>


                <div className="mt-6">

                    <RegistrantsTable
                        registrants={registrants}
                    />

                </div>


            </div>


        </main>

    );

}