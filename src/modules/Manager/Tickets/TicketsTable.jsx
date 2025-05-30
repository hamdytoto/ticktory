/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FaRegCircle, FaCheckCircle, FaPaperPlane, FaCheckDouble, FaLock } from "react-icons/fa";

import Pagination from "../../../common/Pagnitation.jsx";
import Table from "../../../Components/Table/Table.jsx";
import TechnicianAssignModal from "./TechnicianAssignModal.jsx";
import { getTicketStatusInfo } from "../../../Components/utils/ticketSatus.js";

import {
    useFinishTicketApiMutation,
    useAssignTicketApiMutation,
} from "../../../redux/feature/Manager/Tickets/manager.ticket.apislice.js";
import { useState } from "react";

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

    const [finishTicket] = useFinishTicketApiMutation();
    const [assignTicket] = useAssignTicketApiMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const handleAssignClick = (ticket) => {
        if (!ticket.technician) {
            setSelectedTicketId(ticket.id);
            setIsModalOpen(true);
        }
    };

    const handleTechnicianSubmit = async (ticketId, technicianId) => {
        try {
            await assignTicket({ id: ticketId, technician_id: technicianId }).unwrap();
            toast.success(t("toast.ticketAssigned"));
            refetch();
        } catch (err) {
            toast.error(t("toast.assignFailed"));
            console.error("Assignment Error:", err);
        }
    };

    const handleResolveClick = async (ticket) => {
        if (ticket.status !== 2) {
            try {
                await finishTicket(ticket.id).unwrap();
                toast.success(t("toast.ticketResolved"));
                refetch();
            } catch (err) {
                toast.error(t("toast.resolveFailed"));
                console.error("Resolve Error:", err);
            }
        }
    };

    const columns = [
        {
            key: "title",
            label: t("table.columns.title"),
            clickable: true,
            render: (ticket) => (
                <>
                    <p className="text-gray-800 text-md font-medium">{ticket.title.slice(0, 30)} ...</p>
                    <p className="text-gray-500 text-sm">{ticket.user?.name || "—"} 👤</p>
                </>
            ),
        },
        {
            key: "status",
            label: t("table.columns.status"),
            render: (ticket) => {
                const { label, className } = getTicketStatusInfo(ticket.status, t);
                return <span className={`px-3 py-2 text-sm font-bold rounded-lg ${className}`}>{label}</span>;
            },
        },
        {
            key: "service",
            label: t("table.columns.service"),
            render: (ticket) => ticket.service?.name || "—",
        },
        {
            key: "technician",
            label: t("table.columns.technician"),
            render: (ticket) => ticket.technician?.user?.name || "—",
        },
        {
            key: "createdAt",
            label: t("table.columns.createdAt"),
            render: (ticket) => new Date(ticket.created_at).toLocaleString(`${isArabic ? "ar-EG" : "en-US"}`, {
                dateStyle: "medium",
                timeStyle: "short",
            }),
        },
        {
            key: "actions",
            label: t("table.columns.actions"),
            render: (ticket) =>
                ticket.status === 3 ? (
                    <span className="text-gray-500 flex items-center space-x-1" title={t("tooltip.closed")}>
                        <FaLock /> <span className="text-sm">{t("status.closed")}</span>
                    </span>
                ) : (
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleAssignClick(ticket)}
                            className={`${ticket.technician ? "text-green-600 cursor-default" : "text-blue-500 hover:text-blue-700"}`}
                            title={
                                ticket.technician
                                    ? t("tooltip.technicianAssigned")
                                    : t("tooltip.assignTechnician")
                            }
                        >
                            {ticket.technician ? <FaCheckDouble /> : <FaPaperPlane />}
                        </button>
                        <button
                            onClick={() => handleResolveClick(ticket)}
                            className={`${ticket.status === 2 ? "text-green-600 cursor-default" : "text-yellow-500 hover:text-yellow-600"}`}
                            title={
                                ticket.status === 2
                                    ? t("tooltip.ticketResolved")
                                    : t("tooltip.resolveTicket")
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
                    {t("table.pagination.showing", {
                        from: ticketsData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0,
                        to: Math.min(currentPage * itemsPerPage, totalRecords),
                        total: totalRecords,
                    })}
                </div>
                <div className="text-sm text-gray-500">
                    {t("table.pagination.page", { current: currentPage, total: totalPages })}
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

            {/* Modal for technician assignment */}
            <TechnicianAssignModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleTechnicianSubmit}
                ticketId={selectedTicketId}
            />
        </div>
    );
};

export default TicketsTable;
