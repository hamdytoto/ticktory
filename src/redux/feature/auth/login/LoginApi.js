export const loginApi = (builder) =>
	builder.mutation({
		query: (credentials) => ({
			url: "/auth/login",
			method: "POST",
			body: { ...credentials },
		}),
	});
