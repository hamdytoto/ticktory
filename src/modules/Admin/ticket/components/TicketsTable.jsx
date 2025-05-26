/* eslint-disable react/prop-types */
import { useState } from "react";
import Pagination from "../../../../common/Pagnitation.jsx";
import { getTicketStatusInfo } from "../../../../Components/utils/ticketSatus.js";
import Table from "../../../../Components/Table/Table.jsx"; // adjust path if needed
import { useTranslation } from "react-i18next";
const itemsPerPage = 7;

const TicketsTable = ({ ticketsData, search, searchColumn, onTicketClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(ticketsData.length / itemsPerPage);
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Filter tickets based on the search column and search query
    const filteredTickets = ticketsData.filter((ticket) => {
        let fieldValue = "";
        switch (searchColumn) {
            case "title":
                fieldValue = ticket.title;
                break;
            case "status":
                fieldValue = getTicketStatusInfo(ticket.status).label;
                break;
            case "user":
                fieldValue = ticket.user?.name;
                break;
            case "manager":
                fieldValue = ticket.manager?.user?.name;
                break;
            case "technician":
                fieldValue = ticket.technician?.user?.name;
                break;
            case "service":
                fieldValue = ticket.service?.name;
                break;
            default:
                return true;
        }
        return fieldValue?.toLowerCase().includes(search.toLowerCase());
    });

    const displayedTickets = filteredTickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Columns config for the generic Table
    const columns = [
        {
            key: "title",
            label: t("table.columns.title"),
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
            label: t("table.columns.description"),
            render: (ticket) => `${ticket.description?.slice(0, 50)} ...`,
        },
        {
            key: "status",
            label: t("table.columns.status"),
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
            label: t("table.columns.service"),
            render: (ticket) => ticket.service?.name || "—",
        },
        {
            key: "manager",
            label: t("table.columns.manager"),
            render: (ticket) => ticket.manager?.user?.name || "—",
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
    ];

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    tickets={displayedTickets}
                    onTicketClick={onTicketClick}
                    getTicketStatusInfo={getTicketStatusInfo} // required if Table uses it internally
                />
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                dataLength={ticketsData.length}
            />
        </div>
    );
};

export default TicketsTable;
