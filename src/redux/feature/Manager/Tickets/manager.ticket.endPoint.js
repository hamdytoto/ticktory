export const showAllTicketsApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/managers/tickets",
			method: "GET",
			params,
		}),
	});

export const showOneTicketApi = (builder) =>
	builder.query({
		query: (id) => ({
			url: `api/managers/tickets/${id}`,
			method: "GET",
		}),
	});
export const AssignTicketApi = (builder) =>
	builder.mutation({
		query: ({ id, technician_id }) => ({
			url: `api/managers/tickets/${id}/assign`,
			method: "POST",
			body: { technician_id },
		}),
	});

export const finishTicketApi = (builder) =>
	builder.mutation({
		query: (id) => ({
			url: `api/managers/tickets/${id}/finish`,
			method: "POST",
		}),
	});
