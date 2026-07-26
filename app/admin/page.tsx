
import DashboardCards from "@/components/admin/DashboardCards";
import RegistrantsTable from "@/components/admin/RegistrantsTable";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { createClient } from "@/lib/supabase/server";


export default async function AdminPage() {

    const supabase = await createClient();


    const { data: registrants } =
        await supabase
            .from("registrants")
            .select("*")
            .order("created_at", {
                ascending: false,
            });


    const updatedAt =
        new Date().toLocaleString();


    return (

        <main className="
      min-h-screen
      bg-gradient-to-br
      from-emerald-50
      via-white
      to-green-100
    ">

            <div className="
        mx-auto
        max-w-7xl
        p-6
        md:p-8
      ">


                {/* Header */}

                <div className="mb-8">

                    <h1 className="
            text-4xl
            font-bold
            text-emerald-700
          ">
                        Youth Praise Jam
                    </h1>


                    <p className="
            mt-2
            text-gray-600
          ">
                        Registration Dashboard
                    </p>


                    <p className="
            mt-2
            text-sm
            text-gray-400
          ">
                        Last Updated: {updatedAt}
                    </p>


                </div>



                <DashboardCards
                    registrants={registrants ?? []}
                />



                <div className="mt-8">

                    <AdminToolbar
                        registrants={registrants ?? []}
                    />

                </div>



                <RegistrantsTable
                    registrants={registrants ?? []}
                />


            </div>

        </main>

    );
}