import { apiSlice } from "../../../app/api/apiSlice";
import * as managerApi from "./admin.manager.endpoint";

export const adminManagerSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		showAllManagersApi: managerApi.showAllManagersApi(builder),
		showOneManagerApi: managerApi.showOneManagerApi(builder),
		createManagerApi: managerApi.createManagerApi(builder),
		updateManagerApi: managerApi.updateManagerApi(builder),
		deleteManagerApi: managerApi.deleteManagerApi(builder),
	}),
});

export const {
	useShowAllManagersApiQuery,
	useShowOneManagerApiQuery,
	useCreateManagerApiMutation,
	useUpdateManagerApiMutation,
	useDeleteManagerApiMutation,
} = adminManagerSlice;
