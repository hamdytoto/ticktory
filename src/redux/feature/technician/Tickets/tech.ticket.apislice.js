import { apiSlice } from "../../../app/api/apiSlice";
import * as ticketApi from "./tech.ticket.endPoint";

export const techTicketSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTicketsTech: ticketApi.showAllTicketsApi(builder),
		getOneTicketTech: ticketApi.showOneTicketApi(builder),
		finishTicketTech: ticketApi.finishTicketApi(builder),
	}),
});
export const {
	useGetAllTicketsTechQuery,
	useGetOneTicketTechQuery,
	useFinishTicketTechMutation,
} = techTicketSlice;