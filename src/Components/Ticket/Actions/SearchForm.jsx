/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SearchForm = ({
    localSearch,
    setLocalSearch,
    localSearchColumn,
    setLocalSearchColumn,
    columns,
    onSearch,
    clearSearch,
    handleSearchSubmit,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <form
                onSubmit={handleSearchSubmit}
                className="flex items-center rounded-xl bg-gray-50 shadow-md overflow-hidden w-full lg:max-w-xl p-3"
            >
                <div className="pl-4 pr-2 text-gray-400 flex-shrink-0">
                    <FaSearch />
                </div>

                <input
                    type="text"
                    placeholder={t("filters.searchPlaceholder", "Search tickets...")}
                    value={localSearch}
                    onChange={(e) => {
                        setLocalSearch(e.target.value);
                        onSearch(e.target.value, localSearchColumn);
                    }}
                    className="flex-1 py-2 px-2 outline-none text-sm min-w-0"
                />

                {localSearch && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="px-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                        aria-label={t("filters.clearSearch", "Clear search")}
                    >
                        ×
                    </button>
                )}

                <div className="w-px h-6 bg-gray-200 hidden sm:block" />

                <select
                    value={localSearchColumn}
                    onChange={(e) => setLocalSearchColumn(e.target.value)}
                    className="hidden sm:block py-2 px-4 text-sm text-gray-600 bg-transparent outline-none appearance-none cursor-pointer flex-shrink-0"
                    aria-label={t("filters.searchIn", "Search in")}
                >
                    {columns.map((col) => (
                        <option key={col.value} value={col.value}>
                            {col.label}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="ml-2 px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                    <span className="hidden sm:inline">{t("filters.search", "Search")}</span>
                    <FaSearch className="sm:hidden" />
                </button>
            </form>

            <div className="sm:hidden">
                <label className="block text-sm text-gray-600 font-medium mb-2">
                    {t("filters.searchIn", "Search in:")}
                </label>
                <select
                    value={localSearchColumn}
                    onChange={(e) => setLocalSearchColumn(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {columns.map((col) => (
                        <option key={col.value} value={col.value}>
                            {col.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default SearchForm;
