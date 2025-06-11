import { apiSlice } from "../../../app/api/apiSlice";
import * as ticketApi from "./manager.ticket.endPoint";

export const ManagerTicketSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		showAllTicketsApi: ticketApi.showAllTicketsApi(builder),
		showOneTicketApi: ticketApi.showOneTicketApi(builder),
		assignTicketApi: ticketApi.AssignTicketApi(builder),
		finishTicketApi: ticketApi.finishTicketApi(builder),
		changeMaximumMinutes: ticketApi.changeMaximumMinutesApi(builder),
	}),
});
export const {
    useShowAllTicketsApiQuery,
    useShowOneTicketApiQuery,
	useAssignTicketApiMutation,
	useFinishTicketApiMutation,
	useChangeMaximumMinutesMutation,
} = ManagerTicketSlice;