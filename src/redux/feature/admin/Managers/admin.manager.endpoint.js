export const showAllManagersApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/admin/managers",
			method: "GET",
			params,
		}),
		providesTags: ["Managers"],
	});

export const showOneManagerApi = (builder) =>
	builder.query({
		query: (id) => ({
			url: `api/admin/managers/${id}`,
			method: "GET",
		}),
	});
export const createManagerApi = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "api/admin/managers",
			method: "POST",
			body,
		}),
	});

export const updateManagerApi = (builder) =>
	builder.mutation({
		query: ({ id, body }) => ({
			url: `api/admin/managers/${id}`,
			method: "PUT",
			body,
		}),
	});
export const deleteManagerApi = (builder) =>
	builder.mutation({
		query: (id) => ({
			url: `api/admin/managers/${id}`,
			method: "DELETE",
		}),
	});
