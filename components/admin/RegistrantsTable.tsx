"use client";

import { Registrant } from "./columns";
import { DataTable } from "./data-table";

interface Props {
    registrants: Registrant[];
}

export default function RegistrantsTable({
    registrants,
}: Props) {
    return (
        <DataTable
            data={registrants}
        />
    );
}