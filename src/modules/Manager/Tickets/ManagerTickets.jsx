import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useShowAllTicketsApiQuery } from "../../../redux/feature/Manager/Tickets/manager.ticket.apislice.js";
import TicketDetails from "../../../Components/TicketDetails.jsx";
import TicketActions from "../../../Components/Ticket/Actions/TicketActions.jsx";
import TicketsTable from "./TicketsTable.jsx";
import { ToastContainer } from "react-toastify";

export default function ManagerTickets() {
    const { ticketId } = useParams();
    const navigate = useNavigate();

    // State
    const [search, setSearch] = useState("");
    const [searchColumn, setSearchColumn] = useState("title");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Build query params if your API supports it (you can customize this to match backend)
    const queryParams = {
        page: currentPage,
        per_page: itemsPerPage,
        ...(debouncedSearch && { handle: debouncedSearch, search_column: searchColumn }),
        ...(dateFrom && { from: dateFrom }),
        ...(dateTo && { to: dateTo }),
    };

    // API call
    const { data, isLoading, error, refetch } = useShowAllTicketsApiQuery(queryParams);
    const ticketsData = data?.data || [];
    const totalPages = data?.meta?.last_page || 1;
    const totalRecords = data?.meta?.total || 0;

    // If a ticket is selected, show details
    if (ticketId) {
        return <TicketDetails ticketId={ticketId} />;
    }

    // Handlers
    const handleTicketClick = (ticketId) => navigate(`view/${ticketId}`);
    const handlePageChange = (page) => page >= 1 && page <= totalPages && setCurrentPage(page);
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
        setCurrentPage(1);
    };

    // Loading and error states
    if (isLoading) {
        return (
            <div className="p-6 mx-auto flex justify-center items-center h-64 text-lg text-gray-600">
                Loading tickets...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 mx-auto flex justify-center items-center h-64 text-lg text-red-600">
                Error loading tickets
            </div>
        );
    }

    // Main Render
    return (
        <div className="p-6 mx-auto">
            <h1 className="text-4xl font-bold text-gray-800">All Tickets</h1>

            <TicketActions
                search={search}
                searchColumn={searchColumn}
                onSearch={handleSearch}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateFilter={handleDateFilter}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
            />

            <TicketsTable
                ticketsData={ticketsData}
                onTicketClick={handleTicketClick}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalRecords={totalRecords}
                refetch={refetch}
            />

            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} theme="light" />
        </div>
    );
}
