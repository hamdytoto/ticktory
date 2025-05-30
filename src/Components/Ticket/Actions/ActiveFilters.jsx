/* eslint-disable react/prop-types */
const ActiveFilters = ({
  search,
  searchColumn,
  dateFrom,
  dateTo,
  clearSearch,
  clearDateFilter,
}) => {
  if (!search && !dateFrom && !dateTo) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <span className="text-sm text-blue-800 font-medium">Active Filters:</span>

      {search && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          Search: &ldquo;{search}&rdquo; in {searchColumn}
          <button onClick={clearSearch} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
        </span>
      )}

      {(dateFrom || dateTo) && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
          Date: {dateFrom || "Start"} to {dateTo || "End"}
          <button onClick={clearDateFilter} className="ml-1 text-green-600 hover:text-green-800">×</button>
        </span>
      )}
    </div>
  );
};

export default ActiveFilters;
