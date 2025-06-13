/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

const ActiveFilters = ({
  search,
  searchColumn,
  dateFrom,
  dateTo,
  serviceId,
  services,
  clearSearch,
  clearDateFilter,
  clearServiceFilter,
}) => {
  const { t } = useTranslation();

  const hasActiveFilters = search || dateFrom || dateTo || serviceId;
  if (!hasActiveFilters) return null;

  const selectedService = services?.find(service => service.id === parseInt(serviceId));
  const serviceName = selectedService?.name || "";

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <span className="text-sm text-blue-800 font-medium">
        {t("filters.activeFilters", "Active Filters")}:
      </span>

      {search && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          {t("filters.search", "Search")}: &ldquo;{search}&rdquo;
          {searchColumn && ` (${t(`table.columns.${searchColumn}`, searchColumn)})`}
          <button onClick={clearSearch} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
        </span>
      )}

      {(dateFrom || dateTo) && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
          {t("filters.dateRange", "Date Range")}:
          {dateFrom && ` ${t("filters.from", "From")} ${dateFrom}`}
          {dateTo && ` ${t("filters.to", "To")} ${dateTo}`}
          <button onClick={clearDateFilter} className="ml-1 text-green-600 hover:text-green-800">×</button>
        </span>
      )}

      {serviceId && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
          {t("filters.service", "Service")}: {serviceName}
          <button onClick={clearServiceFilter} className="ml-1 text-purple-600 hover:text-purple-800">×</button>
        </span>
      )}
    </div>
  );
};

export default ActiveFilters;
