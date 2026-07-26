import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const supabase = await createClient();

		const { data } = await supabase
			.from("registrants")
			.select("*")
			.eq("qr_code", body.qr)
			.single();

		if (!data) {
			return NextResponse.json({
				status: "not_found",
				message: "QR Code not recognized.",
			});
		}

		if (data.is_checked_in) {
			return NextResponse.json({
				status: "already_checked_in",
				message: `${data.name} has already checked in.`,
			});
		}

		await supabase
			.from("registrants")
			.update({
				is_checked_in: true,
				checked_in_at: new Date().toISOString(),
			})
			.eq("id", data.id);

		return NextResponse.json({
			status: "success",
			message: `Welcome ${data.name}! Attendance recorded.`,
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{
				status: "error",
				message: "Something went wrong.",
			},
			{
				status: 500,
			},
		);
	}
}
