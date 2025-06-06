import { useMemo, useState, useEffect } from "react";
import TicketsTable from "./components/TicketsTable.jsx";
import TicketActions from "../../../Components/Ticket/Actions/TicketActions.jsx";
import { useGetAllTicketUserQuery, useCreateTicketUserMutation } from "../../../redux/feature/user/Tickets/user.ticket.apislice.js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AddTicketModal from "./components/AddTicketModal.jsx";
import TicketDetails from "../../../Components/TicketDetails.jsx";

export default function UserTickets() {
    const { ticketId } = useParams();
    const navigate = useNavigate();

    // State for search, pagination, and modal
    const [search, setSearch] = useState("");
    const [searchColumn, setSearchColumn] = useState("title");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [ticketData, setTicketData] = useState({
        title: '',
        description: '',
        service_id: ''
    });

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Build query params (if your API supports pagination/search)
    const queryParams = {
        page: currentPage,
        per_page: itemsPerPage,
        ...(debouncedSearch && { handle: debouncedSearch, search_column: searchColumn }),
        ...(dateFrom && { from: dateFrom }),
        ...(dateTo && { to: dateTo }),

    };

    // Fetch tickets
    const { data, refetch, isLoading, error } = useGetAllTicketUserQuery(queryParams);
    const ticketsData = useMemo(() => data?.data || [], [data]);
    const totalPages = data?.meta?.last_page || 1;
    const totalRecords = data?.meta?.total || 0;

    const [createTicket] = useCreateTicketUserMutation();

    // Handlers
    const handleAddTicket = () => {
        createTicket(ticketData).unwrap()
            .then(() => {
                toast.success("Ticket created successfully!");
                refetch();
            })
            .catch(() => {
                toast.error("Failed to create ticket!");
            });
        setShowTicketModal(false);
        setTicketData({ title: '', description: '', service_id: '' });
    };

    const handleTicketClick = (ticketId) => {
        navigate(`view/${ticketId}`);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const handleSearch = (searchValue, column) => {
        setSearch(searchValue);
        setSearchColumn(column);
    };
    const handleDateFilter = (from, to) => {
        setDateFrom(from);
        setDateTo(to);
        setCurrentPage(1); // Reset to first page when changing date filter
    }

    // Show ticket details if ticketId is present
    if (ticketId) {
        return <TicketDetails ticketId={ticketId} />;
    }

    if (isLoading) {
        return (
            <div className="p-6 mx-auto">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Loading tickets...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 mx-auto">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">Error loading tickets</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 mx-auto">
            <h1 className="text-4xl font-bold text-gray-800">All Tickets</h1>
            <TicketActions
                search={search}
                searchColumn={searchColumn}
                setSearch={setSearch}
                setSearchColumn={setSearchColumn}
                setShowModal={setShowTicketModal}
                onSearch={handleSearch}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                onDateFilter={handleDateFilter}
            />

            <TicketsTable
                ticketsData={ticketsData}
                search={search}
                searchColumn={searchColumn}
                onTicketClick={handleTicketClick}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalRecords={totalRecords}
                refetch={refetch}
            />

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                theme="light"
            />

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