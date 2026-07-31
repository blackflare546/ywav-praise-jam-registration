import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { transporter } from "@/lib/email";
import { generateQRCodeBuffer } from "@/lib/generateQR";

export async function POST(request: Request) {
	try {
		const { id } = await request.json();

		if (!id) {
			return NextResponse.json(
				{
					success: false,
					message: "Registrant ID is required.",
				},
				{
					status: 400,
				},
			);
		}

		const supabase = await createClient();

		const { data, error } = await supabase
			.from("registrants")
			.select("*")
			.eq("id", id)
			.single();

		if (error || !data) {
			return NextResponse.json(
				{
					success: false,
					message: "Registrant not found.",
				},
				{
					status: 404,
				},
			);
		}

		const qrBuffer = await generateQRCodeBuffer(data.qr_code);

		await transporter.sendMail({
			from: `"Youth With A Vision Praise Jam" <${process.env.GMAIL_USER}>`,

			to: data.email,

			subject: "Youth With A Vision Praise Jam Registration Confirmation",

			html: `
<div style="font-family:Arial,sans-serif;background:#f4f7f6;padding:40px 0;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.08);">

        <div style="background:#059669;padding:30px;text-align:center;color:white;">
            <h1 style="margin:0;font-size:28px;">
                🎉 Registration Confirmed
            </h1>

            <p style="margin-top:10px;font-size:16px;">
                Youth With A Vision Praise Jam
            </p>
        </div>

        <div style="padding:35px;">

            <p>Hello <strong>${data.name}</strong>,</p>

           <p>
                Thank you for registering for our
                <strong>Youth With A Vision Praise Jam.</strong>
            </p>

            <h3>Your Ministries</h3>

            <ul>
                ${data.ministries.map((m: string) => `<li>${m}</li>`).join("")}
            </ul>

            <div style="text-align:center;margin:40px 0;">
                <img
                    src="cid:qrcode"
                    width="240"
                    height="240"
                    alt="QR Code"
                />
            </div>

            <div
                style="
                    background:#ecfdf5;
                    border:1px solid #a7f3d0;
                    padding:18px;
                    border-radius:12px;
                "
            >
                <strong>Event Reminder</strong>

                <p style="margin:10px 0 0;">
                    Please present this QR Code during
                    event registration.
                </p>

                <p>
                    If you cannot find this email,
                    please check your Spam folder.
                </p>
            </div>

        </div>

        <div
            style="
                background:#f8fafc;
                padding:20px;
                text-align:center;
                font-size:12px;
                color:#6b7280;
            "
        >
            Youth With A Vision Praise Jam Registration System
        </div>

    </div>
</div>
`,

			attachments: [
				{
					filename: "YouthPraiseJam-QR.png",
					content: qrBuffer,
					contentType: "image/png",
					cid: "qrcode",
				},
			],
		});

		return NextResponse.json({
			success: true,
			message: "Confirmation email sent.",
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{
				success: false,
				message: "Unable to send email.",
			},
			{
				status: 500,
			},
		);
	}
}
