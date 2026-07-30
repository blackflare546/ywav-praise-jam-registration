import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
	const { id } = await request.json();

	const supabase = await createClient();

	const { error } = await supabase
		.from("registrants")
		.update({
			is_checked_in: true,
			checked_in_at: new Date().toISOString(),
		})
		.eq("id", id);

	if (error) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{
				status: 500,
			},
		);
	}

	return NextResponse.json({
		success: true,
	});
}

export async function DELETE(request: Request) {
	const { id } = await request.json();

	const supabase = await createClient();

	const { error } = await supabase
		.from("registrants")
		.update({
			is_checked_in: false,
			checked_in_at: null,
		})
		.eq("id", id);

	if (error) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{
				status: 500,
			},
		);
	}

	return NextResponse.json({
		success: true,
	});
}
