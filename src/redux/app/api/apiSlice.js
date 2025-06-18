import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n from "i18next";
import { t } from "i18next";
import { toast } from "react-toastify";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  responseHandler: async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return response.json();
    }

    if (
      contentType.includes("text/plain") ||
      contentType.includes("text/html")
    ) {
      return response.text();
    }

    if (
      contentType.includes("application/octet-stream") ||
      contentType.includes("application/pdf") ||
      contentType.startsWith("image/")
    ) {
      return response.blob();
    }

    try {
      return await response.text();
    } catch {
      return { error: "Unable to parse response" };
    }
  },
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Locale", i18n.language);
    return headers;
  },
});

const baseQueryWithStatusHandler = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  const status = result?.meta?.response?.status;

  if (status === 401 && location.pathname !== "/auth/login") {
    localStorage.clear();
    window.location.href = "/auth/login";
  }

  if (status >= 500) {
    toast.error(result);
  }

  return result;
};

// 3. Universal API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithStatusHandler,
  endpoints: () => ({}), // add your endpoints here
});

