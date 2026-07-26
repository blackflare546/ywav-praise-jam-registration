import DashboardCards from "@/components/admin/DashboardCards";
import RegistrantsTable from "@/components/admin/RegistrantsTable";
import { createClient } from "@/lib/supabase/server";
import AdminToolbar from "@/components/admin/AdminToolbar";

export default async function AdminPage() {
    const supabase = await createClient();

    const { data: registrants } = await supabase
        .from("registrants")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">

            <div className="mx-auto max-w-7xl p-8">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-emerald-700">
                        Youth Praise Jam
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Registration Dashboard
                    </p>

                </div>

                <DashboardCards registrants={registrants ?? []} />

                <AdminToolbar
                    registrants={registrants ?? []}
                />


                <div className="mt-8">

                    <RegistrantsTable
                        registrants={registrants ?? []}
                    />

                </div>

            </div>

        </main>
    );
}