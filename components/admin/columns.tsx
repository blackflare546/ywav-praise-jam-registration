"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type Registrant = {
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
};

export const columns: ColumnDef<Registrant>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        accessorKey: "birthday",
        header: "Birthday",
        cell: ({ row }) =>
            new Date(row.original.birthday).toLocaleDateString(),
    },
    {
        accessorKey: "cell_number",
        header: "Cell",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "ministries",
        header: "Ministries",
        cell: ({ row }) =>
            row.original.ministries.join(", "),
    },
    {
        accessorKey: "is_checked_in",
        header: "Status",
        cell: ({ row }) =>
            row.original.is_checked_in ? (
                <Badge
                    className="
    bg-emerald-100
    text-emerald-700
    hover:bg-emerald-100
    "
                >
                    Checked In
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
        header: "Checked In At",
        cell: ({ row }) =>
            row.original.checked_in_at
                ? new Date(
                    row.original.checked_in_at
                ).toLocaleString()
                : "-",
    },
];