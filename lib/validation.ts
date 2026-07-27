import { z } from "zod";

export const registrationSchema = z.object({
	name: z.string().trim().min(2, "Name is required"),

	email: z.email("Invalid email address"),

	cell_number: z.string().min(11, "Cell number is required").max(15),

	birthday: z.string(),

	age: z
		.number({
			error: "Age is required",
		})
		.min(10, "Age must be at least 10")
		.max(100, "Age must not exceed 100"),

	address: z.string().min(5, "Address is required"),

	ministries: z.array(z.string()).min(1, "Select at least one ministry"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
