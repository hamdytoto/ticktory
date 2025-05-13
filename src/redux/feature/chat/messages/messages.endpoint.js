// Pinned Messages
export const getPinnedMessages = (builder) =>
	builder.query({
		query: (params) => ({
			url: "conversation/pinned",
			method: "GET",
			params,
		}),
	});

export const pinMessage = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "conversation/pin",
			method: "POST",
			body,
		}),
	});

// Reactions
export const changeReaction = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "conversation/reactions",
			method: "PATCH",
			body,
		}),
	});

// Main Messages
export const getAllMessages = (builder) =>
	builder.query({
		query: (params) => ({
			url: "conversation",
			method: "GET",
			params,
		}),
	});

export const storeMessage = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "conversation",
			method: "POST",
			body,
		}),
	});

export const deleteMessage = (builder) =>
	builder.mutation({
		query: ({ id, ...params }) => ({
			url: `conversation/${id}`,
			method: "DELETE",
			params,
		}),
	});

export const forwardMessage = (builder) =>
	builder.mutation({
		query: (body) => ({
			url: "conversation/forward",
			method: "POST",
			body,
		}),
	});
