export const forgetPasswordApi = (builder) =>
	builder.mutation({
		query: (credentials) => ({
			url: "/auth/password/forgot_password",
			method: "POST",
			body: { ...credentials },
		}),
	});

export const resetPasswordApi = (builder) =>
	builder.mutation({
		query: (credentials) => ({
			url: "/auth/password/reset_password",
			method: "POST",
			body: { ...credentials },
		}),
	});

export const validatePasswordApi = (builder) =>
	builder.mutation({
		query: (credentials) => ({
			url: "/auth/password/validate_code",
			method: "POST",
			body: { ...credentials },
		}),
	});



export const changePasswordApi = (builder) =>
	builder.mutation({
		query: (credentials) => ({
			url: "/auth/password/change_password",
			method: "PUT",
			body: { ...credentials },
		}),
	});
