/* eslint-disable react/prop-types */
import { FaRegCircle, FaCheckCircle, FaPaperPlane, FaCheckDouble, FaLock } from "react-icons/fa";
import { useFinishTicketApiMutation, useShowAllTicketsApiQuery } from "../../redux/feature/Manager/Tickets/manager.ticket.apislice";

const ButtonActions = ({ ticket }) => {
    const [finishTicket] = useFinishTicketApiMutation();
    const { refetch } = useShowAllTicketsApiQuery();

    const handleAssignClick = () => {
        console.log("Assigning technician to ticket:", ticket.id);
    };

    const handleResolveClick = () => {
        try {
            finishTicket(ticket.id);
            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    if (ticket.status === 3) {
        return (
            <span className="text-gray-500 flex items-center space-x-1" title="Ticket Closed">
                <FaLock /> <span className="text-sm">Closed</span>
            </span>
        );
    }

    return (
        <>
            <button
                onClick={ticket.technician ? null : handleAssignClick}
                className={`${ticket.technician ? "text-green-600 cursor-default" : "text-blue-500 hover:text-blue-700"}`}
                title={ticket.technician ? "Technician Assigned" : "Assign Technician"}
            >
                {ticket.technician ? <FaCheckDouble /> : <FaPaperPlane />}
            </button>

            <button
                onClick={ticket.status === 2 ? null : handleResolveClick}
                className={`${ticket.status === 2 ? "text-green-600 cursor-default" : "text-yellow-500 hover:text-yellow-600"}`}
                title={ticket.status === 2 ? "Ticket Resolved" : "Resolve Ticket"}
            >
                {ticket.status === 2 ? <FaCheckCircle /> : <FaRegCircle />}
            </button>
        </>
    );
};

export default ButtonActions;
