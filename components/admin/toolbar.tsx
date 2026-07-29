"use client";

import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props<TData> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
}

const ministries = [
    "Singer",
    "Instrument",
    "Media",
    "Dance",
    "Usher",
    "Sounds",
];

export function DataTableToolbar<TData>({
    table,
    globalFilter,
    setGlobalFilter,
}: Props<TData>) {
    return (
        <div
            className="
            flex
            flex-col
            gap-4
            border-b
            bg-gray-50
            p-5
            md:flex-row
            md:items-center
            md:justify-between
            "
        >
            <div className="relative w-full md:max-w-md">

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
                    placeholder="Search name or email..."
                    value={globalFilter}
                    onChange={(e) =>
                        setGlobalFilter(e.target.value)
                    }
                    className="
                    h-11
                    border-gray-300
                    bg-white
                    pl-10
                    text-gray-900
                    placeholder:text-gray-500
                    "
                />

            </div>

            <Select
                value={
                    (table
                        .getColumn("ministries")
                        ?.getFilterValue() as string) ?? "all"
                }
                onValueChange={(value) =>
                    table
                        .getColumn("ministries")
                        ?.setFilterValue(
                            value === "all"
                                ? undefined
                                : value
                        )
                }
            >
                <SelectTrigger
                    className="
        h-11
        w-full
        md:w-60
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        text-sm
        font-medium
        text-gray-700
        shadow-sm
        transition-all
        hover:border-emerald-400
        hover:bg-emerald-50
        focus:border-emerald-500
        focus:ring-2
        focus:ring-emerald-200
        "
                >
                    <SelectValue placeholder="All Ministries" />
                </SelectTrigger>

                <SelectContent
                    className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-2
        shadow-xl
        "
                >
                    <SelectItem
                        value="all"
                        className="
            rounded-lg
            px-3
            py-2
            text-gray-700
            focus:bg-emerald-100
            focus:text-emerald-700
            "
                    >
                        All Ministries
                    </SelectItem>

                    {ministries.map((m) => (
                        <SelectItem
                            key={m}
                            value={m}
                            className="
                rounded-lg
                px-3
                py-2
                text-gray-700
                focus:bg-emerald-100
                focus:text-emerald-700
                "
                        >
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    );
}