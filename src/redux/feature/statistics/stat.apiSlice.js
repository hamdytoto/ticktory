import { apiSlice } from "../../app/api/apiSlice";
import * as statisticsApi from "./stat.endpoint";
export const statisticsSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAdminStatistics: statisticsApi.getAdminStat(builder),
		getUserStatistics: statisticsApi.getUserStat(builder),
		getTechnicianStatistics: statisticsApi.getTechnicianStat(builder),
		getManagerStatistics: statisticsApi.getManagerStat(builder),
	}),
});

export const {
	useGetAdminStatisticsQuery,
	useGetUserStatisticsQuery,
	useGetTechnicianStatisticsQuery,
	useGetManagerStatisticsQuery,
} = statisticsSlice;
