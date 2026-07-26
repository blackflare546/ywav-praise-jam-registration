import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-5xl font-bold">
          Youth Praise Jam
        </h1>

        <p className="text-slate-600">
          Register to join our ministries.
        </p>

        <Button asChild>
          <Link href="/register">
            Register Now
          </Link>
        </Button>
      </div>
    </main>
  );
}