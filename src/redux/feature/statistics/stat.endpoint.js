export const getAdminStat = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/admin/statistics",
			method: "GET",
			params,
		}),
	});
export const getUserStat = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/users/statistics",
			method: "GET",
			params,
		}),
	});
export const getTechnicianStat = (builder) =>
	builder.query({
		query: (params) => ({   
			url: "api/technicians/statistics",
			method: "GET",
			params,
		}),
	});
export const getManagerStat = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/managers/statistics",
			method: "GET",
			params,
		}),
	});
