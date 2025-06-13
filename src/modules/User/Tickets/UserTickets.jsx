import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import TicketsTable from "./components/TicketsTable.jsx";
import TicketActions from "../../../Components/Ticket/Actions/TicketActions.jsx";
import TicketDetails from "../../../Components/TicketDetails.jsx";
import AddTicketModal from "./components/AddTicketModal.jsx";
import {
    useGetAllTicketUserQuery,
    useCreateTicketUserMutation
} from "../../../redux/feature/user/Tickets/user.ticket.apislice.js";
import { useGetServicesQuery } from "../../../redux/feature/selectMenu/select.apislice"; // NEW

export default function UserTickets() {
    const { t } = useTranslation();
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

    // NEW: Service filter
    const [serviceId, setServiceId] = useState("");

    // NEW: Fetch services
    const { data: servicesData } = useGetServicesQuery({
        only_associated_to_managers: 1,
    });
    const services = servicesData?.data || [];

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Build query params
    const queryParams = {
        page: currentPage,
        per_page: itemsPerPage,
        ...(debouncedSearch && { handle: debouncedSearch, search_column: searchColumn }),
        ...(dateFrom && { from: dateFrom }),
        ...(dateTo && { to: dateTo }),
        ...(serviceId && { service_id: serviceId }) // ✅ NEW
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
                toast.success(t("tickets.toast.createSuccess", "Ticket created successfully!"));
                refetch();
            })
            .catch(() => {
                toast.error(t("tickets.toast.createError", "Failed to create ticket!"));
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
        setCurrentPage(1);
    };

    // ✅ NEW: Service filter handlers
    const handleServiceFilter = (selectedServiceId) => {
        setServiceId(selectedServiceId);
        setCurrentPage(1);
    };

    const clearServiceFilter = () => {
        setServiceId("");
        setCurrentPage(1);
    };

    // Show ticket details if ticketId is present
    if (ticketId) {
        return <TicketDetails ticketId={ticketId} />;
    }

    if (isLoading) {
        return (
            <div className="p-6 mx-auto">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">
                        {t("tickets.loading", "Loading tickets...")}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 mx-auto">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">
                        {t("tickets.error", "Error loading tickets")}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 mx-auto">
            <h1 className="text-4xl font-bold text-gray-800">
                {t("tickets.header", "My Tickets")}
            </h1>

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
                // ✅ NEW props for service filter
                serviceId={serviceId}
                services={services}
                onServiceFilter={handleServiceFilter}
                clearServiceFilter={clearServiceFilter}
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
