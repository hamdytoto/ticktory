/* eslint-disable react/prop-types */
import { FaCalendarAlt } from "react-icons/fa";

const DateFilterForm = ({
  localDateFrom,
  setLocalDateFrom,
  localDateTo,
  setLocalDateTo,
  handleDateSubmit,
  clearDateFilter,
}) => (
  <form onSubmit={handleDateSubmit} className="p-4 bg-gray-50 rounded-xl shadow-xl">
    <div className="flex items-center gap-2 mb-4">
      <FaCalendarAlt className="text-gray-400" />
      <label className="text-sm text-gray-600 font-medium">Date Range Filter</label>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
      <div className="flex-1 min-w-0">
        <label className="block text-sm text-gray-600 mb-1">From:</label>
        <input
          type="date"
          value={localDateFrom}
          onChange={(e) => setLocalDateFrom(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 min-w-0">
        <label className="block text-sm text-gray-600 mb-1">To:</label>
        <input
          type="date"
          value={localDateTo}
          onChange={(e) => setLocalDateTo(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2 sm:flex-shrink-0">
        <button
          type="submit"
          className="flex-1 sm:flex-initial px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filter
        </button>

        {(localDateFrom || localDateTo) && (
          <button
            type="button"
            onClick={clearDateFilter}
            className="flex-1 sm:flex-initial px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  </form>
);

export default DateFilterForm;
