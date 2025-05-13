/* eslint-disable react/prop-types */
import { useState } from "react";
import Pagination from "../../../../common/Pagnitation.jsx";
import { getTicketStatusInfo } from "../../../../Components/utils/ticketSatus.js"; // ensure you have this utility

const itemsPerPage = 7;

const TicketsTable = ({ ticketsData, search, searchColumn,onTicketClick }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(ticketsData.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    //  Filter tickets based on search column and search query
    const filteredTickets = ticketsData.filter((ticket) => {
        let fieldValue = '';
        if (searchColumn === 'title') {
            fieldValue = ticket.title;
        } else if (searchColumn === 'status') {
            fieldValue = getTicketStatusInfo(ticket.status).label;
        } else if (searchColumn === 'user') {
            fieldValue = ticket.user?.name;
        } else if (searchColumn === 'manager') {
            fieldValue = ticket.manager?.user?.name;
        } else if (searchColumn === 'technician') {
            fieldValue = ticket.technician?.user?.name;
        }
        else if (searchColumn === 'service') {
            fieldValue = ticket.service?.name;
        }
        return fieldValue?.toLowerCase().includes(search.toLowerCase());
    });

    const displayedTickets = filteredTickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg ">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-left text-lg md:text-md font-semibold border-b border-gray-300">
                            <th className="py-3 px-4">TITLE</th>
                            <th className="py-3 px-4">DESCRIPTION</th>
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4">SERVICE</th>
                            <th className="py-3 px-4">MANAGER</th>
                            <th className="py-3 px-4">ASSIGNED TO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTickets.map((ticket) => {
                            const { label, className } = getTicketStatusInfo(ticket.status);
                            return (
                                <tr
                                    key={ticket.id}
                                    className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                                    onClick={() => onTicketClick(ticket.id)}
                                >
                                    <td className="py-3 px-4">
                                        <p className="text-gray-800 text-md font-medium">
                                            {ticket.title.slice(0, 30)} ...
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            {ticket.user?.name || "—"} 👤
                                        </p>
                                    </td>

                                    <td className="py-3 px-4">{ticket.description.slice(0, 50)} ...</td>

                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-2 text-sm font-bold rounded-lg ${className}`}
                                        >
                                            {label}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4">{ticket.service?.name || "—"}</td>

                                    <td className="py-3 px-4">
                                        {ticket.manager?.user?.name || "—"}
                                    </td>

                                    <td className="py-3 px-4">
                                        {ticket.technician?.user?.name || "—"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
