"use client";

import { columns, Registrant } from "./columns";
import { DataTable } from "./data-table";

interface Props {
    data: Registrant[];
}

export default function RegistrantsTable({
    data,
}: Props) {
    return (
        <DataTable
            columns={columns}
            data={data}
        />
    );
}