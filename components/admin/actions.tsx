"use client";

import { useState } from "react";

import {
    MoreHorizontal,
    CheckCircle2,
    RotateCcw,
    Mail,
} from "lucide-react";

import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

interface Props {
    registrant: any;
}

export default function RegistrantActions({
    registrant,
}: Props) {

    const [loading, setLoading] =
        useState(false);

    async function manualCheckIn() {

        setLoading(true);

        try {

            const res =
                await fetch("/api/manual-checkin", {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        id: registrant.id,
                    }),
                });

            const data =
                await res.json();

            if (!res.ok)
                throw new Error(data.error);

            toast.success(
                "Participant checked in."
            );

        } catch {

            toast.error(
                "Unable to check in participant."
            );

        } finally {

            setLoading(false);

        }

    }

    async function undoCheckIn() {

        setLoading(true);

        try {

            const res =
                await fetch("/api/manual-checkin", {
                    method: "DELETE",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        id: registrant.id,
                    }),
                });

            const data =
                await res.json();

            if (!res.ok)
                throw new Error(data.error);

            toast.success(
                "Check-in reverted."
            );

        } catch {

            toast.error(
                "Unable to undo check-in."
            );

        } finally {

            setLoading(false);

        }

    }

    async function resendEmail() {

        setLoading(true);

        try {

            const response = await fetch("/api/resend-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: registrant.id,
                }),
            });

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                    "Unable to resend email."
                );
            }

            toast.success(
                "Confirmation email sent."
            );

        }
        catch (error: any) {

            toast.error(
                error.message ??
                "Unable to resend email."
            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <AlertDialog>

            <DropdownMenu>

                <DropdownMenuTrigger asChild>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="
        h-9
        w-9
        rounded-lg
        text-gray-600
        hover:bg-emerald-100
        hover:text-emerald-700
    "
                    >
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>

                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="
        w-56
        rounded-xl
        border
        border-gray-200
        bg-white
        p-2
        shadow-xl
        text-gray-900
    "
                >

                    {registrant.is_checked_in ? (

                        <AlertDialogTrigger asChild>

                            <DropdownMenuItem
                                className="
        rounded-lg
        px-3
        py-2
        text-gray-700
        hover:bg-emerald-50
        hover:text-emerald-700
        focus:bg-emerald-100
        focus:text-emerald-700
        cursor-pointer
    "
                            >

                                <RotateCcw className="mr-2 h-4 w-4" />

                                Undo Check-In

                            </DropdownMenuItem>

                        </AlertDialogTrigger>

                    ) : (

                        <AlertDialogTrigger asChild>

                            <DropdownMenuItem
                                className="
        rounded-lg
        px-3
        py-2
        text-gray-700
        hover:bg-emerald-50
        hover:text-emerald-700
        focus:bg-emerald-100
        focus:text-emerald-700
        cursor-pointer
    "
                            >

                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />

                                Manual Check-In

                            </DropdownMenuItem>

                        </AlertDialogTrigger>

                    )}


                    <DropdownMenuItem
                        disabled={loading}
                        onClick={resendEmail}
                        className="
        rounded-lg
        px-3
        py-2
        text-gray-700
        hover:bg-emerald-50
        hover:text-emerald-700
        focus:bg-emerald-100
        focus:text-emerald-700
        cursor-pointer
    "
                    >
                        <Mail className="mr-2 h-4 w-4" />

                        {loading
                            ? "Sending..."
                            : "Resend Email"}
                    </DropdownMenuItem>


                </DropdownMenuContent>

            </DropdownMenu>

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>

                        {registrant.is_checked_in
                            ? "Undo Check-In?"
                            : "Manual Check-In?"}

                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        {registrant.name}

                        <br />

                        {registrant.email}

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>

                        Cancel

                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading}
                        onClick={() => {

                            if (
                                registrant.is_checked_in
                            ) {
                                undoCheckIn();
                            } else {
                                manualCheckIn();
                            }

                        }}
                    >

                        Confirm

                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );

}