"use client";

import QRCode from "react-qr-code";

interface Props {
    value: string;
}

export default function QRCodeCard({ value }: Props) {
    return (
        <div
            id="qr-card"
            className="bg-white rounded-xl p-6 shadow-md flex justify-center"
        >
            <QRCode
                value={value}
                size={220}
            />
        </div>
    );
}