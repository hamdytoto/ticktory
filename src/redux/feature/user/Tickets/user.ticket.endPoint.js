export const showAllTicketsApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/users/tickets",
			method: "GET",
			params
		}),
	});

export const showOneTicketApi = (builder) =>
	builder.query({
		query: (id) => ({
			url: `api/users/tickets/${id}`,
			method: "GET",
		}),
	});
export const createTicketApi = (builder) =>
	builder.mutation({
		query: (data) => ({
			url: `api/users/tickets`,
			method: "POST",
			body: data,
		}),
	});

export const updateTicketApi = (builder) =>
	builder.mutation({
		query: ({ id, data }) => ({
			url: `api/users/tickets/${id}`,
			method: "PUT",
			body: data,
		}),
	});
