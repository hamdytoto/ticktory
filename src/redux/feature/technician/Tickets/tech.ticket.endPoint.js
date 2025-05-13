export const showAllTicketsApi = (builder) =>
	builder.query({
		query: () => ({
			url: "api/technicians/tickets?per_page=100",
			method: "GET",
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
