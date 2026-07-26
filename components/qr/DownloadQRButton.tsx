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
            const canvas = document.createElement("canvas");

            // Increase resolution for a sharper PNG
            const scale = 4;

            canvas.width = 220 * scale;
            canvas.height = 220 * scale;

            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            // White background
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
        <Button
            onClick={downloadQR}
            className="w-full"
        >
            Download QR Code
        </Button>
    );
}