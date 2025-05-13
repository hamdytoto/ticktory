/* eslint-disable react/prop-types */
import { useState } from "react";
import Pagination from "../../../../common/Pagnitation";
import TicketRow from "../../../../test/ticket/TicketRow";

const TicketsTable = ({ ticketsData, search, searchColumn }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const totalPages = Math.ceil(ticketsData.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const filteredTickets = ticketsData.filter(ticket => {
        const valueMap = {
            title: ticket.title,
            status: ticket.statusLabel,
            user: ticket.user?.name,
            technician: ticket.technician?.user?.name,
            service: ticket.service?.name
        };
        return valueMap[searchColumn]?.toLowerCase().includes(search.toLowerCase());
    });

    const displayedTickets = filteredTickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-left text-lg md:text-md font-semibold border-b border-gray-300">
                            <th className="py-3 px-4">TITLE</th>
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4">SERVICE</th>
                            <th className="py-3 px-4">ASSIGNED TO</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTickets.map(ticket => (
                            <TicketRow key={ticket.id} ticket={ticket} />
                        ))}
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
