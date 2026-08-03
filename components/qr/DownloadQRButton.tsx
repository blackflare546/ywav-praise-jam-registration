"use client";

import { Button } from "@/components/ui/button";

interface Props {
    filename: string;
}

export default function DownloadQRButton({
    filename,
}: Props) {
    const downloadQR = () => {
        const svg = document.querySelector("#qr-card svg");

        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        const svgBlob = new Blob([svgString], {
            type: "image/svg+xml;charset=utf-8",
        });

        const url = URL.createObjectURL(svgBlob);

        const img = new Image();

        img.onload = () => {
            const qrSize = 220;

            const scale = 4;

            // White border around the QR (quiet zone)
            const padding = 12;

            const canvas = document.createElement("canvas");

            canvas.width = (qrSize + padding * 2) * scale;
            canvas.height = (qrSize + padding * 2) * scale;

            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            // White background
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw QR with padding
            ctx.drawImage(
                img,
                padding * scale,
                padding * scale,
                qrSize * scale,
                qrSize * scale
            );

            const pngUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");

            link.href = pngUrl;
            link.download = `${filename}.png`;

            link.click();

            URL.revokeObjectURL(url);
        };

        img.src = url;
    };

    return (
        <div className="flex justify-center">

            <Button
                onClick={downloadQR}
                className="
                rounded-xl
                bg-emerald-600
                px-8
                py-6
                text-white
                font-semibold
                hover:bg-emerald-700
                shadow-lg
            "
            >
                Download QR Code
            </Button>

        </div>
    );
}