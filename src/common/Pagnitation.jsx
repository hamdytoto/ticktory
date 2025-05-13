/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, dataLength }) => {
    return (
        <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
            <p>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalPages * itemsPerPage)} of {totalPages * itemsPerPage} entries
                <span className="ml-3 font-semibold">Total Records: {dataLength}</span>
            </p>
            <div className="flex space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-500 text-white hover:bg-gray-700"
                        }`}
                >
                    &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => onPageChange(i + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === i + 1
                            ? "bg-blue-700 text-white"
                            : "bg-gray-300 hover:bg-gray-400"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-500 text-white hover:bg-gray-700"
                        }`}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Pagination;
