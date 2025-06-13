/* eslint-disable react/prop-types */
import { FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DateFilterForm = ({
  localDateFrom,
  setLocalDateFrom,
  localDateTo,
  setLocalDateTo,
  handleDateSubmit,
  clearDateFilter,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleDateSubmit} className=" bg-gray-50 rounded-xl shadow-xl w-full lg:max-w-xl p-3 ">
      <div className="flex items-center gap-2 mb-4">
        <FaCalendarAlt className="text-gray-400" />
        <label className="text-sm text-gray-600 font-medium">
          {t("filters.dateRangeFilter", "Date Range Filter")}
        </label>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1 min-w-0">
          <label className="block text-sm text-gray-600 mb-1">
            {t("filters.from", "From:")}
          </label>
          <input
            type="date"
            value={localDateFrom}
            onChange={(e) => setLocalDateFrom(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 min-w-0">
          <label className="block text-sm text-gray-600 mb-1">
            {t("filters.to", "To:")}
          </label>
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
            {t("filters.applyFilter", "Apply Filter")}
          </button>

          {(localDateFrom || localDateTo) && (
            <button
              type="button"
              onClick={clearDateFilter}
              className="flex-1 sm:flex-initial px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t("filters.clear", "Clear")}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default DateFilterForm;
