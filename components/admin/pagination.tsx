"use client";

import { Table } from "@tanstack/react-table";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({
    table,
}: Props<TData>) {

    const current =
        table.getState().pagination.pageIndex + 1;

    const total =
        table.getPageCount();

    return (
        <div
            className="
            flex
            flex-col
            items-center
            justify-center
            gap-4
            border-t
            bg-gray-50
            px-6
            py-5
            md:flex-row
            "
        >

            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="
        h-10
        border-gray-300
        bg-white
        px-4
        font-medium
        text-gray-700
        shadow-sm
        rounded-full
        hover:border-emerald-500
        hover:bg-emerald-50
        hover:text-emerald-700
        disabled:opacity-50
    "
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>

            <div
                className="
                rounded-full
                bg-emerald-100
                px-5
                py-2
                text-sm
                font-semibold
                text-emerald-700
                "
            >
                Page {current} of {total}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="
        h-10
        border-gray-300
        bg-white
        px-4
        font-medium
        text-gray-700
        shadow-sm
        rounded-full
        hover:border-emerald-500
        hover:bg-emerald-50
        hover:text-emerald-700
        disabled:opacity-50
    "
            >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>

        </div>
    );
}