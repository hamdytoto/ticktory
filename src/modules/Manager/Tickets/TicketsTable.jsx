/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FaRegCircle, FaCheckCircle, FaPaperPlane, FaCheckDouble, FaLock, FaClock, FaRegClock, FaExclamationCircle, FaCheck } from "react-icons/fa";

import Pagination from "../../../common/Pagnitation.jsx";
import Table from "../../../Components/Table/Table.jsx";
import TechnicianAssignModal from "./TechnicianAssignModal.jsx";
import MaxMinutesModal from "./MaxMinutesModal.jsx";
import { getTicketStatusInfo } from "../../../Components/utils/ticketSatus.js";

import {
    useFinishTicketApiMutation,
    useAssignTicketApiMutation,
    useChangeMaximumMinutesMutation,
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
    const [changeMaxMinutes] = useChangeMaximumMinutesMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMaxMinutesModal, setShowMaxMinutesModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleAssignClick = (ticket) => {
        if (!ticket.technician) {
            setSelectedTicketId(ticket.id);
            setIsModalOpen(true);
        }
    };

    const handleTechnicianSubmit = async (ticketId, technicianId, maximum_minutes) => {
        try {
            await assignTicket({ id: ticketId, technician_id: technicianId, maximum_minutes: maximum_minutes }).unwrap();
            toast.success(t("tickets.toast.ticketAssigned"));
            refetch();
        } catch (err) {
            toast.error(t("tickets.toast.assignFailed"));
            console.error("Assignment Error:", err);
        }
    };

    const handleResolveClick = async (ticket) => {
        if (ticket.status !== 2) {
            try {
                await finishTicket(ticket.id).unwrap();
                toast.success(t("tickets.toast.ticketResolved"));
                refetch();
            } catch (err) {
                toast.error(t("tickets.toast.resolveFailed"));
                console.error("Resolve Error:", err);
            }
        }
    };

    const handleMaxMinutesSubmit = async (minutes) => {
        try {
            await changeMaxMinutes({
                id: selectedTicket.id,
                maximum_minutes: minutes,
            }).unwrap();
            toast.success(t("tickets.toast.maxMinutesUpdated"));
            refetch();
        } catch (err) {
            toast.error(t("tickets.toast.maxMinutesUpdateFailed"));
            console.error("Max Minutes Update Error:", err);
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
        // {
        //     key: "assignedAt",
        //     label: t("table.columns.assignedAt"),
        //     render: (ticket) => {
        //         if (!ticket.technician || !ticket.assigned_at) return "—";
        //         return new Date(ticket.assigned_at).toLocaleString(`${isArabic ? "ar-EG" : "en-US"}`, {
        //             dateStyle: "medium",
        //             timeStyle: "short",
        //         });
        //     },
        // },
        {
            key: "maxMinutes",
            label: t("table.columns.maxMinutes"),
            render: (ticket) => ticket.maximum_minutes || "—",
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
            key: "overdue",
            label: t("table.columns.overdue"),
            render: (ticket) => {
                if (ticket.status === 2 || ticket.status === 3) {
                    return (
                        <span
                            className="flex items-center gap-2 text-green-600"
                            title={t("tickets.tooltip.completed")}
                        >
                            <FaCheck className="w-4 h-4" />
                            <span className="text-sm">{t("tickets.status.completed")}</span>
                        </span>
                    );
                }

                if (!ticket.technician) {
                    return (
                        <span
                            className="flex items-center gap-2 text-gray-500"
                            title={t("tickets.tooltip.notAssigned")}
                        >
                            <FaRegClock className="w-4 h-4" />
                            <span className="text-sm">{t("tickets.status.pending")}</span>
                        </span>
                    );
                }

                return (
                    <span
                        className={`flex items-center gap-2 ${ticket.is_overdue ? 'text-red-600' : 'text-green-600'
                            }`}
                        title={t(ticket.is_overdue ? "tickets.tooltip.overdue" : "tickets.tooltip.onTime")}
                    >
                        {ticket.is_overdue ? (
                            <>
                                <FaExclamationCircle className="w-4 h-4" />
                                <span className="text-sm">{t("tickets.status.overdue")}</span>
                            </>
                        ) : (
                            <>
                                <FaCheck className="w-4 h-4" />
                                <span className="text-sm">{t("tickets.status.onTime")}</span>
                            </>
                        )}
                    </span>
                );
            },
        },
        {
            key: "actions",
            label: t("table.columns.actions"),
            render: (ticket) =>
                ticket.status === 3 ? (
                    <span className="text-gray-500 flex items-center space-x-1" title={t("tickets.tooltip.closed")}>
                        <FaLock /> <span className="text-sm">{t("status.closed")}</span>
                    </span>
                ) : (
                    <div className="flex items-center space-x-3">

                        <button
                            onClick={() => handleAssignClick(ticket)}
                            className={`${ticket.technician ? "text-green-600 cursor-default" : "text-blue-500 hover:text-blue-700"}`}
                            title={
                                ticket.technician
                                    ? t("tickets.tooltip.technicianAssigned")
                                    : t("tickets.tooltip.assignTechnician")
                            }
                        >
                            {ticket.technician ? <FaCheckDouble /> : <FaPaperPlane />}
                        </button>
                        <button
                            onClick={() => handleResolveClick(ticket)}
                            className={`${ticket.status === 2 ? "text-green-600 cursor-default" : "text-yellow-500 hover:text-yellow-600"}`}
                            title={
                                ticket.status === 2
                                    ? t("tickets.tooltip.ticketResolved")
                                    : t("tickets.tooltip.resolveTicket")
                            }
                        >
                            {ticket.status === 2 ? <FaCheckCircle /> : <FaRegCircle />}
                        </button>
                        {ticket.status !== 2 && ticket.status !== 3 && (
                            <button
                                onClick={() => {
                                    setSelectedTicket(ticket);
                                    setShowMaxMinutesModal(true);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                                title={t("tickets.tooltip.changeMaxMinutes")}
                            >
                                <FaClock />
                            </button>
                        )}
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

            {/* Modal for technician assignment */}
            <TechnicianAssignModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleTechnicianSubmit}
                ticketId={selectedTicketId}
            />

            {/* Modal for changing maximum minutes */}
            <MaxMinutesModal
                isOpen={showMaxMinutesModal}
                onClose={() => {
                    setShowMaxMinutesModal(false);
                    setSelectedTicket(null);
                }}
                onSubmit={handleMaxMinutesSubmit}
                currentValue={selectedTicket?.maximum_minutes}
            />
        </div>
    );
};

export default TicketsTable;
