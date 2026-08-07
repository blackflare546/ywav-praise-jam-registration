"use client";

import {
    Calendar,
    Mail,
    MapPin,
    Phone,
    User,
    Cake,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

interface Props {
    registrant: any;
    children: React.ReactNode;
}

export default function RegistrantDetailsDialog({
    registrant,
    children,
}: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="bg-white p-10">

                <DialogHeader>
                    <DialogTitle className="text-2xl text-emerald-600">
                        Participant Details
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">

                    {/* Name */}

                    <div className="rounded-xl bg-emerald-50 p-5">

                        <div className="flex items-center gap-3">

                            <div className="rounded-full bg-emerald-300 p-3 text-white">
                                <User size={22} />
                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    {registrant.name}
                                </h2>

                                <p className="text-gray-600">
                                    {registrant.email}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Information */}

                    <div className="grid gap-4 md:grid-cols-2">

                        <InfoCard
                            icon={<Mail size={18} />}
                            title="Email"
                            value={registrant.email}
                        />

                        <InfoCard
                            icon={<Phone size={18} />}
                            title="Cell Number"
                            value={registrant.cell_number}
                        />

                        <InfoCard
                            icon={<Cake size={18} />}
                            title="Age"
                            value={`${registrant.age}`}
                        />

                        <InfoCard
                            icon={<Calendar size={18} />}
                            title="Birthday"
                            value={new Date(
                                registrant.birthday
                            ).toLocaleDateString()}
                        />

                    </div>

                    <InfoCard
                        icon={<MapPin size={18} />}
                        title="Address"
                        value={registrant.address}
                    />

                    <div>

                        <h3 className="mb-3 font-semibold text-gray-800">
                            Ministries
                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {registrant.ministries.map(
                                (m: string) => (
                                    <Badge
                                        key={m}
                                        className="
                                            bg-emerald-100
                                            text-emerald-700
                                        "
                                    >
                                        {m}
                                    </Badge>
                                )
                            )}

                        </div>

                    </div>

                    <div>

                        <h3 className="mb-3 font-semibold text-gray-800">
                            Attendance
                        </h3>

                        {registrant.is_checked_in ? (
                            <Badge className="bg-green-100 text-green-700">
                                ✓ Checked In
                            </Badge>
                        ) : (
                            <Badge className="bg-orange-100 text-orange-700">
                                Pending
                            </Badge>
                        )}

                    </div>

                </div>

            </DialogContent>
        </Dialog>
    );
}

function InfoCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border bg-gray-50 p-4">

            <div className="mb-2 flex items-center gap-2 text-emerald-700">

                {icon}

                <span className="text-sm font-semibold">
                    {title}
                </span>

            </div>

            <p className="break-words text-gray-800">
                {value}
            </p>

        </div>
    );
}