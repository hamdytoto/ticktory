/* eslint-disable react/prop-types */
import { useState } from "react";
import Pagination from "../../../../common/Pagnitation.jsx";
import { getTicketStatusInfo } from "../../../../Components/utils/ticketSatus.js"; // ensure you have this utility
import { FaRegCircle, FaCheckCircle, FaPaperPlane, FaCheckDouble, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import { useFinishTicketApiMutation, useShowAllTicketsApiQuery, useAssignTicketApiMutation }
    from "../../../../redux/feature/Manager/Tickets/manager.ticket.apislice.js";
import TechnicianAssignModal from "./TechnicianAssignModal.jsx";

const itemsPerPage = 7; // Number of items per page

const TicketsTable = ({ ticketsData, search, searchColumn, onTicketClick }) => {
    const [finishTicket] = useFinishTicketApiMutation();
    const [assignTicket] = useAssignTicketApiMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const { refetch } = useShowAllTicketsApiQuery();
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

    const handleAssignClick = (ticket) => {
        setSelectedTicketId(ticket.id);
        setIsModalOpen(true);
        console.log("Assigning technician to ticket:", ticket);
    }
    const handleTechnicianSubmit = async (ticketId, technicianId) => {
        try {
            await assignTicket({ id: ticketId, technician_id: technicianId }).unwrap();
            refetch(); // Refresh ticket list
            toast.success("Ticket assigned successfully!");
        } catch (error) {
            console.error("Error assigning technician:", error);
            toast.error("Failed to assign technician!");
        }
    };


    const handleResolveClick = async (ticket) => {
        // Logic to resolve the ticket
        try {
            await finishTicket(ticket.id).unwrap();
            refetch();
            toast.success("Ticket resolved successfully!");
        }
        catch (err) {
            toast.error("Failed to resolve ticket!");
            console.error("Error resolving ticket:", err);
        }
        // console.log("Resolving ticket:", ticket);

    }


    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg ">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-left text-lg md:text-md font-semibold border-b border-gray-300">
                            <th className="py-3 px-4">TITLE</th>
                            {/* <th className="py-1 px-1">DESCRIPTION</th> */}
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4">SERVICE</th>
                            <th className="py-3 px-4">ASSIGNED TO</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTickets.map((ticket) => {
                            const { label, className } = getTicketStatusInfo(ticket.status);
                            return (
                                <tr
                                    key={ticket.id}
                                    // onClick={() => onTicketClick(ticket.id)}
                                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                                >
                                    <td className="py-3 px-4"
                                    onClick={() => onTicketClick(ticket.id)}>
                                        <p className="text-gray-800 text-md font-medium">
                                            {ticket.title.slice(0, 30)} ...
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            {ticket.user?.name || "—"} 👤
                                        </p>
                                    </td>

                                    {/* <td className="py-1 px-1">{ticket.description.slice(0, 50)} ...</td> */}

                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-2 text-sm font-bold rounded-lg ${className}`}
                                        >
                                            {label}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4">{ticket.service?.name || "—"}</td>

                                    <td className="py-3 px-4">
                                        {ticket.technician?.user?.name || "—"}
                                    </td>
                                    <td className="py-3 px-4 mt-3 flex items-center space-x-3">
                                        {ticket.status === 3 ? (
                                            <span className="text-gray-500 flex items-center space-x-1" title="Ticket Closed">
                                                <FaLock /> <span className="text-sm">Closed</span>
                                            </span>
                                        ) : (
                                            <>
                                                {/* ASSIGN TECHNICIAN BUTTON */}
                                                <button
                                                    onClick={() => {
                                                        if (!ticket.technician) handleAssignClick(ticket);
                                                    }}
                                                    className={`${ticket.technician ? "text-green-600 cursor-default" : "text-blue-500 hover:text-blue-700"
                                                        }`}
                                                    title={ticket.technician ? "Technician Assigned" : "Assign Technician"}
                                                >
                                                    {ticket.technician ? <FaCheckDouble /> : <FaPaperPlane />}
                                                </button>

                                                {/* RESOLVE TICKET BUTTON */}
                                                <button
                                                    onClick={() => {
                                                        if (ticket.status !== 2) handleResolveClick(ticket);
                                                    }}
                                                    className={`${ticket.status === 2 ? "text-green-600 cursor-default" : "text-yellow-500 hover:text-yellow-600"
                                                        }`}
                                                    title={ticket.status === 2 ? "Ticket Resolved" : "Resolve Ticket"}
                                                >
                                                    {ticket.status === 2 ? <FaCheckCircle /> : <FaRegCircle />}
                                                </button>
                                            </>
                                        )}
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




