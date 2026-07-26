import { createClient } from "./supabase/client";

export async function uploadQR(blob: Blob, filename: string) {
	const supabase = createClient();

	const { error } = await supabase.storage
		.from("qr-codes")
		.upload(filename, blob, {
			upsert: true,
			contentType: "image/png",
		});

	if (error) {
		throw error;
	}

	const { data } = supabase.storage.from("qr-codes").getPublicUrl(filename);

	return data.publicUrl;
}
