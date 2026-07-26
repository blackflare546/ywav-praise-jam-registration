import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CalendarDays,
  Clock,
} from "lucide-react";


export default function Home() {
  return (
    <main
      className="
      relative
      min-h-screen
      flex
      items-center
      justify-center
      overflow-hidden
      "
    >

      {/* Background Image */}

      <div
        className="
        absolute
        inset-0
        bg-cover
        bg-center
        "
        style={{
          backgroundImage:
            "url('/images/praise-jam.jpg')",
        }}
      />


      {/* Dark Overlay */}

      <div
        className="
        absolute
        inset-0
        bg-black/60
        "
      />



      {/* Content */}

      <div
        className="
        relative
        z-10
        mx-auto
        max-w-5xl
        px-6
        text-center
        text-white
        "
      >


        <p
          className="
          mb-5
          inline-flex
          rounded-full
          bg-emerald-500/80
          px-5
          py-2
          text-sm
          font-semibold
          "
        >
          Youth Event Registration
        </p>



        <h1
          className="
          text-5xl
          font-extrabold
          leading-tight
          md:text-7xl
          "
        >
          Youth With a Vision
          <br />
          Praise Jam
        </h1>



        <p
          className="
          mx-auto
          mt-6
          max-w-2xl
          text-lg
          text-gray-200
          md:text-xl
          "
        >
          Lift up your voice. Life up His name. Let's praise together!
        </p>



        {/* Event Details */}

        <div
          className="
          mx-auto
          mt-10
          flex
          flex-col
          justify-center
          gap-4
          text-sm
          md:flex-row
          "
        >


          <div
            className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white/10
            px-5
            py-3
            backdrop-blur
            "
          >

            <CalendarDays />

            Friday

          </div>



          <div
            className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white/10
            px-5
            py-3
            backdrop-blur
            "
          >

            <Clock />

            6:00 PM

          </div>



          <div
            className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white/10
            px-5
            py-3
            backdrop-blur
            "
          >

            <MapPin />

            At the Back of Julies Bakeshop, Brgy. Galas Dipolog City

          </div>


        </div>



        <Button
          asChild
          size="lg"
          className="
          mt-12
          rounded-full
          bg-emerald-500
          px-12
          py-7
          text-lg
          font-bold
          hover:bg-emerald-600
          "
        >

          <Link href="/register">
            Register Now
          </Link>

        </Button>



      </div>


    </main>
  );
}