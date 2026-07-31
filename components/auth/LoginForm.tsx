"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
    const router = useRouter();

    const supabase = createClient();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    async function signIn() {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Welcome!");

        router.replace("/admin");

        router.refresh();
    }

    return (
        <Card className="w-full max-w-md rounded-3xl border-0 bg-white shadow-2xl">

            <CardHeader className="space-y-3 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <LogIn className="h-8 w-8 text-emerald-700" />
                </div>

                <CardTitle className="text-3xl font-bold text-emerald-700">
                    Admin Login
                </CardTitle>

                <p className="text-sm text-gray-600">
                    Sign in to manage registrations and attendance.
                </p>

            </CardHeader>

            <CardContent className="space-y-5">

                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                        Email
                    </Label>

                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
        h-11
        border-gray-300
        bg-white
        text-gray-900
        placeholder:text-gray-400
        focus:border-emerald-500
        focus:ring-emerald-500
    "
                        placeholder="Enter your email"
                    />
                </div>

                <div className="space-y-2">

                    <Label className="text-sm font-medium text-gray-700">
                        Password
                    </Label>

                    <div className="relative">

                        <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
            h-11
            border-gray-300
            bg-white
            pr-10
            text-gray-900
            placeholder:text-gray-400
            focus:border-emerald-500
            focus:ring-emerald-500
        "
                            placeholder="Enter your password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-emerald-600
        "
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>

                    </div>

                </div>

                <Button
                    onClick={signIn}
                    disabled={loading}
                    className="
        h-11
        w-full
        bg-emerald-600
        text-white
        hover:bg-emerald-700
    "
                >
                    {loading ? "Signing In..." : "Sign In"}
                </Button>
            </CardContent>

        </Card>
    );
}