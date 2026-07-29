"use client";

import * as React from "react";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
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

import { columns } from "./columns";
import { DataTableToolbar } from "./toolbar";
import { DataTablePagination } from "./pagination";

interface Props<TData> {
    data: TData[];
}

export function DataTable<TData>({
    data,
}: Props<TData>) {
    const [sorting, setSorting] =
        React.useState<SortingState>([]);

    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const [globalFilter, setGlobalFilter] =
        React.useState("");

    const table = useReactTable({
        data,

        columns: columns as ColumnDef<TData>[],

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },

        onSortingChange: setSorting,

        onColumnFiltersChange:
            setColumnFilters,

        onColumnVisibilityChange:
            setColumnVisibility,

        onGlobalFilterChange:
            setGlobalFilter,

        globalFilterFn: (row, _, value) => {
            const search =
                String(value).toLowerCase();

            const name =
                String(
                    row.getValue("name")
                ).toLowerCase();

            const email =
                String(
                    row.getValue("email")
                ).toLowerCase();

            return (
                name.includes(search) ||
                email.includes(search)
            );
        },

        getCoreRowModel:
            getCoreRowModel(),

        getSortedRowModel:
            getSortedRowModel(),

        getFilteredRowModel:
            getFilteredRowModel(),

        getPaginationRowModel:
            getPaginationRowModel(),
    });

    return (
        <div
            className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-xl
            "
        >
            <DataTableToolbar
                table={table}
                globalFilter={globalFilter}
                setGlobalFilter={
                    setGlobalFilter
                }
            />

            <div className="overflow-x-auto">

                <Table>

                    <TableHeader className="bg-emerald-50">

                        {table
                            .getHeaderGroups()
                            .map(
                                (
                                    headerGroup
                                ) => (
                                    <TableRow
                                        key={
                                            headerGroup.id
                                        }
                                    >
                                        {headerGroup.headers.map(
                                            (
                                                header
                                            ) => (
                                                <TableHead
                                                    key={
                                                        header.id
                                                    }
                                                    className="
                                                    font-semibold
                                                    text-gray-700
                                                    "
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header
                                                                .column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        )}
                                    </TableRow>
                                )
                            )}

                    </TableHeader>

                    <TableBody>

                        {table.getRowModel().rows
                            ?.length ? (

                            table
                                .getRowModel()
                                .rows.map(
                                    (
                                        row
                                    ) => (
                                        <TableRow
                                            key={
                                                row.id
                                            }
                                            className="
                                            hover:bg-emerald-50
                                            "
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map(
                                                    (
                                                        cell
                                                    ) => (
                                                        <TableCell
                                                            key={
                                                                cell.id
                                                            }
                                                            className="
                                                            py-4
                                                            text-gray-800
                                                            "
                                                        >
                                                            {flexRender(
                                                                cell
                                                                    .column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    )
                                                )}
                                        </TableRow>
                                    )
                                )

                        ) : (

                            <TableRow>

                                <TableCell
                                    colSpan={
                                        columns.length
                                    }
                                    className="
                                    py-16
                                    text-center
                                    "
                                >

                                    <div className="space-y-2">

                                        <div className="text-5xl">
                                            🔍
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-700">
                                            No registrants found
                                        </h3>

                                        <p className="text-gray-500">
                                            Try another search
                                            or ministry.
                                        </p>

                                    </div>

                                </TableCell>

                            </TableRow>

                        )}

                    </TableBody>

                </Table>

            </div>

            <DataTablePagination
                table={table}
            />

        </div>
    );
}