/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import ItemsPerPageSelector from "./ItemsPerPageSelector";
import DateFilterForm from "./DateFilterForm";
import ActiveFilters from "./ActiveFilters";

const TicketActions = ({
  search,
  searchColumn,
  onSearch,
  dateFrom,
  dateTo,
  onDateFilter,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
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
    { value: "title", label: "Title" },
    { value: "status", label: "Status" },
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
    { value: "technician", label: "Technician" },
    { value: "service", label: "Service" },
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
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          options={itemsPerPageOptions}
        />
      </div>

      <DateFilterForm
        localDateFrom={localDateFrom}
        setLocalDateFrom={setLocalDateFrom}
        localDateTo={localDateTo}
        setLocalDateTo={setLocalDateTo}
        handleDateSubmit={handleDateSubmit}
        clearDateFilter={clearDateFilter}
      />

      <ActiveFilters
        search={search}
        searchColumn={searchColumn}
        dateFrom={dateFrom}
        dateTo={dateTo}
        clearSearch={clearSearch}
        clearDateFilter={clearDateFilter}
      />
    </div>
  );
};

export default TicketActions;
