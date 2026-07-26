"use client";

import * as React from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import {
    ChevronLeft,
    ChevronRight,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] =
        React.useState<SortingState>([]);

    const [globalFilter, setGlobalFilter] =
        React.useState("");

    const [ministryFilter, setMinistryFilter] =
        React.useState("All");

    const filteredData = React.useMemo(() => {
        if (ministryFilter === "All") {
            return data;
        }

        return data.filter((item: any) =>
            item.ministries.includes(ministryFilter)
        );
    }, [data, ministryFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,

        state: {
            sorting,
            globalFilter,
        },

        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel:
            getPaginationRowModel(),

        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <div className="space-y-5">

            {/* Toolbar */}

            <div
                className="
    flex
    flex-col
    gap-4
    md:flex-row
    md:items-center
    md:justify-between
    "
            >

                <div className="flex flex-1 gap-3">

                    <div className="relative flex-1">

                        <Search
                            className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-gray-400
                "
                        />

                        <Input
                            placeholder="Search participant..."
                            value={globalFilter}
                            onChange={(e) =>
                                setGlobalFilter(e.target.value)
                            }
                            className="
        h-11
        rounded-xl
        border-gray-300
        bg-white
        text-gray-900
        placeholder:text-gray-400
        focus:border-emerald-500
        focus:ring-emerald-500
        pl-10
    "
                        />

                    </div>

                    <Select
                        value={ministryFilter}
                        onValueChange={setMinistryFilter}
                    >

                        <SelectTrigger className="w-48">

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="All">
                                All Ministries
                            </SelectItem>

                            <SelectItem value="Singer">
                                Singer
                            </SelectItem>

                            <SelectItem value="Instruments">
                                Instruments
                            </SelectItem>

                            <SelectItem value="Media">
                                Media
                            </SelectItem>

                            <SelectItem value="Dance">
                                Dance
                            </SelectItem>

                            <SelectItem value="Usher">
                                Usher
                            </SelectItem>

                            <SelectItem value="Sounds">
                                Sounds
                            </SelectItem>

                        </SelectContent>

                    </Select>

                </div>

                <p className="text-sm text-gray-500">

                    Showing{" "}

                    <span className="font-semibold">

                        {table.getFilteredRowModel().rows.length}

                    </span>{" "}

                    participant(s)

                </p>

            </div>

            {/* Table */}

            <div
                className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                "
            >

                <div className="overflow-x-auto">

                    <Table>

                        <TableHeader
                            className="
                            sticky
                            top-0
                            bg-gray-50
                            "
                        >

                            {table
                                .getHeaderGroups()
                                .map((headerGroup) => (

                                    <TableRow
                                        key={headerGroup.id}
                                    >

                                        {headerGroup.headers.map(
                                            (header) => (

                                                <TableHead
                                                    key={header.id}
                                                    className="
                                                    h-14
                                                    text-sm
                                                    font-bold
                                                    text-gray-700
                                                    "
                                                >

                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}

                                                </TableHead>

                                            )
                                        )}

                                    </TableRow>

                                ))}

                        </TableHeader>

                        <TableBody>

                            {table.getRowModel().rows.length ? (

                                table
                                    .getRowModel()
                                    .rows
                                    .map((row) => (

                                        <TableRow
                                            key={row.id}
                                            className="
                                            transition-colors
                                            hover:bg-emerald-50
                                            "
                                        >

                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (

                                                    <TableCell
                                                        key={cell.id}
                                                        className="
                                                        py-5
                                                        "
                                                    >

                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}

                                                    </TableCell>

                                                ))}

                                        </TableRow>

                                    ))

                            ) : (

                                <TableRow>

                                    <TableCell
                                        colSpan={columns.length}
                                        className="
                                        py-16
                                        text-center
                                        "
                                    >

                                        <div className="space-y-3">

                                            <div className="text-5xl">
                                                🔍
                                            </div>

                                            <h3
                                                className="
                                                text-lg
                                                font-semibold
                                                text-gray-900
                                                "
                                            >
                                                No participants found
                                            </h3>

                                            <p
                                                className="
                                                text-gray-500
                                                "
                                            >
                                                Try another search.
                                            </p>

                                        </div>

                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>

                </div>

            </div>

            {/* Pagination */}

            <div
                className="
                flex
                items-center
                justify-between
                "
            >

                <p className="text-sm text-gray-500">

                    Page{" "}

                    <span className="font-semibold">

                        {table.getState().pagination.pageIndex + 1}

                    </span>

                    {" "}of{" "}

                    <span className="font-semibold">

                        {table.getPageCount() || 1}

                    </span>

                </p>

                <div className="flex gap-2">

                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() =>
                            table.previousPage()
                        }
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!table.getCanNextPage()}
                        onClick={() =>
                            table.nextPage()
                        }
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                </div>

            </div>

        </div>
    );
}