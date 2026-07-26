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
                className="bg-white rounded-xl p-6 inline-block"
            >

                <QRCode
                    value={value}
                    size={250}
                />

            </div>

        );

    });

QRCodeCard.displayName = "QRCodeCard";

export default QRCodeCard;