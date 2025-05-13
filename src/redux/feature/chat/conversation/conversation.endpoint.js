import { apiSlice } from "../../../app/api/apiSlice";
import * as conversationApi from "./conversation.endpoint";

export const conversationSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllConversations: conversationApi.getAllConversations(builder),
		storeConversation: conversationApi.storeConversation(builder),
		pinChat: conversationApi.pinChat(builder),
		getUserConversation: conversationApi.getUserConversation(builder),
		deleteConversation: conversationApi.deleteConversation(builder),
		getOtherUser: conversationApi.getOtherUser(builder),
		markAsSeen: conversationApi.markAsSeen(builder),
		getUnseenCount: conversationApi.getUnseenCount(builder),
	}),
});

export const {
	useGetAllConversationsQuery,
	useStoreConversationMutation,
	usePinChatMutation,
	useGetUserConversationQuery,
	useDeleteConversationMutation,
	useGetOtherUserQuery,
	useMarkAsSeenMutation,
	useGetUnseenCountQuery,
} = conversationSlice;
