import { apiSlice } from "../../../app/api/apiSlice";
import * as messagesApi from "./messages.endpoint";

export const messagesSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPinnedMessages: messagesApi.getPinnedMessages(builder),
		pinMessage: messagesApi.pinMessage(builder),
		changeReaction: messagesApi.changeReaction(builder),
		getAllMessages: messagesApi.getAllMessages(builder),
		storeMessage: messagesApi.storeMessage(builder),
		deleteMessage: messagesApi.deleteMessage(builder),
		forwardMessage: messagesApi.forwardMessage(builder),
	}),
});

export const {
	useGetPinnedMessagesQuery,
	usePinMessageMutation,
	useChangeReactionMutation,
	useGetAllMessagesQuery,
	useStoreMessageMutation,
	useDeleteMessageMutation,
	useForwardMessageMutation,
} = messagesSlice;
