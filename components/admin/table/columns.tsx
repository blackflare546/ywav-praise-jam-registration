"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export type Registrant = {
    id: string;
    name: string;
    email: string;
    ministries: string[];
    is_checked_in: boolean;
    checked_in_at: string | null;
    created_at: string;
};

export const columns: ColumnDef<Registrant>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0 hover:bg-transparent"
                onClick={() =>
                    column.toggleSorting(
                        column.getIsSorted() === "asc"
                    )
                }
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),

        cell: ({ row }) => (
            <div className="space-y-1">
                <p className="font-semibold text-gray-900">
                    {row.original.name}
                </p>

                <p className="text-sm text-gray-500">
                    {row.original.email}
                </p>
            </div>
        ),
    },

    {
        accessorKey: "ministries",

        header: "Ministries",

        cell: ({ row }) => (
            <div className="flex flex-wrap gap-2">
                {row.original.ministries.map((m) => (
                    <span
                        key={m}
                        className="
                        rounded-full
                        bg-emerald-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-emerald-700
                        "
                    >
                        {m}
                    </span>
                ))}
            </div>
        ),
    },

    {
        accessorKey: "is_checked_in",

        header: "Attendance",

        cell: ({ row }) =>
            row.original.is_checked_in ? (
                <span
                    className="
                    inline-flex
                    rounded-full
                    bg-green-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-700
                    "
                >
                    ✅ Checked In
                </span>
            ) : (
                <span
                    className="
                    inline-flex
                    rounded-full
                    bg-orange-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-orange-700
                    "
                >
                    ⏳ Pending
                </span>
            ),
    },

    {
        accessorKey: "checked_in_at",

        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0 hover:bg-transparent"
                onClick={() =>
                    column.toggleSorting(
                        column.getIsSorted() === "asc"
                    )
                }
            >
                Checked In
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),

        cell: ({ row }) =>
            row.original.checked_in_at ? (
                <div className="text-sm text-gray-700">
                    {new Date(
                        row.original.checked_in_at
                    ).toLocaleString()}
                </div>
            ) : (
                <span className="text-gray-400">
                    —
                </span>
            ),
    },
];