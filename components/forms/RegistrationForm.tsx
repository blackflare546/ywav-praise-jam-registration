"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";


import {
    registrationSchema,
    RegistrationFormData,
} from "@/lib/validation";

import { MINISTRIES } from "@/lib/ministries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";

export default function RegistrationForm() {
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            ministries: [],
        },
    });

    const selectedMinistries = watch("ministries");

    const toggleMinistry = (ministry: string) => {
        const current = selectedMinistries || [];

        if (current.includes(ministry)) {
            setValue(
                "ministries",
                current.filter((item) => item !== ministry),
                { shouldValidate: true }
            );
        } else {
            setValue(
                "ministries",
                [...current, ministry],
                { shouldValidate: true }
            );
        }
    };

    const onSubmit = async (data: RegistrationFormData) => {
        try {
            setLoading(true);

            // Generate a unique QR code value
            const qrCode = uuid();

            const { error } = await supabase
                .from("registrants")
                .insert({
                    name: data.name,
                    email: data.email,
                    ministries: data.ministries,
                    qr_code: qrCode,
                });

            if (error) {
                alert(error.message);
                return;
            }

            // Redirect to the thank you page
            router.push(`/thank-you?qr=${qrCode}`);

            await fetch("/api/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    ministries: data.ministries,
                    qr: qrCode,
                }),
            });

        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="text-3xl">
                    Youth Praise Jam
                </CardTitle>

                <p className="text-muted-foreground">
                    Register and choose the ministries you'd like to serve in.
                </p>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Name */}

                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Full Name
                        </Label>

                        <Input
                            id="name"
                            placeholder="Juan Dela Cruz"
                            {...register("name")}
                        />

                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}

                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email Address
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="juan@email.com"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Ministries */}

                    <div className="space-y-3">
                        <Label>
                            Ministries Interested
                        </Label>

                        <div className="grid grid-cols-2 gap-3">
                            {MINISTRIES.map((ministry) => (
                                <div
                                    key={ministry}
                                    className="flex items-center space-x-2 rounded-lg border p-3"
                                >
                                    <Checkbox
                                        checked={selectedMinistries.includes(ministry)}
                                        onCheckedChange={() =>
                                            toggleMinistry(ministry)
                                        }
                                    />

                                    <Label className="cursor-pointer">
                                        {ministry}
                                    </Label>
                                </div>
                            ))}
                        </div>

                        {errors.ministries && (
                            <p className="text-sm text-red-500">
                                {errors.ministries.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}