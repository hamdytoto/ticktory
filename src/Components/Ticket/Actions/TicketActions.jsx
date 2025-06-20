/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "./SearchForm";
import ItemsPerPageSelector from "./ItemsPerPageSelector";
import DateFilterForm from "./DateFilterForm";
import ActiveFilters from "./ActiveFilters";
import ServiceFilterDropdown from "./ServiceFilter";
import { FaPlus } from "react-icons/fa";

const TicketActions = ({
  search,
  searchColumn,
  onSearch,
  dateFrom,
  dateTo,
  onDateFilter,
  serviceId,
  services,
  onServiceFilter,
  clearServiceFilter,
  itemsPerPage,
  onItemsPerPageChange,
  setShowModal,
}) => {
  const { t } = useTranslation();
  const [localSearch, setLocalSearch] = useState(search);
  const [localSearchColumn, setLocalSearchColumn] = useState(searchColumn);
  const [localDateFrom, setLocalDateFrom] = useState(dateFrom);
  const [localDateTo, setLocalDateTo] = useState(dateTo);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    setLocalSearchColumn(searchColumn);
  }, [searchColumn]);

  const columns = [
    { value: "title", label: t("table.columns.title", "Title") },
    // { value: "status", label: t("table.columns.status", "Status") },
    // { value: "user", label: t("table.columns.user", "User") },
    // { value: "manager", label: t("table.columns.manager", "Manager") },
    // { value: "technician", label: t("table.columns.technician", "Technician") },
    // { value: "service", label: t("table.columns.service", "Service") },
  ];

  const itemsPerPageOptions = [5, 7, 10, 15, 20, 25, 50];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearch, localSearchColumn);
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    onDateFilter(localDateFrom, localDateTo);
  };

  const clearDateFilter = () => {
    setLocalDateFrom("");
    setLocalDateTo("");
    onDateFilter("", "");
  };

  const clearSearch = () => {
    setLocalSearch("");
    onSearch("", localSearchColumn);
  };

  return (
    <div className="p-0 mb-6 mt-6 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <SearchForm
          localSearch={localSearch}
          setLocalSearch={setLocalSearch}
          localSearchColumn={localSearchColumn}
          setLocalSearchColumn={setLocalSearchColumn}
          columns={columns}
          onSearch={onSearch}
          clearSearch={clearSearch}
          handleSearchSubmit={handleSearchSubmit}
        />
        <div className="flex items-center gap-4">
          {setShowModal && (
            <button
              className="bg-blue-600 text-white px-4 py-2 md:py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
              onClick={() => setShowModal(true)}
            >
              <FaPlus className="w-4 h-4" /> {t("ticketActions.newTicket", "New Ticket")}
            </button>
          )}
          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            options={itemsPerPageOptions}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <DateFilterForm
          localDateFrom={localDateFrom}
          setLocalDateFrom={setLocalDateFrom}
          localDateTo={localDateTo}
          setLocalDateTo={setLocalDateTo}
          handleDateSubmit={handleDateSubmit}
          clearDateFilter={clearDateFilter}
        />
        <ServiceFilterDropdown
          serviceId={serviceId}
          services={services}
          onServiceChange={onServiceFilter}
          clearServiceFilter={clearServiceFilter}
        />
      </div>

      <ActiveFilters
        search={search}
        searchColumn={searchColumn}
        dateFrom={dateFrom}
        dateTo={dateTo}
        serviceId={serviceId}
        services={services}
        clearSearch={clearSearch}
        clearDateFilter={clearDateFilter}
        clearServiceFilter={clearServiceFilter}
      />
    </div>
  );
};

export default TicketActions;