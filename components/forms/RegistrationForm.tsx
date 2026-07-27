"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import DatePicker from "@/components/ui/date-picker";

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
        control,
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

                    cell_number: data.cell_number,

                    birthday: data.birthday,

                    age: data.age,

                    address: data.address,

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
        <Card
            className="
    overflow-hidden
    rounded-3xl
    border
    border-gray-200
    bg-white
    shadow-xl
    "
        >

            {/* Header */}

            <CardHeader
                className="
            bg-gradient-to-r
            from-emerald-700
            to-green-500
            p-8
            text-white
            "
            >

                <CardTitle
                    className="
                text-3xl
                font-extrabold
                md:text-4xl
                "
                >
                    Youth With a Vision
                    <br />
                    Praise Jam
                </CardTitle>


                <p
                    className="
                mt-3
                text-emerald-50
                "
                >
                    Register your details and choose
                    the ministry where you want to serve.
                </p>


            </CardHeader>



            <CardContent
                className="
    bg-white
    p-6
    text-gray-900
    md:p-8
    "
            >

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="
                space-y-7
                "
                >


                    {/* Name */}

                    <div className="space-y-2">


                        <Label
                            className="
                        text-base
                        font-semibold
                        text-gray-900
                        "
                        >
                            Full Name
                        </Label>


                        <Input
                            id="name"
                            placeholder=""
                            className="
                        h-12
                        rounded-xl
                        text-base
                        "
                            {...register("name")}
                        />


                        {errors.name && (
                            <p
                                className="
                            text-sm
                            text-red-500
                            "
                            >
                                {errors.name.message}
                            </p>
                        )}

                    </div>



                    {/* Email */}

                    <div className="space-y-2">


                        <Label
                            className="
                        text-base
                        font-semibold
                        text-gray-900
                        "
                        >
                            Email Address
                        </Label>


                        <Input
                            id="email"
                            type="email"
                            className="
                        h-12
                        rounded-xl
                        text-base
                        "
                            {...register("email")}
                        />


                        {errors.email && (
                            <p
                                className="
                            text-sm
                            text-red-500
                            "
                            >
                                {errors.email.message}
                            </p>
                        )}


                    </div>


                    {/* Cell Number */}

                    <div className="space-y-2">


                        <Label
                            className="
                        text-base
                        font-semibold
                        text-gray-900
                        "
                        >
                            Cell Number
                        </Label>


                        <Input
                            type="tel"
                            placeholder="09XXXXXXXXX"
                            {...register("cell_number")}
                        />

                        {errors.cell_number && (
                            <p
                                className="
                            text-sm
                            text-red-500
                            "
                            >
                                {errors.cell_number.message}
                            </p>
                        )}

                    </div>

                    {/* Birthday */}

                    <div className="space-y-2">
                        <Label
                            className="
        text-base
        font-semibold
        text-gray-900
        "
                        >
                            Birthday
                        </Label>

                        <Controller
                            control={control}
                            name="birthday"
                            render={({ field }) => (
                                <DatePicker
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                            : undefined
                                    }
                                    onChange={(date) => {
                                        field.onChange(
                                            date
                                                ? date.toISOString()
                                                : ""
                                        );
                                    }}
                                />
                            )}
                        />

                        {errors.birthday && (
                            <p className="text-sm text-red-500">
                                {errors.birthday.message}
                            </p>
                        )}
                    </div>

                    {/* Age */}

                    <div className="space-y-2">


                        <Label
                            className="
                        text-base
                        font-semibold
                        text-gray-900
                        "
                        >
                            Age
                        </Label>


                        <Input
                            type="number"
                            min={10}
                            max={100}
                            {...register("age", {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.age && (
                            <p
                                className="
                            text-sm
                            text-red-500
                            "
                            >
                                {errors.age.message}
                            </p>
                        )}

                    </div>

                    {/* Address */}

                    <div className="space-y-2">


                        <Label
                            className="
                        text-base
                        font-semibold
                        text-gray-900
                        "
                        >
                            Address
                        </Label>


                        <Input
                            placeholder="Barangay, City"
                            {...register("address")}
                        />

                        {errors.address && (
                            <p
                                className="
                            text-sm
                            text-red-500
                            "
                            >
                                {errors.address.message}
                            </p>
                        )}

                    </div>

                    {/* Ministries */}

                    <div className="space-y-3">


                        <div>

                            <Label
                                className="
                            text-base
                            font-semibold
                            text-gray-900
                            "
                            >
                                Ministries Interested
                            </Label>


                            <p
                                className="
                            mt-1
                            text-sm
                            text-gray-500
                            "
                            >
                                Select one or more areas where
                                you would like to volunteeer.
                            </p>


                        </div>



                        <div
                            className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                        "
                        >

                            {MINISTRIES.map((ministry) => (

                                <label
                                    key={ministry}
                                    className={`
                                flex
                                cursor-pointer
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                p-4
                                transition
                                hover:border-emerald-500
                                hover:bg-emerald-50
                                ${selectedMinistries.includes(ministry)
                                            ?
                                            "border-emerald-600 bg-emerald-50"
                                            :
                                            "border-gray-200"
                                        }
                                `}
                                >


                                    <Checkbox
                                        checked={
                                            selectedMinistries.includes(
                                                ministry
                                            )
                                        }
                                        onCheckedChange={() =>
                                            toggleMinistry(
                                                ministry
                                            )
                                        }
                                    />


                                    <span
                                        className="
                                    font-medium
                                    text-gray-900
                                    "
                                    >
                                        {ministry}
                                    </span>


                                </label>


                            ))}

                        </div>



                        {errors.ministries && (

                            <p
                                className="
                            text-sm
                            text-red-500
                            "
                            >
                                {errors.ministries.message}
                            </p>

                        )}


                    </div>




                    {/* Button */}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="
                    h-14
                    w-full
                    rounded-xl
                    bg-emerald-600
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    hover:bg-emerald-700
                    "
                    >

                        {
                            loading
                                ?
                                "Registering..."
                                :
                                "Register Now"
                        }

                    </Button>



                </form>


            </CardContent>


        </Card>
    );
}