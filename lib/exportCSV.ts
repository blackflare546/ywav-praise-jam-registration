export function exportRegistrantsCSV(registrants: any[]) {
	const headers = [
		"Full Name",
		"Email",
		"Cell Number",
		"Birthday",
		"Age",
		"Address",
		"Ministries",
		"Checked In",
		"Checked In At",
		"Registered At",
	];

	const rows = registrants.map((r) => [
		r.name ?? "",
		r.email ?? "",
		r.cell_number ?? "",
		r.birthday ? new Date(r.birthday).toLocaleDateString() : "",
		r.age ?? "",
		r.address ?? "",
		Array.isArray(r.ministries) ? r.ministries.join(", ") : "",
		r.is_checked_in ? "Yes" : "No",
		r.checked_in_at ? new Date(r.checked_in_at).toLocaleString() : "",
		r.created_at ? new Date(r.created_at).toLocaleString() : "",
	]);

	const csv = [headers, ...rows]
		.map((row) =>
			row
				.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
				.join(","),
		)
		.join("\n");

	const blob = new Blob([csv], {
		type: "text/csv;charset=utf-8;",
	});

	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");

	link.href = url;

	link.download = `ywv-praise-jam-${
		new Date().toISOString().split("T")[0]
	}.csv`;

	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);

	URL.revokeObjectURL(url);
}
