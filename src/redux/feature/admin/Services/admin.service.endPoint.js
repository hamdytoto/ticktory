export const showAllServicesApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/admin/services",
			method: "GET",
			params
		}),
	});
export const searchServiceApi = (builder) =>
	builder.query({
		query: (search="") => ({
			url: `api/admin/services?handle=${search}`,
			method: "GET",
		}),
	});
export const showOneServiceApi = (builder) =>
	builder.query({
		query: (id) => ({
			url: `api/admin/services/${id}`,
			method: "GET",
		}),
	});

export const createServiceApi = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "api/admin/services",
			method: "POST",
			body,
		}),
	});

export const updateServiceApi = (builder) =>
	builder.mutation({
		query: ({ id, body }) => ({
			url: `api/admin/services/${id}`,
			method: "PUT",
			body,
		}),
	});

export const deleteServiceApi = (builder) =>
	builder.mutation({
		query: (id) => ({
			url: `api/admin/services/${id}`,
			method: "DELETE",
		}),
	});
