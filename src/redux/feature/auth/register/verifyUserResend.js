export const verifyUserResendApi = (builder) =>
	builder.mutation({
		query: (credentials) => ({
			url: "/auth/verify_user/resend",
			method: "POST",
			body: { ...credentials },
		}),
	});
