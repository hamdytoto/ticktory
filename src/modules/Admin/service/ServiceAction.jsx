/* eslint-disable react/prop-types */
import { FaPlus, FaSearch } from "react-icons/fa";

const ServiceActions = ({
    search, setSearch,
    itemsPerPage, setItemsPerPage,
    setShowModal
}) => {
    return (
        <>
            <h1 className="text-4xl font-bold text-gray-800">Add Services</h1>
            <div className="p-0 mb-6 mt-6 flex flex-wrap items-center justify-between gap-4">

                {/* Search Box - Updated to match SearchForm styling */}
                <div className="flex items-center rounded-xl bg-gray-50 shadow-md overflow-hidden flex-1 max-w-md p-3">
                    <div className="pl-1 pr-2 text-gray-400 flex-shrink-0">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Services"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 py-2 px-2 outline-none text-sm min-w-0 bg-transparent"
                    />
                </div>

                {/* Dropdown & Button */}
                <div className="flex items-center gap-6">
                    <button
                        className="px-4 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        onClick={() => setShowModal(true)}
                    >
                        <FaPlus className="w-4 h-4" /> New Service
                    </button>
                    <select
                        className="border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        {[5, 7, 10, 25, 50].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>

                    {/* Button - Updated to match SearchForm button styling */}
                </div>
            </div>
        </>
    );
};

export default ServiceActions;