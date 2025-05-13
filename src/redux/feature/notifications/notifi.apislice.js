    import { apiSlice } from "../../app/api/apiSlice";
    import * as notifiApi from "./notifi.endpoint";

    export const notificationSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
            getAllNotifi: notifiApi.getAllNotifications(builder),
            getUnreadNotifi: notifiApi.getUnreadNotifications(builder),
            markAllAsRead: notifiApi.markAllAsRead(builder),
            markOneAsRead: notifiApi.markOneAsRead(builder),
            deleteAllNotifi: notifiApi.deleteAllNotifications(builder),
            deleteOneNotifi: notifiApi.deleteOneNotification(builder),
        }),
    });
    export const {
        useGetAllNotifiQuery,
        useGetUnreadNotifiQuery,
        useMarkAllAsReadMutation,
        useMarkOneAsReadMutation,
        useDeleteAllNotifiMutation,
        useDeleteOneNotifiMutation,
    } = notificationSlice;
