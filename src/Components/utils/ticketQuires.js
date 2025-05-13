// utils/ticketQueries.js
import {useGetOneTicketApiQuery as useAdminTicket} from "../../redux/feature/admin/Tickets/admin.ticket.apislice";
import {useShowOneTicketApiQuery as useManagerTicket} from "../../redux/feature/Manager/Tickets/manager.ticket.apislice";
import {useGetOneTicketTechQuery as useTechnicianTicket} from "../../redux/feature/technician/Tickets/tech.ticket.apislice"; // useGetOneTicketTechQuery
import {useGetOneTicketUserQuery as useUserTicket} from "../../redux/feature/user/Tickets/user.ticket.apislice"; // useGetOneTicketUserQuery

export const getTicketQueryHookByRole = (role) => {
  switch (role) {
    case "admin":
      return useAdminTicket;
    case "user":
      return useUserTicket;
    case "manager":
      return useManagerTicket;
    case "technician":
      return useTechnicianTicket;
    default:
      return null;
  }
};
