import { apiSlice } from "../../../app/api/apiSlice";
import * as ticketApi from "./admin.ticket.endPoint";

export const adminTicketSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTicketsApi: ticketApi.showAllTicketsApi(builder),
		getOneTicketApi: ticketApi.showOneTicketApi(builder),
	}),
});
export const {
    useGetAllTicketsApiQuery,
    useGetOneTicketApiQuery,
} = adminTicketSlice;