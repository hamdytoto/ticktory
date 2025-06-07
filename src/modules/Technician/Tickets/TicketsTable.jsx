/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FaRegCircle, FaCheckCircle, FaLock } from "react-icons/fa";

import Pagination from "../../../common/Pagnitation.jsx";
import Table from "../../../Components/Table/Table.jsx";
import { getTicketStatusInfo } from "../../../Components/utils/ticketSatus.js";

import {
    useFinishTicketTechMutation,
} from "../../../redux/feature/technician/Tickets/tech.ticket.apislice.js";

const TicketsTable = ({
    ticketsData,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    totalRecords,
    onTicketClick,
    refetch,
}) => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const [finishTicket] = useFinishTicketTechMutation();

    const handleResolveClick = async (ticket) => {
        if (ticket.status !== 2) {
            try {
                await finishTicket(ticket.id).unwrap();
                toast.success(t("ticekts.toast.ticketResolved") || "Ticket resolved successfully!");
                refetch();
            } catch (err) {
                toast.error(t("ticekts.toast.resolveFailed") || "Failed to resolve ticket!");
                console.error("Error resolving ticket:", err);
            }
        }
    };

    const columns = [
        {
            key: "title",
            label: t("table.columns.title") || "TITLE",
            clickable: true,
            render: (ticket) => (
                <>
                    <p className="text-gray-800 text-md font-medium">
                        {ticket.title.slice(0, 30)} ...
                    </p>
                    <p className="text-gray-500 text-sm">
                        {ticket.user?.name || "—"} 👤
                    </p>
                </>
            ),
        },
        {
            key: "description",
            label: t("table.columns.description") || "DESCRIPTION",
            render: (ticket) => `${ticket.description.slice(0, 50)} ...`,
        },
        {
            key: "status",
            label: t("table.columns.status") || "STATUS",
            render: (ticket) => {
                const { label, className } = getTicketStatusInfo(ticket.status, t);
                return (
                    <span className={`px-3 py-2 text-sm font-bold rounded-lg ${className}`}>
                        {label}
                    </span>
                );
            },
        },
        {
            key: "service",
            label: t("table.columns.service") || "SERVICE",
            render: (ticket) => ticket.service?.name || "—",
        },
        {
            key: "manager",
            label: t("table.columns.manager") || "MANAGER",
            render: (ticket) => ticket.manager?.user?.name || "—",
        },
        {
            key: "createdAt",
            label: t("table.columns.createdAt") || "CREATED AT",
            render: (ticket) => new Date(ticket.created_at).toLocaleString(`${isArabic ? "ar-EG" : "en-US"}`, {
                dateStyle: "medium",
                timeStyle: "short",
            }),
        },
        {
            key: "actions",
            label: t("table.columns.actions") || "Actions",
            render: (ticket) =>
                ticket.status === 3 ? (
                    <span className="text-gray-500 flex items-center space-x-1" title={t("tooltip.closed") || "Ticket Closed"}>
                        <FaLock /> <span className="text-sm">{t("status.closed") || "Closed"}</span>
                    </span>
                ) : (
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleResolveClick(ticket)}
                            className={`${ticket.status === 2
                                ? "text-green-600 cursor-default"
                                : "text-yellow-500 hover:text-yellow-600"
                                }`}
                            title={
                                ticket.status === 2
                                    ? t("tickets.tooltip.ticketResolved") || "Ticket Resolved"
                                    : t("tickets.tooltip.resolveTicket") || "Resolve Ticket"
                            }
                        >
                            {ticket.status === 2 ? <FaCheckCircle /> : <FaRegCircle />}
                        </button>
                    </div>
                ),
        },
    ];

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            {/* Top summary */}
            <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    {t("table.pagination.showing", "Showing")} {ticketsData.length > 0 ? ((currentPage - 1) * itemsPerPage + 1) : 0} {t("table.pagination.to", "to")}{" "}
                    {Math.min(currentPage * itemsPerPage, totalRecords)} {t("table.pagination.of", "of")} {totalRecords} {t("table.pagination.tickets", "tickets")}
                </div>
                <div className="text-sm text-gray-500">
                    {t("table.pagination.page", "Page")} {currentPage} {t("table.pagination.of", "of")} {totalPages}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    tickets={ticketsData}
                    onTicketClick={onTicketClick}
                    getTicketStatusInfo={getTicketStatusInfo}
                />
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                itemsPerPage={itemsPerPage}
                dataLength={totalRecords}
            />
        </div>
    );
};

export default TicketsTable;