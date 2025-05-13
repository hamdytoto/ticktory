export const getAllNotifications = (builder) =>
	builder.query({
		query: (params) => ({
			url: "notifications",
			method: "GET",
			params,
		}),
	});

export const getUnreadNotifications = (builder) =>
	builder.query({
		query: (params) => ({
			url: "notifications/unread_notifications_count",
			method: "GET",
			params,
		}),
	});

export const markAllAsRead = (builder) =>
	builder.mutation({
		query: (params) => ({
			url: "notifications",
			method: "PATCH",
			params,
		}),
	});

export const markOneAsRead = (builder) =>
	builder.mutation({
		query: (params) => ({
			url: `notifications/${params.id}`,
			method: "PATCH",
			params,
		}),
	});

export const deleteAllNotifications = (builder) =>
	builder.mutation({
		query: (params) => ({
			url: "notifications",
			method: "DELETE",
			params,
		}),
	});
export const deleteOneNotification = (builder) =>
	builder.mutation({
		query: (params) => ({
			url: `notifications/${params.id}`,
			method: "DELETE",
			params,
		}),
	});
