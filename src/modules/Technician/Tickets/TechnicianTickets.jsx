import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllTicketsTechQuery } from "../../../redux/feature/technician/Tickets/tech.ticket.apislice.js";
import TicketDetails from "../../../Components/TicketDetails.jsx";
import TicketActions from "../../../Components/Ticket/Actions/TicketActions.jsx";
import TicketsTable from "./TicketsTable.jsx";
import { ToastContainer } from "react-toastify";

export default function TechnicianTickets() {
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

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Query params
    const queryParams = {
        page: currentPage,
        per_page: itemsPerPage,
        ...(debouncedSearch && { handle: debouncedSearch, search_column: searchColumn }),
        ...(dateFrom && { from: dateFrom }),
        ...(dateTo && { to: dateTo }),
    };

    // API call
    const { data, isLoading, error, refetch } = useGetAllTicketsTechQuery(queryParams);
    const ticketsData = data?.data || [];
    const totalPages = data?.meta?.last_page || 1;
    const totalRecords = data?.meta?.total || 0;

    // Show TicketDetails if URL has ticketId
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
