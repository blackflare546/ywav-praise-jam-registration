"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Registrant {
    id: string;

    name: string;
    email: string;

    age: number;
    birthday: string;

    cell_number: string;
    address: string;

    ministries: string[];

    is_checked_in: boolean;
    checked_in_at: string | null;
}

interface SortHeaderProps {
    column: any;
    title: string;
}

function SortHeader({
    column,
    title,
}: SortHeaderProps) {
    const sorted = column.getIsSorted();

    return (
        <Button
            variant="ghost"
            className="
                h-auto
                p-0
                font-semibold
                text-gray-700
                hover:bg-transparent
                hover:text-emerald-700
            "
            onClick={() =>
                column.toggleSorting(
                    sorted === "asc"
                )
            }
        >
            {title}

            {sorted === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4 text-emerald-600" />
            ) : sorted === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4 text-emerald-600" />
            ) : (
                <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
            )}
        </Button>
    );
}

export const columns: ColumnDef<Registrant>[] = [
    {
        accessorKey: "name",

        header: ({ column }) => (
            <SortHeader
                column={column}
                title="Name"
            />
        ),
    },

    {
        accessorKey: "email",

        header: ({ column }) => (
            <SortHeader
                column={column}
                title="Email"
            />
        ),
    },

    {
        accessorKey: "age",

        header: ({ column }) => (
            <SortHeader
                column={column}
                title="Age"
            />
        ),
    },

    {
        accessorKey: "birthday",

        header: ({ column }) => (
            <SortHeader
                column={column}
                title="Birthday"
            />
        ),

        sortingFn: "datetime",

        cell: ({ row }) =>
            new Date(
                row.original.birthday
            ).toLocaleDateString(),
    },

    {
        accessorKey: "cell_number",

        header: "Cell Number",
    },

    {
        accessorKey: "address",

        header: "Address",

        cell: ({ row }) => (
            <div
                className="
                max-w-[220px]
                truncate
            "
                title={row.original.address}
            >
                {row.original.address}
            </div>
        ),
    },
    {
        accessorKey: "ministries",

        header: "Ministries",

        filterFn: (row, id, value) => {
            if (!value) return true;

            return row
                .getValue<string[]>(id)
                ?.includes(value);
        },

        cell: ({ row }) => (
            <div className="flex flex-wrap gap-1">
                {row.original.ministries.map(
                    (ministry) => (
                        <Badge
                            key={ministry}
                            variant="secondary"
                            className="
                                bg-emerald-100
                                text-emerald-700
                                hover:bg-emerald-100
                            "
                        >
                            {ministry}
                        </Badge>
                    )
                )}
            </div>
        ),
    },

    {
        accessorKey: "is_checked_in",

        header: ({ column }) => (
            <SortHeader
                column={column}
                title="Status"
            />
        ),

        sortingFn: (rowA, rowB) =>
            Number(rowA.original.is_checked_in) -
            Number(rowB.original.is_checked_in),

        cell: ({ row }) =>
            row.original.is_checked_in ? (
                <Badge
                    className="
                        bg-green-100
                        text-green-700
                        hover:bg-green-100
                    "
                >
                    ✓ Checked In
                </Badge>
            ) : (
                <Badge
                    className="
                        bg-orange-100
                        text-orange-700
                        hover:bg-orange-100
                    "
                >
                    Pending
                </Badge>
            ),
    },

    {
        accessorKey: "checked_in_at",

        header: ({ column }) => (
            <SortHeader
                column={column}
                title="Checked In At"
            />
        ),

        sortingFn: "datetime",

        cell: ({ row }) =>
            row.original.checked_in_at
                ? new Date(
                    row.original.checked_in_at
                ).toLocaleString()
                : "-",
    },
];