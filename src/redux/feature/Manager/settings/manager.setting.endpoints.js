export const showSettings = (builder) =>
	builder.query({
		query: () => ({
			url: "api/managers/me/settings",
			method: "GET",
		}),
	});

export const updateSettings = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "api/managers/me/settings",
			method: "PATCH",
			body,
		}),
	});
