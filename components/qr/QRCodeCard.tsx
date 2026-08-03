"use client";

import QRCode from "react-qr-code";
import { forwardRef } from "react";

interface Props {
    value: string;
}

const QRCodeCard = forwardRef<HTMLDivElement, Props>(
    ({ value }, ref) => {

        return (

            <div
                ref={ref}
                id="qr-card"
                className="
        inline-block
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-lg
    "
            >
                <QRCode
                    value={value}
                    size={220}
                />
            </div>

        );

    });

QRCodeCard.displayName = "QRCodeCard";

export default QRCodeCard;