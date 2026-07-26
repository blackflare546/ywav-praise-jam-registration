export const MINISTRIES = [
	"Singer",
	"Instrument",
	"Media",
	"Dance",
	"Usher",
	"Sounds",
] as const;

export type Ministry = (typeof MINISTRIES)[number];
