/* eslint-disable react/prop-types */
import { FaSearch, FaCalendarAlt, FaCog } from "react-icons/fa";
import { useState, useEffect } from "react";

const TicketActions = ({
    search,
    searchColumn,
    onSearch,
    dateFrom,
    dateTo,
    onDateFilter,
    itemsPerPage,
    onItemsPerPageChange
}) => {
    const [localSearch, setLocalSearch] = useState(search);
    const [localSearchColumn, setLocalSearchColumn] = useState(searchColumn);
    const [localDateFrom, setLocalDateFrom] = useState(dateFrom);
    const [localDateTo, setLocalDateTo] = useState(dateTo);

    // Sync local search with parent when parent changes
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
                {/* Search Section */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center rounded-xl shadow-xl overflow-hidden w-full lg:max-w-xl p-2"
                >
                    <div className="pl-4 pr-2 text-gray-400 flex-shrink-0">
                        <FaSearch />
                    </div>

                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={localSearch}
                        onChange={(e) => {
                            setLocalSearch(e.target.value);
                            // Auto-search on type for better UX
                            onSearch(e.target.value, localSearchColumn);
                        }}
                        className="flex-1 py-2 px-2 outline-none text-sm min-w-0"
                    />

                    {localSearch && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="px-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                        >
                            ×
                        </button>
                    )}

                    <div className="w-px h-6 bg-gray-200 hidden sm:block" />

                    {/* Search Column Selector - Hidden on mobile, shown in dropdown */}
                    <select
                        value={localSearchColumn}
                        onChange={(e) => setLocalSearchColumn(e.target.value)}
                        className="hidden sm:block py-2 px-4 text-sm text-gray-600 bg-transparent outline-none appearance-none cursor-pointer flex-shrink-0"
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
                        <span className="hidden sm:inline">Search</span>
                        <FaSearch className="sm:hidden" />
                    </button>
                </form>

                {/* Items Per Page Section */}
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-shrink-0">
                    <FaCog className="text-gray-400" />
                    <label className="text-sm text-gray-600 hidden sm:inline">Show:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {itemsPerPageOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-600 hidden sm:inline">per page</span>
                </div>
            </div>

            {/* Mobile Search Column Selector */}
            <div className="sm:hidden">
                <label className="block text-sm text-gray-600 font-medium mb-2">Search in:</label>
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

            {/* Date Filter Section */}
            <div className="w-full">
                <form onSubmit={handleDateSubmit} className="p-4 bg-gray-50 rounded-xl shadow-xl">
                    {/* Date Filter Header */}
                    <div className="flex items-center gap-2 mb-4">
                        <FaCalendarAlt className="text-gray-400" />
                        <label className="text-sm text-gray-600 font-medium">Date Range Filter</label>
                    </div>

                    {/* Date Inputs - Responsive Layout */}
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        {/* From Date */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-sm text-gray-600 mb-1">From:</label>
                            <input
                                type="date"
                                value={localDateFrom}
                                onChange={(e) => setLocalDateFrom(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* To Date */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-sm text-gray-600 mb-1">To:</label>
                            <input
                                type="date"
                                value={localDateTo}
                                onChange={(e) => setLocalDateTo(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 sm:flex-shrink-0">
                            <button
                                type="submit"
                                className="flex-1 sm:flex-initial px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
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
            </div>

            {/* Active Filters Display */}
            {(search || dateFrom || dateTo) && (
                <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-sm text-blue-800 font-medium">Active Filters:</span>

                    {search && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            Search: &ldquo;{search}&quot; in {searchColumn}
                            <button
                                onClick={clearSearch}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    )}

                    {(dateFrom || dateTo) && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            Date: {dateFrom || "Start"} to {dateTo || "End"}
                            <button
                                onClick={clearDateFilter}
                                className="ml-1 text-green-600 hover:text-green-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default TicketActions;