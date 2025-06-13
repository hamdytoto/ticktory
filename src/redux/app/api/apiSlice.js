import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n  from "i18next";
const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BASE_URL,
	// credentials:"include",
	prepareHeaders: (headers) => {
		const token = localStorage.getItem("token");
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
			headers.set("Locale" ,i18n.language);
		}
		return headers;
	},
});

export const apiSlice = createApi({
	baseQuery,
	endpoints: () => ({}),
});