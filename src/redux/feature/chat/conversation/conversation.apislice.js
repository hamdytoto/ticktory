export const getAllConversations = (builder) =>
	builder.query({
		query: (params) => ({
			url: "conversation",
			method: "GET",
			params,
		}),
	});

export const storeConversation = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "conversation",
			method: "POST",
			body,
		}),
	});

export const pinChat = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "conversation/pin",
			method: "POST",
			body,
		}),
	});

export const getUserConversation = (builder) =>
	builder.query({
		query: (params) => ({
			url: "conversation/user",
			method: "GET",
			params,
		}),
	});

export const deleteConversation = (builder) =>
	builder.mutation({
		query: ({ id, ...params }) => ({
			url: `conversation/${id}`,
			method: "DELETE",
			params,
		}),
	});

export const getOtherUser = (builder) =>
	builder.query({
		query: (params) => ({
			url: "conversation/other-user",
			method: "GET",
			params,
		}),
	});

export const markAsSeen = (builder) =>
	builder.mutation({
		query: (params) => ({
			url: "conversation/mark-as-seen",
			method: "PATCH",
			params,
		}),
	});

export const getUnseenCount = (builder) =>
	builder.query({
		query: (params) => ({
			url: "conversation/unseen-count",
			method: "GET",
			params,
		}),
	});
