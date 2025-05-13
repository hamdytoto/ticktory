/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";

const TicketActions = ({ search, setSearch, searchColumn, setSearchColumn }) => {
    const columns = [
        { value: "title", label: "Title" },
        { value: "status", label: "Status" },
        { value: "user", label: "User" },
        { value: "manager", label: "Manager" },
        { value: "technician", label: "Technician" },
        { value: "service", label: "Service" },
    ];

    return (
        <div className="p-0 mb-6 mt-6 flex flex-wrap items-center justify-between gap-4">
            {/* Combined Search & Filter UI */}
            <div className="flex items-center border rounded-[15px] shadow-sm overflow-hidden w-full max-w-xl p-2">
                {/* Search Icon */}
                <div className="pl-4 pr-2 text-gray-400">
                    <FaSearch />
                </div>

                {/* Input field */}
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 py-2 px-2 outline-none text-sm"
                />

                {/* Divider */}
                <div className="w-px h-6 bg-gray-200" />

                {/* Filter dropdown */}
                <select
                    value={searchColumn}
                    onChange={(e) => setSearchColumn(e.target.value)}
                    className="py-2 px-4 text-sm text-gray-600 bg-transparent outline-none appearance-none cursor-pointer"
                >
                    {columns.map((col) => (
                        <option key={col.value} value={col.value}>
                            {col.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TicketActions;
