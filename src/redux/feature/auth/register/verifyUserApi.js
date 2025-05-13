export const verifyUserApi = (builder) =>
	builder.mutation({
		query: (credentials) => ({
			url: "/auth/verify_user",
			method: "POST",
			body: { ...credentials },
		}),
	});
