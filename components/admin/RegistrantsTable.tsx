"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
    registrants: any[];
}

const ministries = [
    "All",
    "Singer",
    "Instruments",
    "Media",
    "Dance",
    "Usher",
    "Sounds",
];

export default function RegistrantsTable({
    registrants,
}: Props) {

    const [search, setSearch] = useState("");

    const [filter, setFilter] =
        useState("All");

    const filtered = useMemo(() => {

        return registrants.filter((r) => {

            const matchesSearch =
                r.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                r.email
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesMinistry =
                filter === "All" ||
                r.ministries.includes(filter);

            return (
                matchesSearch &&
                matchesMinistry
            );
        });

    }, [registrants, search, filter]);

    return (
        <div className="rounded-2xl bg-white p-6 shadow-lg">

            <div className="mb-6 flex flex-col gap-4 md:flex-row">

                <div className="relative flex-1">

                    <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                    />

                    <Input
                        placeholder="Search..."
                        className="pl-10"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <select
                    className="rounded-lg border p-2"
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >
                    {ministries.map((m) => (
                        <option
                            key={m}
                            value={m}
                        >
                            {m}
                        </option>
                    ))}
                </select>

            </div>

            <p className="
mb-4
text-sm
text-gray-500
">

                Showing {filtered.length} of {registrants.length} registrants

            </p>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="py-3 text-left">
                                Name
                            </th>

                            <th className="text-left">
                                Email
                            </th>

                            <th className="text-left">
                                Ministries
                            </th>

                            <th className="text-left">
                                Status
                            </th>

                            <th className="text-left">
                                Checked In At
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="
py-12
text-center
text-gray-500
"
                                >

                                    <div>

                                        <div className="text-4xl">
                                            🔍
                                        </div>


                                        <p className="mt-3">
                                            No registrants found
                                        </p>


                                        <p className="text-sm">
                                            Try changing your search or filter
                                        </p>


                                    </div>


                                </td>

                            </tr>


                        ) : (

                            filtered.map((r) => (

                                <tr
                                    key={r.id}
                                    className="border-b"
                                >

                                    <td className="py-4 font-medium">
                                        {r.name}
                                    </td>


                                    <td>
                                        {r.email}
                                    </td>


                                    <td>

                                        {r.ministries.join(", ")}

                                    </td>


                                    <td>


                                        {r.is_checked_in ? (

                                            <span
                                                className="
rounded-full
bg-green-100
px-3
py-1
text-xs
font-medium
text-green-700
"
                                            >
                                                ✅ Checked In
                                            </span>


                                        ) : (


                                            <span
                                                className="
rounded-full
bg-orange-100
px-3
py-1
text-xs
font-medium
text-orange-700
"
                                            >
                                                ⏳ Pending
                                            </span>


                                        )}


                                    </td>


                                    <td>

                                        {r.checked_in_at
                                            ?
                                            new Date(
                                                r.checked_in_at
                                            ).toLocaleString()
                                            :
                                            "-"
                                        }

                                    </td>


                                </tr>


                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}