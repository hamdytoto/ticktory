/* eslint-disable react/prop-types */
import { getTicketStatusInfo } from "../Components/utils/ticketSatus";

const TicketStatusBadge = ({ status }) => {
    const { label, className } = getTicketStatusInfo(status);

    return (
        <span className={`px-3 py-2 text-sm font-bold rounded-lg ${className}`}>
            {label}
        </span>
    );
};

export default TicketStatusBadge;
