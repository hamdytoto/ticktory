export const showAllTicketsApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/technicians/tickets",
			method: "GET",
			params
		}),
	});

export const showOneTicketApi = (builder) =>
	builder.query({
		query: (id) => ({
			url: `api/technicians/tickets/${id}`,
			method: "GET",
		}),
	});

export const finishTicketApi = (builder) =>
	builder.mutation({
		query: (id) => ({
			url: `api/technicians/tickets/${id}/finish`,
			method: "POST",
		}),
	});
