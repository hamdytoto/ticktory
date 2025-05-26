export const showAllTicketsApi = (builder) =>
    builder.query({
        query: (params) => ({
            url: "api/admin/tickets",
            method: "GET",
			params
        }),
    });

export const showOneTicketApi = (builder) =>
    builder.query({
        query: (id) => ({
            url: `api/admin/tickets/${id}`,
            method: "GET",
        }),
    }); 