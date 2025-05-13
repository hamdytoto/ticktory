import { useMemo, useState } from "react";
import TicketsTable from "./components/TicketsTable.jsx";
import TicketActions from "./components/TicketActions.jsx";
import { useGetAllTicketUserQuery, useCreateTicketUserMutation } from "../../../redux/feature/user/Tickets/user.ticket.apislice.js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AddTicketModal from "./components/AddTicketModal.jsx";
import TicketDetails from "../../../Components/TicketDetails.jsx";

export default function UserTickets() {
    const { data, refetch } = useGetAllTicketUserQuery();
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const ticketsData = useMemo(() => data?.data || [], [data]);
    const [createTicket] = useCreateTicketUserMutation();
    const [search, setSearch] = useState("");
    const [searchColumn, setSearchColumn] = useState("title"); // default column
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [ticketData, setTicketData] = useState({
        title: '',
        description: '',
        service_id: ''
    });

    const handleAddTicket = () => {
        console.log("Submit ticket:", ticketData.service_id);

        createTicket(ticketData).unwrap()
            .then(() => {
                toast.success("Ticket created successfully!");
                refetch();
            })
            .catch((error) => {
                console.error("Error creating ticket:", error);
                toast.error("Failed to create ticket!");
            });
        setShowTicketModal(false);
        setTicketData({ title: '', description: '', service_id: '' }); // Reset form
    };

    const handleTicketClick = (ticketId) => {
        console.log("Ticket ID:", ticketId);
        navigate(`view/${ticketId}`);
    }
    if (ticketId) {
        // If there's a ticketId in the route, show the detail view
        return <TicketDetails ticketId={ticketId} />;
    }


    return (
        <div className="p-6 mx-auto">
            <h1 className="text-4xl font-bold text-gray-800">All Tickets</h1>

            <TicketActions
                search={search}
                setSearch={setSearch}
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                setShowModal={setShowTicketModal} // Pass setShowModal to TicketActions
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
            {/* Add Ticket Modal */}

            <AddTicketModal
                show={showTicketModal}
                onClose={() => setShowTicketModal(false)}
                ticketData={ticketData}
                setTicketData={setTicketData}
                onAdd={handleAddTicket}
            />


        </div>
    );
}
