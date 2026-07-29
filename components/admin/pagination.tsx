"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface Props<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({
    table,
}: Props<TData>) {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
                Page{" "}
                {table.getState().pagination.pageIndex + 1}
                {" / "}
                {table.getPageCount()}
            </div>

            <div className="space-x-2">
                <Button
                    variant="outline"
                    onClick={() =>
                        table.previousPage()
                    }
                    disabled={
                        !table.getCanPreviousPage()
                    }
                    className="
    border-gray-300
    bg-white
    text-gray-700
    hover:bg-emerald-50
    hover:text-emerald-700
    "
                >
                    Previous
                </Button>

                <Button
                    variant="outline"
                    className="
    border-gray-300
    bg-white
    text-gray-700
    hover:bg-emerald-50
    hover:text-emerald-700
    "
                    onClick={() =>
                        table.nextPage()
                    }
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}