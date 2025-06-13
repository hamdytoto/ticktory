import { useParams } from "react-router-dom";
import TicketDetails from "../../../Components/TicketDetails";
import TicketsTable from "./TicketsTable";
import TicketActions from "../../../Components/Ticket/Actions/TicketActions";
import { useGetAllTicketsApiQuery } from "../../../redux/feature/admin/Tickets/admin.ticket.apislice";
import { useGetServicesQuery } from "../../../redux/feature/selectMenu/select.apislice"; // Add this import
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminTickets() {
  const { t } = useTranslation();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // State for search and filters
  const [search, setSearch] = useState("");
  const [searchColumn, setSearchColumn] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [serviceId, setServiceId] = useState(""); // Add service filter state
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Fetch services data
  const { data: servicesData } = useGetServicesQuery({
    only_associated_to_managers: 1,
  });

  const services = servicesData?.data || [];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Build query parameters
  const queryParams = {
    page: currentPage,
    per_page: itemsPerPage,
    ...(debouncedSearch && { handle: debouncedSearch, search_column: searchColumn }),
    ...(dateFrom && { from: dateFrom }),
    ...(dateTo && { to: dateTo }),
    ...(serviceId && { service_id: serviceId }), // Add service_id to query params
  };

  const { data, isLoading, error } = useGetAllTicketsApiQuery(queryParams);

  const ticketsData = data?.data || [];
  const totalPages = data?.meta?.last_page || 1;
  const totalRecords = data?.meta?.total || 0;

  if (ticketId) {
    return <TicketDetails ticketId={ticketId} />;
  }

  const handleTicketClick = (ticketId) => {
    navigate(`view/${ticketId}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSearch = (searchValue, column) => {
    setSearch(searchValue);
    setSearchColumn(column);
    // Don't reset currentPage here as useEffect will handle it
  };

  const handleDateFilter = (from, to) => {
    setDateFrom(from);
    setDateTo(to);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Add service filter handlers
  const handleServiceFilter = (selectedServiceId) => {
    setServiceId(selectedServiceId);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearServiceFilter = () => {
    setServiceId("");
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="p-6 mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">{t("adminTickets.loading", "Loading tickets...")}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{t("adminTickets.error", "Error loading tickets")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-4xl font-bold text-gray-800">{t("adminTickets.allTickets", "All Tickets")}</h1>
      <TicketActions
        search={search}
        searchColumn={searchColumn}
        onSearch={handleSearch}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFilter={handleDateFilter}
        serviceId={serviceId}
        services={services}
        onServiceFilter={handleServiceFilter}
        clearServiceFilter={clearServiceFilter}
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
      />
    </div>
  );
}