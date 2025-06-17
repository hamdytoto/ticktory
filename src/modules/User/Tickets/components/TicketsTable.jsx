/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import Pagination from "../../../../common/Pagnitation.jsx";
import Table from "../../../../Components/Table/Table.jsx";
import { getTicketStatusInfo } from "../../../../Components/utils/ticketSatus.js";
import EditTicketModal from "./EditTicketModal.jsx";
import { useApiCallback } from "../../../../Components/utils/validation.js";

import {
    useUpdateTicketUserMutation,
} from "../../../../redux/feature/user/Tickets/user.ticket.apislice.js";

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

    const [updateTicket] = useUpdateTicketUserMutation();
    const { handleApiCallback } = useApiCallback();
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleEditClick = (ticket) => {
        setSelectedTicket(ticket);
        setShowEditModal(true);

    };

    const handleUpdateTicket = async () => {
        handleApiCallback(async () => {
            await updateTicket({
                id: selectedTicket.id,
                data: {
                    title: selectedTicket.title,
                    description: selectedTicket.description,
                    service_id: selectedTicket.service_id,
                    section_id: selectedTicket.section_id,
                },
            }).unwrap();
            refetch();
            toast.success(t("tickets.toast.ticketUpdated") || "Ticket updated successfully!");
            setShowEditModal(false);
            
        },"editticket")
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
            key: "assignedBy",
            label: t("table.columns.manager") || "ASSIGNED BY",
            render: (ticket) => ticket.manager?.user?.name || "—",
        },
        {
            key: "assignedTo",
            label: t("table.columns.technician") || "ASSIGNED TO",
            render: (ticket) => ticket.technician?.user?.name || "—",
        },
        {
            key: "service",
            label: t("table.columns.service"),
            render: (ticket) => (
                <div className="flex flex-col">
                    <span className="font-medium">
                        {ticket.section.name || "—"}
                    </span>
                    {ticket.section.service?.name && (
                        <span className="text-sm text-gray-500">
                            ({ticket.section.service.name || "—"})
                        </span>
                    )}
                </div>
            ),
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
                ticket.status === 0 ? (
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleEditClick(ticket)}
                            className="text-blue-600 hover:text-blue-700"
                            title={t("tickets.tooltip.editTicket") || "Edit Ticket"}
                        >
                            <FaEdit />
                        </button>
                    </div>
                ) : null
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
                // actionsRenderer={handleEditClick}
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

            {/* Edit Modal */}
            <EditTicketModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                ticketData={selectedTicket}
                setTicketData={setSelectedTicket}
                onUpdate={handleUpdateTicket}
            />
        </div>
    );
};

export default TicketsTable;