// Pinned Messages
export const getPinnedMessages = (builder) =>
	builder.query({
		query: (params) => ({
			url: "api/conversations/pinned",
			method: "GET",
			params,
		}),
	});

export const pinMessage = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "api/conversations/pin",
			method: "POST",
			body,
		}),
	});

// Reactions
export const changeReaction = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "api/conversations/reactions",
			method: "PATCH",
			body,
		}),
	});

// Main Messages
export const getAllMessages = (builder) =>
	builder.query({
		query: ({ id, ...params }) => ({
			url: `api/conversations/${id}/messages`,
			method: "GET",
			params,
		}),
	});

export const storeMessage = (builder) =>
	builder.mutation({
		query: ({ id, ...body }) => ({
			url: `api/conversations/${id}/messages`,
			method: "POST",
			body,
		}),
	});

export const deleteMessage = (builder) =>
	builder.mutation({
		query: ({ id, ...params }) => ({
			url: `api/conversation/${id}`,
			method: "DELETE",
			params,
		}),
	});

export const forwardMessage = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "api/conversation/forward",
			method: "POST",
			body,
		}),
	});
