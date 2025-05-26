export const showAllTicketsApi = (builder) =>
	builder.query({
		query: ({ search, searchColumn, page = 1, per_page = 100 } = {}) => {
			const params = new URLSearchParams();
			if (search) params.append("search", search);
			if (searchColumn) params.append("searchColumn", searchColumn);
			params.append("page", page);
			params.append("per_page", per_page);
			return {
				url: `api/admin/tickets?${params.toString()}`,
				method: "GET",
			};
		},
	});

export const showOneTicketApi = (builder) =>
	builder.query({
		query: (id) => ({
			url: `api/admin/tickets/${id}`,
			method: "GET",
		}),
	});
