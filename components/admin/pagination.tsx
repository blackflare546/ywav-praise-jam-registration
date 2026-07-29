"use client";

import { Table } from "@tanstack/react-table";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

interface Props<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({
    table,
}: Props<TData>) {

    const {
        pageIndex,
        pageSize,
    } = table.getState().pagination;

    const totalRows =
        table.getFilteredRowModel().rows.length;

    const start =
        totalRows === 0
            ? 0
            : pageIndex * pageSize + 1;

    const end = Math.min(
        (pageIndex + 1) * pageSize,
        totalRows
    );

    return (

        <div
            className="
            flex
            flex-col
            items-center
            justify-between
            gap-5
            border-t
            bg-gray-50
            px-6
            py-5
            lg:flex-row
            "
        >

            {/* Left */}

            <div
                className="
                flex
                items-center
                gap-3
                "
            >

                <span className="text-sm text-gray-600">
                    Rows per page
                </span>

                <Select
                    value={String(pageSize)}
                    onValueChange={(value) =>
                        table.setPageSize(Number(value))
                    }
                >
                    <SelectTrigger
                        className="
        h-10
        w-24
        border-gray-300
        bg-white
        text-gray-900
        shadow-sm
        hover:border-emerald-500
        data-[placeholder]:text-gray-500
    "
                    >
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent
                        className="
        border-gray-200
        bg-white
        text-gray-900
    "
                    >
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>

                </Select>

            </div>

            {/* Center */}

            <div
                className="
                text-center
                "
            >

                <p className="text-sm text-gray-600">
                    Showing
                    <span className="mx-1 font-semibold text-gray-900">
                        {start}-{end}
                    </span>
                    of
                    <span className="ml-1 font-semibold text-gray-900">
                        {totalRows}
                    </span>
                    {" participants"}
                </p>

                <div
                    className="
                    mt-2
                    inline-flex
                    rounded-full
                    bg-emerald-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-emerald-700
                    "
                >
                    Page {pageIndex + 1} of {table.getPageCount()}
                </div>

            </div>

            {/* Right */}

            <div
                className="
                flex
                items-center
                gap-2
                "
            >

                <Button
                    onClick={() =>
                        table.previousPage()
                    }
                    disabled={
                        !table.getCanPreviousPage()
                    }
                    className="
                    bg-emerald-600
                    text-white
                    hover:bg-emerald-700
                    disabled:bg-gray-300
                    "
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />

                    Previous

                </Button>

                <Button
                    onClick={() =>
                        table.nextPage()
                    }
                    disabled={
                        !table.getCanNextPage()
                    }
                    className="
                    bg-emerald-600
                    text-white
                    hover:bg-emerald-700
                    disabled:bg-gray-300
                    "
                >

                    Next

                    <ChevronRight className="ml-2 h-4 w-4" />

                </Button>

            </div>

        </div>

    );

}