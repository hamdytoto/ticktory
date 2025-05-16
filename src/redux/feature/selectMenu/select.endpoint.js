export const getServicesApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/select_menu/services?only_associated_to_managers=1",
			method: "GET",
			params,
		}),
	});
export const getTechniciansApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/select_menu/technicians",
			method: "GET",
			params,
		}),
	});
