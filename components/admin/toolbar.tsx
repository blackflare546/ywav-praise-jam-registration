"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface Props<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: Props<TData>) {
    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Search registrants..."
                value={
                    (table
                        .getColumn("name")
                        ?.getFilterValue() as string) ??
                    ""
                }
                onChange={(event) =>
                    table
                        .getColumn("name")
                        ?.setFilterValue(
                            event.target.value
                        )
                }
                className="
    max-w-sm
    border-gray-300
    bg-white
    text-gray-900
    placeholder:text-gray-500
    "
            />
        </div>
    );
}