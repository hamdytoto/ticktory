import { FaTicketAlt, FaTasks, FaCheckCircle, FaUsers, FaTools,FaHourglassHalf  } from "react-icons/fa";

const getIconByLabel = (label) => {
    switch (label) {
        case "stats.allTickets":
            return <FaTicketAlt size={20} className="text-blue-900" />;
        case "stats.openTickets":
            return <FaTasks size={20} className="text-blue-900" />;
        case "stats.closedTickets":
            return <FaCheckCircle size={20} className="text-blue-900" />;
        case "stats.inProgressTickets":
            return <FaHourglassHalf size={20} className="text-blue-900 " />;
        case "stats.managersCount":
        case "stats.techniciansCount":
            return <FaUsers size={20} className="text-blue-900" />;
        case "stats.servicesCount":
            return <FaTools size={20} className="text-blue-900" />;
        default:
            return <FaTicketAlt size={20} className="text-blue-900" />;
    }
};

export default getIconByLabel;
