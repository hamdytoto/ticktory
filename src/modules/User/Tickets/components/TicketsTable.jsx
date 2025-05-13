/* eslint-disable react/prop-types */
import { useState } from "react";
import Pagination from "../../../../common/Pagnitation.jsx";
import { getTicketStatusInfo } from "../../../../Components/utils/ticketSatus.js"; // ensure you have this utility
import { FaEdit } from "react-icons/fa";
// import { toast } from "react-toastify";

import {
    useGetAllTicketUserQuery,
    // useGetOneTicketUserQuery,
    useUpdateTicketUserMutation,

} from "../../../../redux/feature/user/Tickets/user.ticket.apislice.js";
import EditTicketModal from "./EditTicketModal.jsx";
import { toast } from "react-toastify";

const itemsPerPage = 7; // Number of items per page

const TicketsTable = ({ ticketsData, search, searchColumn, onTicketClick }) => {
    // const [deleteTicket] = useDeleteTicketMutation();
    const { refetch } = useGetAllTicketUserQuery();
    const [updateTicket] = useUpdateTicketUserMutation();
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
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

    // const handleDeleteClick = async (ticket) => {
    //     try {
    //         await deleteTicket(ticket.id).unwrap();
    //         refetch();
    //         toast.success("Ticket deleted successfully!");
    //     } catch (err) {
    //         toast.error("Failed to delete ticket!");
    //         console.error("Error deleting ticket:", err);
    //     }
    // };

    const handleEditClick = (ticket) => {
        setSelectedTicket(ticket);
        setShowEditModal(true);
    };

    const handleUpdateTicket = async () => {
        try {
            await updateTicket({
                id: selectedTicket.id,     // ID from the ticket
                data: {
                    title: selectedTicket.title,
                    description: selectedTicket.description,
                    service_id: selectedTicket.service_id,
                    // Add any other editable fields here
                },
            }).unwrap()
            refetch(); // Refresh ticket list
            toast.success("Ticket updated successfully!");
            setShowEditModal(false);
        }
        catch (err) {
            toast.error("Failed to update ticket!");
            console.error("Error updating ticket:", err);
        }

    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg ">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-left text-lg md:text-md font-semibold border-b border-gray-300">
                            <th className="py-3 px-4">TITLE</th>
                            <th className="py-1 px-1">DESCRIPTION</th>
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4">ASSIGNED BY</th>
                            <th className="py-3 px-4">ASSIGNED TO</th>
                            <th className="py-3 px-4">SERVICE</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTickets.map((ticket) => {
                            const { label, className } = getTicketStatusInfo(ticket.status);
                            return (
                                <tr
                                    key={ticket.id}
                                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                                >
                                    <td className="py-3 px-4 cursor-pointer"
                                        onClick={() => onTicketClick(ticket.id)}>
                                        <p className="text-gray-800 text-md font-medium">
                                            {ticket.title.slice(0, 30)} ...
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            {ticket.user?.name || "—"} 👤
                                        </p>
                                    </td>

                                    <td className="py-1 px-1">{ticket.description.slice(0, 50)} ...</td>

                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-2 text-sm font-bold rounded-lg ${className}`}
                                        >
                                            {label}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4">
                                        {ticket.manager?.user?.name || "—"}
                                    </td>
                                    <td className="py-3 px-4">
                                        {ticket.technician?.user?.name || "—"}
                                    </td>
                                    <td className="py-3 px-4">{ticket.service?.name || "—"}</td>

                                    <td className="py-3 px-4 mt-3 flex items-center space-x-3">
                                        {/* EDIT BUTTON */}
                                        <button
                                            onClick={() => handleEditClick(ticket)}
                                            className="text-blue-600 hover:text-blue-700"
                                            title="Edit Ticket"
                                        >
                                            <FaEdit />
                                        </button>

                                        {/* DELETE BUTTON */}
                                        {/* <button
                                            onClick={() => handleDeleteClick(ticket)}
                                            className="text-red-600 hover:text-red-700"
                                            title="Delete Ticket"
                                        >
                                            <FaTrashAlt />
                                        </button> */}
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
