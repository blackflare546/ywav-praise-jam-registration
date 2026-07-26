"use client";

import { Download, RefreshCw } from "lucide-react";
import { exportRegistrantsCSV } from "@/lib/exportCSV";

interface Props {
    registrants: any[];
}

export default function AdminToolbar({
    registrants,
}: Props) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
                onClick={() => location.reload()}
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 font-medium text-emerald-700 shadow transition hover:bg-emerald-50"
            >
                <RefreshCw size={18} />
                Refresh
            </button>

            <button
                onClick={() =>
                    exportRegistrantsCSV(registrants)
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white shadow transition hover:bg-emerald-700"
            >
                <Download size={18} />
                Export CSV
            </button>

        </div>
    );
}