import QRCode from "qrcode";

/**
 * Generate a PNG Buffer for email attachments.
 */
export async function generateQRCodeBuffer(value: string) {
	return QRCode.toBuffer(value, {
		type: "png",
		width: 600,
		margin: 2,
		errorCorrectionLevel: "H",
	});
}

/**
 * Generate a Base64 Data URL.
 * Useful for previews or APIs.
 */
export async function generateQRCodeDataURL(value: string) {
	return QRCode.toDataURL(value, {
		width: 600,
		margin: 2,
		errorCorrectionLevel: "H",
	});
}

/**
 * Generate an SVG string.
 * Useful if you ever need vector graphics.
 */
export async function generateQRCodeSVG(value: string) {
	return QRCode.toString(value, {
		type: "svg",
		margin: 2,
		errorCorrectionLevel: "H",
	});
}
