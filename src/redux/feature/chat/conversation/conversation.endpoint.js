export const getAllConversations = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/conversations",
			method: "GET",
			params,
		}),
	});

export const storeConversation = (builder) =>
	builder.mutation({	
		query: (body) => ({
			url: "api/conversations",
			method: "POST",
			body,
		}),
	});

export const pinChat = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "api/conversations/pin",
			method: "POST",
			body,
		}),
	});

export const getUserConversation = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/conversations/for",
			method: "GET",
			params,
		}),
	});

export const deleteConversation = (builder) =>
	builder.mutation({
		query: ({ id, ...params }) => ({
			url: `api/conversations/${id}`,
			method: "DELETE",
			params,
		}),
	});

export const getOtherUser = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/conversations/other-user",
			method: "GET",
			params,
		}),
	});

export const markAsSeen = (builder) =>
	builder.mutation({
		query: (params) => ({
			url: "api/conversations/mark-as-seen",
			method: "PATCH",
			params,
		}),
	});

export const getUnseenCount = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/conversations/unseen-count",
			method: "GET",
			params,
		}),
	});
