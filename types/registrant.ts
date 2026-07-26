export interface Registrant {
	id: string;
	name: string;
	email: string;
	ministries: string[];
	qr_code: string;
	is_checked_in: boolean;
	checked_in_at: string | null;
	created_at: string;
}
