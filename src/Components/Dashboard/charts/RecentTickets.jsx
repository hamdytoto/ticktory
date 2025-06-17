/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { getTicketStatusInfo } from "../../utils/ticketSatus";

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const RecentTicketsTable = ({ recent_tickets }) => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

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
                        <tr className={`text-gray-600 ${isArabic ? "text-right" : "text-left"} text-sm md:text-md font-semibold border-b border-gray-300`}>
                            <th className="py-3 px-4">{t("table.columns.id")}</th>
                            <th className="py-3 px-4">{t("table.columns.title")}</th>
                            <th className="py-3 px-4">{t("table.columns.service")}</th>
                            <th className="py-3 px-4">{t("table.columns.manager")}</th>
                            <th className="py-3 px-4">{t("table.columns.user")}</th>
                            <th className="py-3 px-4">{t("table.columns.technician")}</th>
                            <th className="py-3 px-4">{t("table.columns.status")}</th>
                            <th className="py-3 px-4">{t("table.columns.createdAt")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTickets.map((ticket) => {
                            const statusInfo = getTicketStatusInfo(ticket?.status, t);
                            return (
                                <tr
                                    key={ticket?.id}
                                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                                >
                                    <td className="py-3 px-4 text-gray-500 text-sm">{ticket?.id}</td>
                                    <td className="py-3 px-4">{ticket?.title ?? "—"}</td>
                                    <td className="py-3 px-4">{ticket?.section?.name ?? "—"}</td>
                                    <td className="py-3 px-4">{ticket?.manager?.user?.name ?? "—"}</td>
                                    <td className="py-3 px-4">{ticket?.user?.name ?? "—"}</td>
                                    <td className="py-3 px-4">{ticket?.technician?.user?.name ?? "—"}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-4 py-2 text-xs font-medium rounded-lg ${statusInfo.className}`}
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
