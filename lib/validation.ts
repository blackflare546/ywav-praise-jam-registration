import { z } from "zod";

export const registrationSchema = z.object({
	name: z.string().trim().min(2, "Name is required"),

	email: z.email("Invalid email address"),

	ministries: z.array(z.string()).min(1, "Select at least one ministry"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
