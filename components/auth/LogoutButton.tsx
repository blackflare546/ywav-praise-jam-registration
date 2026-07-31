"use client";

import { LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    const router = useRouter();

    const supabase = createClient();

    async function logout() {
        await supabase.auth.signOut();

        router.replace("/login");

        router.refresh();
    }

    return (
        <Button
            onClick={logout}
            size="lg"
            className="
        h-11
        rounded-xl
        bg-red-600
        px-6
        font-semibold
        text-white
        shadow-lg
        transition-all
        hover:bg-red-700
        hover:shadow-xl
        focus:ring-2
        focus:ring-red-400
    "
        >
            <LogOut className="mr-2 h-5 w-5" />

            Logout
        </Button>
    );
}