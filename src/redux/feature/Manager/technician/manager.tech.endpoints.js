export const showAllTechnician = (builder) =>
	builder.query({
		query: () => ({
			url: "api/managers/technicians",
			method: "GET",
		}),
	});

export const showOneTechnician = (builder) =>
	builder.query({
		query: (id) => ({
			url: `api/managers/technicians/${id}`,
			method: "GET",
		}),
	});
export const createTechnician = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "api/managers/technicians",
			method: "POST",
			body,
		}),
	});

export const updateTechnician = (builder) =>
	builder.mutation({
		query: ({ id, body }) => ({
			url: `api/managers/technicians/${id}`,
			method: "PUT",
			body,
		}),
	});
export const deleteTechnician = (builder) =>
	builder.mutation({
		query: (id) => ({
			url: `api/managers/technicians/${id}`,
			method: "DELETE",
		}),
	});
