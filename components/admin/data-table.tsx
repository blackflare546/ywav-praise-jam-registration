"use client";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
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

interface Props {
    data: any[];
}

export function DataTable({
    data,
}: Props) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:
            getCoreRowModel(),
        getFilteredRowModel:
            getFilteredRowModel(),
        getPaginationRowModel:
            getPaginationRowModel(),
    });

    return (
        <div
            className="
    overflow-hidden
    "
        >
            <DataTableToolbar table={table} />

            <Table>
                <TableHeader className="bg-emerald-50">
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
    font-semibold
    text-gray-700
    "
                                        >
                                            {flexRender(
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
                        ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map(
                        (row) => (
                            <TableRow
                                key={row.id}
                                className="
    border-gray-100
    hover:bg-emerald-50
    "
                            >
                                {row
                                    .getVisibleCells()
                                    .map((cell) => (
                                        <TableCell
                                            key={cell.id}
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
                                    ))}
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <DataTablePagination table={table} />
        </div>
    );
}