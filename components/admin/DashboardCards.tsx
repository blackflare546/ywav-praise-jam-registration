"use client";

import { Users, CheckCircle2, Clock3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Props {
    registrants: any[];
}

export default function DashboardCards({
    registrants,
}: Props) {

    const total = registrants.length;

    const checked = registrants.filter(
        (r) => r.is_checked_in
    ).length;

    const pending = total - checked;

    return (
        <div className="grid gap-6 md:grid-cols-3">

            <Card className="rounded-2xl border-0 bg-white p-6 shadow-lg">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500">
                            Total Registrants
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-emerald-600">

                            {total}

                        </h2>

                    </div>

                    <Users
                        className="text-emerald-600"
                        size={40}
                    />

                </div>

            </Card>

            <Card className="rounded-2xl border-0 bg-white p-6 shadow-lg">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500">
                            Checked In
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-green-600">

                            {checked}

                        </h2>

                    </div>

                    <CheckCircle2
                        className="text-green-600"
                        size={40}
                    />

                </div>

            </Card>

            <Card className="rounded-2xl border-0 bg-white p-6 shadow-lg">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500">
                            Pending
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-orange-500">

                            {pending}

                        </h2>

                    </div>

                    <Clock3
                        className="text-orange-500"
                        size={40}
                    />

                </div>

            </Card>

        </div>
    );
}