import { apiSlice } from "../../../app/api/apiSlice";
import * as ticketApi from "./user.ticket.endPoint";

export const userTicketSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTicketUser: ticketApi.showAllTicketsApi(builder),
		getOneTicketUser: ticketApi.showOneTicketApi(builder),
		createTicketUser: ticketApi.createTicketApi(builder),
		updateTicketUser: ticketApi.updateTicketApi(builder),
	}),
});
export const {
	useGetAllTicketUserQuery,
	useGetOneTicketUserQuery,
	useCreateTicketUserMutation,
	useUpdateTicketUserMutation,	

} = userTicketSlice;
