"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

interface DatePickerProps {
    value?: Date;
    onChange: (date: Date | undefined) => void;
}

export default function DatePicker({
    value,
    onChange,
}: DatePickerProps) {
    const [open, setOpen] =
        React.useState(false);

    const ref =
        React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(
            event: MouseEvent
        ) {
            if (
                ref.current &&
                !ref.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <div
            ref={ref}
            className="relative"
        >
            <button
                type="button"
                onClick={() =>
                    setOpen(!open)
                }
                className="
                    flex
                    h-12
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    text-left
                    shadow-sm
                    transition
                    hover:border-emerald-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500
                "
            >
                <span
                    className={
                        value
                            ? "text-gray-900"
                            : "text-gray-400"
                    }
                >
                    {value
                        ? format(
                            value,
                            "MMMM d, yyyy"
                        )
                        : "Select birthday"}
                </span>

                <CalendarIcon
                    size={18}
                    className="text-emerald-600"
                />
            </button>

            {open && (
                <div
                    className="
                        absolute
                        left-0
                        z-50
                        mt-2
                        rounded-2xl
                        border
                        bg-white
                        p-4
                        shadow-2xl
                    "
                >
                    <DayPicker
                        mode="single"
                        selected={value}
                        onSelect={(date) => {
                            onChange(date);
                            setOpen(false);
                        }}
                        captionLayout="dropdown-buttons"
                        fromYear={1950}
                        toYear={
                            new Date().getFullYear()
                        }
                    />
                </div>
            )}
        </div>
    );
}