import QRScanner from "@/components/qr/QRScanner";

export default function ScanPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 p-6">
            <QRScanner />
        </main>
    );
}