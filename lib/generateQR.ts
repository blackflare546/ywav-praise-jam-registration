import QRCode from "qrcode";

export async function generateQRCode(value: string) {
	return QRCode.toDataURL(value);
}
