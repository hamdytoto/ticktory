/* eslint-disable react/prop-types */
import TicketStatusBadge from "../TicketStatusBadge";
import TicketActions from "../../modules/Manager/Tickets/components/TicketActions";

const TicketRow = ({ ticket }) => {
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100 transition">
            <td className="py-3 px-4">
                <p className="text-gray-800 text-md font-medium">{ticket.title.slice(0, 30)} ...</p>
                <p className="text-gray-500 text-sm">{ticket.user?.name || "—"} 👤</p>
            </td>
            <td className="py-3 px-4">
                <TicketStatusBadge status={ticket.status} />
            </td>
            <td className="py-3 px-4">{ticket.service?.name || "—"}</td>
            <td className="py-3 px-4">{ticket.technician?.user?.name || "—"}</td>
            <td className="py-3 px-4 mt-3 flex items-center space-x-3">
                <TicketActions ticket={ticket} />
            </td>
        </tr>
    );
};

export default TicketRow;
