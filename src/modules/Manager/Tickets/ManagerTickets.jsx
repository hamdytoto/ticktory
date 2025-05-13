import { useState } from "react";
import TicketsTable from "./components/TicketsTable.jsx";
import TicketActions from "./components/TicketActions.jsx";
import { useShowAllTicketsApiQuery } from "../../../redux/feature/Manager/Tickets/manager.ticket.apislice.js";
import { ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import TicketDetails from "../../../Components/TicketDetails.jsx";

export default function MangerTickets() {
    const { data } = useShowAllTicketsApiQuery();
    const { ticketId } = useParams();
    const navigate = useNavigate();
    console.log(data, "data from manager tickets");
    const ticketsData = data?.data || [];

    const [search, setSearch] = useState("");
    const [searchColumn, setSearchColumn] = useState("title"); // default column
    if (ticketId) {
        return <TicketDetails ticketId={ticketId} />
    }
    const handleTicketClick = (ticketId) => {
        navigate(`view/${ticketId}`);
    };

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
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                theme="light"
            />
        </div>
    );
}
