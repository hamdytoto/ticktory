import { z } from "zod";
const schema = z
	.object({
		name: z.string().min(3, "Name must be at least 3 characters"),
		email: z.string().email("Invalid email format"),
		pass: z.string().min(8, "Password must be at least 8 characters"),
		confirmPass: z
			.string()
			.min(8, "Confirm Password must be at least 8 characters"),
	})
	.refine((data) => data.pass === data.confirmPass, {
		message: "Passwords must match",
		path: ["confirmPass"],
	});

export default schema;
