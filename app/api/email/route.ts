import { NextResponse } from "next/server";
import { transporter } from "@/lib/email";
import { generateQRCode } from "@/lib/generateQR";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const qrImage = await generateQRCode(body.qr);

		await transporter.sendMail({
			from: `"Youth Praise Jam" <${process.env.GMAIL_USER}>`,
			to: body.email,
			subject: "Youth Praise Jam Registration Confirmation",
			html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">
          <h2>🎉 Registration Successful</h2>

          <p>Hello <strong>${body.name}</strong>,</p>

          <p>
            Thank you for registering for our
            <strong>Youth Praise Jam</strong>.
          </p>

          <h3>Your Ministries</h3>

          <ul>
            ${body.ministries.map((m: string) => `<li>${m}</li>`).join("")}
          </ul>

          <div style="text-align:center;margin:30px 0;">
            <img
              src="${qrImage}"
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
            Youth Praise Jam Registration System
          </p>
        </div>
      `,
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
