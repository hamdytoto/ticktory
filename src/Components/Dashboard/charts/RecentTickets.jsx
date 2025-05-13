/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
const statusMap = {
    0: { label: "Open", color: "bg-yellow-100 text-yellow-800" },
    1: { label: "In Progress", color: "bg-blue-100 text-blue-800" },
    2: { label: "Closed", color: "bg-green-100 text-green-800" },
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const RecentTicketsTable = ({ recent_tickets }) => {
    const { t } = useTranslation();
    if (!Array.isArray(recent_tickets)) return null;

    const sortedTickets = [...recent_tickets].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return (
        <div
            className="bg-white p-4 md:p-6 rounded-xl shadow-lg"
            style={{
                borderRadius: "16px",
                border: "1px solid #D1D5DB",
                boxShadow: "0px 4px 10px rgba(13, 27, 68, 0.2)",
            }}
        >
            <div className="bg-white ">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-700 font-medium text-sm md:text-lg">{t("stats.recentTickets")}</h3>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-left text-sm md:text-md font-semibold border-b border-gray-300">
                            <th className="py-3 px-4">{t("table.id")}</th>
                            <th className="py-3 px-4">{t("table.title")}</th>
                            <th className="py-3 px-4">{t("table.service")}</th>
                            <th className="py-3 px-4">{t("table.manager")}</th>
                            <th className="py-3 px-4">{t("table.user")}</th>
                            <th className="py-3 px-4">{t("table.technician")}</th>
                            <th className="py-3 px-4">{t("table.status")}</th>
                            <th className="py-3 px-4">{t("table.date")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTickets.map((ticket) => {
                            const statusInfo = statusMap[ticket?.status] || {
                                label: "Unknown",
                                color: "bg-gray-200 text-gray-800",
                            };

                            return (
                                <tr
                                    key={ticket?.id}
                                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                                >
                                    <td className="py-3 px-4 text-gray-500 text-sm">{ticket?.id}</td>
                                    <td className="py-3 px-4">{ticket?.title ?? "—"}</td>
                                    <td className="py-3 px-4">{ticket?.service?.name ?? "—"}</td>
                                    <td className="py-3 px-4">{ticket?.manager?.user?.name ?? "—"}</td>
                                    <td className="py-3 px-4">{ticket?.user?.name ?? "—"}</td>
                                    <td className="py-3 px-4">{ticket?.technician?.user?.name ?? "—"}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-4 py-2 text-xs font-medium rounded-lg ${statusInfo.color}`}
                                        >
                                            {statusInfo.label}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-500 text-sm">
                                        {formatDate(ticket?.created_at)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentTicketsTable;
