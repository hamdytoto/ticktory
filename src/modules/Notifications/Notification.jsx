/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
    useGetAllNotifiQuery,
    useMarkOneAsReadMutation,
    useMarkAllAsReadMutation,
    useDeleteOneNotifiMutation,
    useDeleteAllNotifiMutation,
} from "../../redux/feature/notifications/notifi.apislice.js";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../../common/ConfirmDialogu.jsx";

export default function Notifications({ setIsNotificationOpen}) {
    const [page, setPage] = useState(1);
    const [allNotifications, setAllNotifications] = useState([]);
    const [meta, setMeta] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmType, setConfirmType] = useState(null); // "one" or "all"
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";

    const { data, isLoading, isFetching, refetch } = useGetAllNotifiQuery(
        { page },
        { skip: false }
    );

    const [markOneAsRead] = useMarkOneAsReadMutation();
    const [markAllAsRead] = useMarkAllAsReadMutation();
    const [deleteOneNotifi] = useDeleteOneNotifiMutation();
    const [deleteAllNotifi] = useDeleteAllNotifiMutation();

    useEffect(() => {
        if (data) {
            if (page === 1) {
                setAllNotifications(data.data);
            } else {
                setAllNotifications((prev) => [...prev, ...data.data]);
            }
            setMeta(data.meta);
        }
    }, [data, page]);

    const handleNotificationClick = async (notification) => {
        if (!notification.seen) {
            await markOneAsRead({ id: notification.id });
            refetch();
        }
        setIsNotificationOpen(false);
        navigate(`/dashboard/tickets/view/${notification.data.model_id}`);
        return;
    };

    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
        refetch();
    };

    // Show confirmation modal before deleting one
    const handleDeleteNotification = (id) => {
        setConfirmType("one");
        setDeleteId(id);
        setShowConfirm(true);
    };

    // Show confirmation modal before deleting all
    const handleDeleteAll = () => {
        setConfirmType("all");
        setShowConfirm(true);
    };

    // Confirm deletion
    const handleConfirmDelete = async () => {
        if (confirmType === "one" && deleteId) {
            await deleteOneNotifi({ id: deleteId });
        } else if (confirmType === "all") {
            await deleteAllNotifi();
        }
        setShowConfirm(false);
        setDeleteId(null);
        setConfirmType(null);
        refetch();
    };

    // Cancel deletion
    const handleCancelDelete = () => {
        setShowConfirm(false);
        setDeleteId(null);
        setConfirmType(null);
    };

    const handleLoadMore = () => {
        if (page < meta.last_page) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div
            dir={isRTL ? "rtl" : "ltr"}
            className={`
    z-50 bg-white shadow-2xl rounded-lg border border-gray-200 p-4 max-h-[80vh] overflow-y-auto
    fixed top-20 ${isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} w-72
    sm:absolute sm:top-auto ${isRTL ? "sm:left-0 sm:right-auto" : "sm:right-0 sm:left-auto"} sm:translate-x-0 sm:w-96
  `}
        >
            {/* Confirmation Modal */}
            {showConfirm && (
                <ConfirmDialog
                    show={showConfirm}
                    message={confirmType === "one" ? t("notifications.delete") : t("notifications.deleteAll")}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}


            {/* Header */}
            <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{t("notifications.title")}</h2>
                <div className="flex gap-1 sm:gap-2">
                    <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs sm:text-sm text-blue-500 hover:underline"
                    >
                        {t("notifications.markAllRead")}
                    </button>
                    <button
                        onClick={handleDeleteAll}
                        className="text-xs sm:text-sm text-red-500 hover:underline"
                    >
                        {t("notifications.deleteAll")}
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3 sm:space-y-4">
                {isLoading && page === 1 ? (
                    <div className="text-center py-6 text-sm">Loading...</div>
                ) : allNotifications.length === 0 ? (
                    <div className="text-center py-6 text-gray-400 text-sm">{t("notifications.noNotifications")}</div>
                ) : (
                    allNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-md cursor-pointer hover:bg-blue-100 ${notification.seen ? "bg-white" : "bg-blue-50"
                                }`}
                        >
                            {/* Icon */}
                            <div className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-blue-100 text-blue-600 text-sm sm:text-base">
                                {notification.data.type === "ticket_resolved" ? "✅" : "📋"}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <p className="text-gray-800 font-semibold text-xs sm:text-sm">{notification.title}</p>
                                <p className="text-gray-500 text-xs">{notification.body}</p>
                                <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
                                    {moment(notification.created_at).fromNow()}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col items-center gap-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteNotification(notification.id);
                                    }}
                                    className="text-red-400 text-[10px] sm:text-xs hover:underline"
                                >
                                    {t("notifications.delete")}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Load More Button */}
            {page < meta.last_page && (
                <div className="flex justify-center mt-3 sm:mt-4">
                    <button
                        onClick={handleLoadMore}
                        disabled={isFetching}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 text-xs sm:text-sm"
                    >
                        {isFetching ? "Loading..." : t("notifications.loadMore")}
                    </button>
                </div>
            )}
        </div>
    );
}