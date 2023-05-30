import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, IHistory } from "Shared";
import { HistoryByIDRequest, ReportResponse } from "./history.type";

export const historyAPI = createApi({
  reducerPath: "historyAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/history`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("uid");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["History"],
  endpoints: (build) => ({
    fetchHistory: build.query<IHistory[], string>({
      query: (params) => ({
        url: "",
        params: {
          date: params,
        },
        // headers: {
        //     authroization: ''
        // }
      }),
      //   transformResponse: (data: { history: IHistory[] }) => {
      //     return data.history;
      //   },
    }),
    fetchHistoryByID: build.query<ReportResponse, HistoryByIDRequest>({
      query: (history) => ({
        url: `/${history.id}`,
        params: {
          sort: history.sort,
          page: 1,
          pageSize: 10,
          firstName: history.firstName,
          lastName: history.lastName,
          middleName: history.middleName,
        },
      }),
    }),
    deleteHistory: build.mutation<IHistory, IHistory>({
      query: (history) => ({
        url: `/${history.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["History"],
    }),
  }),
});
