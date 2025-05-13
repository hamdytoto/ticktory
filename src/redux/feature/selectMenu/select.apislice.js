import { apiSlice } from "../../app/api/apiSlice";
import * as menuApi from "./select.endpoint";

export const techTicketSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getServices: menuApi.getServicesApi(builder),
		getTechnicians: menuApi.getTechniciansApi(builder),
	}),
});
export const { useGetServicesQuery, useGetTechniciansQuery } = techTicketSlice;
