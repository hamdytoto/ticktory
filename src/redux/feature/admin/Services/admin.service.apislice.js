import { apiSlice } from "../../../app/api/apiSlice";
import * as serviceApi from "./admin.service.endPoint";

export const adminServiceSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		showAllServicesApi: serviceApi.showAllServicesApi(builder),
		searchServiceApi: serviceApi.searchServiceApi(builder),
		showOneServiceApi: serviceApi.showOneServiceApi(builder),
		createServiceApi: serviceApi.createServiceApi(builder),
		updateServiceApi: serviceApi.updateServiceApi(builder),
		deleteServiceApi: serviceApi.deleteServiceApi(builder),
	}),
});

export const {
	useShowAllServicesApiQuery,
	useSearchServiceApiQuery,
	useShowOneServiceApiQuery,
	useCreateServiceApiMutation,
	useUpdateServiceApiMutation,
	useDeleteServiceApiMutation,
} = adminServiceSlice;
