export const getProfileApi = (builder) =>
	builder.query({
		query: () => ({
			url: "/auth/profile",
			method: "GET",
		}),
	});

export const updateProfileApi = (builder) =>
	builder.mutation({
		query: (formdata) => ({
			url: "/auth/profile",
			method: "POST",
			body: formdata,
		}),
	});
