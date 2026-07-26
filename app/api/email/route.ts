import { NextResponse } from "next/server";
import { transporter } from "@/lib/email";
import { generateQRCodeBuffer } from "@/lib/generateQR";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// const qrImage = await generateQRCode(body.qr);

		const qrBuffer = await generateQRCodeBuffer(body.qr);

		await transporter.sendMail({
			from: `"Youth Praise Jam" <${process.env.GMAIL_USER}>`,
			to: body.email,
			subject: "Youth With A Vision Praise Jam Registration Confirmation",

			html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">
      <h2>🎉 Registration Successful</h2>

      <p>Hello <strong>${body.name}</strong>,</p>

      <p>
        Thank you for registering for our
        <strong>Youth With A Vision Praise Jam</strong>.
      </p>

      <h3>Your Ministries</h3>

      <ul>
        ${body.ministries.map((m: string) => `<li>${m}</li>`).join("")}
      </ul>

      <div style="text-align:center;margin:30px 0;">
        <img
          src="cid:qr-code"
          width="220"
          height="220"
          alt="QR Code"
        />
      </div>

      <p>
        Please present this QR Code during event check-in.
      </p>

      <hr />

      <p style="font-size:12px;color:#666;">
        Youth With A Vision Praise Jam Registration System
      </p>
    </div>
  `,

			attachments: [
				{
					filename: "YouthPraiseJam-QR.png",
					content: qrBuffer,
					contentType: "image/png",
					cid: "qr-code",
				},
			],
		});

		return NextResponse.json({
			success: true,
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{
				success: false,
				error: "Unable to send email",
			},
			{
				status: 500,
			},
		);
	}
}
