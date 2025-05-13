import { useParams } from "react-router-dom";
import TicketDetails from "../../../Components/TicketDetails"; // import the details component
import TicketsTable from "./components/TicketsTable";
import TicketActions from "./components/TicketActions";
import { useGetAllTicketsApiQuery } from "../../../redux/feature/admin/Tickets/admin.ticket.apislice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminTickets() {
  const { ticketId } = useParams(); // read ticket ID from route
  const { data } = useGetAllTicketsApiQuery();
  const ticketsData = data?.data || [];
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchColumn, setSearchColumn] = useState("title");

  if (ticketId) {
    // If there's a ticketId in the route, show the detail view
    return <TicketDetails ticketId={ticketId} />;
  }
   const handleTicketClick = (ticketId) => {
    navigate(`view/${ticketId}`);
  };

  // Otherwise show the full tickets list
  return (
    <div className="p-6 mx-auto">
      <h1 className="text-4xl font-bold text-gray-800">All Tickets</h1>

      <TicketActions
        search={search}
        setSearch={setSearch}
        searchColumn={searchColumn}
        setSearchColumn={setSearchColumn}
      />

      <TicketsTable
        ticketsData={ticketsData}
        search={search}
        searchColumn={searchColumn}
        onTicketClick={handleTicketClick}
      />
    </div>
  );
}
