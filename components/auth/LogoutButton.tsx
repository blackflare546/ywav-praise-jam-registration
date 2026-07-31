"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    const router = useRouter();

    async function logout() {
        const supabase = createClient();

        await supabase.auth.signOut();

        router.replace("/login");

        router.refresh();
    }

    return (
        <Button
            onClick={logout}
            className="
                bg-red-500
                text-white
                hover:bg-red-600
            "
        >
            <LogOut className="mr-2 h-4 w-4" />

            Logout
        </Button>
    );
}