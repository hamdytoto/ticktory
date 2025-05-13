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
export default function Notifications() {
    const [page, setPage] = useState(1);
    const [allNotifications, setAllNotifications] = useState([]);
    const [meta, setMeta] = useState({});
    const navigate = useNavigate();

    const { data, isLoading, isFetching, refetch } = useGetAllNotifiQuery(
        { page },
        { skip: false } // No polling!
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
        navigate(`/dashboard/tickets/view/${notification.data.model_id}`);
        return;
        
        // console.log("Go to ticket ID:", notification.data.model_id);
    };

    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
        refetch();
    };

    const handleDeleteNotification = async (id) => {
        await deleteOneNotifi({ id });
        refetch();
    };

    const handleDeleteAll = async () => {
        await deleteAllNotifi();
        refetch();
    };

    const handleLoadMore = () => {
        if (page < meta.last_page) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div className="fixed top-20 right-40 z-50 w-96 max-h-[80vh] overflow-y-auto bg-white shadow-2xl rounded-lg border border-gray-200 p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Mark All as Read
                    </button>
                    <button
                        onClick={handleDeleteAll}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Delete All
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {isLoading && page === 1 ? (
                    <div className="text-center py-8">Loading...</div>
                ) : allNotifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No notifications</div>
                ) : (
                    allNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`flex items-start gap-3 p-3 rounded-md cursor-pointer hover:bg-blue-100 ${notification.seen ? "bg-white" : "bg-blue-50"
                                }`}
                        >
                            {/* Icon */}
                            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-100 text-blue-600">
                                {notification.data.type === "ticket_resolved" ? "✅" : "📋"}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <p className="text-gray-800 font-semibold text-sm">{notification.title}</p>
                                <p className="text-gray-500 text-xs">{notification.body}</p>
                                <p className="text-gray-400 text-xs mt-1">
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
                                    className="text-red-400 text-xs hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Load More Button */}
            {page < meta.last_page && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleLoadMore}
                        disabled={isFetching}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 text-sm"
                    >
                        {isFetching ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    );
}
