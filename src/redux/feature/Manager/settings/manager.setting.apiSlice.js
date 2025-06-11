import { apiSlice } from "../../../app/api/apiSlice";
import * as managerSettingApi from "./manager.setting.endpoints";
export const managerSettingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        showSettings: managerSettingApi.showSettings(builder),
        updateSettings: managerSettingApi.updateSettings(builder),
    }),
});
export const {
    useShowSettingsQuery,
    useUpdateSettingsMutation,
} = managerSettingSlice;