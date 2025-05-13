import { apiSlice } from "../../../app/api/apiSlice";
import * as techniciansApi from "./manager.tech.endpoints";

export const managerTechSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		showAllTechnician: techniciansApi.showAllTechnician(builder),
		showOneTechnician: techniciansApi.showOneTechnician(builder),
		createTechnician: techniciansApi.createTechnician(builder),
		updateTechnician: techniciansApi.updateTechnician(builder),
		deleteTechnician: techniciansApi.deleteTechnician(builder),
	}),
});

export const {
	useShowAllTechnicianQuery,
	useShowOneTechnicianQuery,
	useCreateTechnicianMutation,
	useUpdateTechnicianMutation,
	useDeleteTechnicianMutation,
} = managerTechSlice;
