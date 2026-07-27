export interface Registrant {
	id: string;

	name: string;

	email: string;

	cell_number: string;

	address: string;

	birthday: string;

	age: number;

	ministries: string[];

	qr_code: string;

	is_checked_in: boolean;

	checked_in_at: string | null;

	created_at: string;
}
