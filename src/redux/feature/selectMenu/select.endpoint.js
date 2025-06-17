export const getServicesApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/select_menu/services",
			method: "GET",
			params,
		}),
	});
export const getSectionsApi =(builder)=>
	builder.query({
		query: (params) => ({
			url: "api/select_menu/sections",
			method: "GET",
			params,
		}),
	})
export const getTechniciansApi = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/select_menu/technicians",
			method: "GET",
			params,
		}),
	});
