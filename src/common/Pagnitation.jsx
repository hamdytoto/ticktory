/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, dataLength }) => {
    const { t } = useTranslation();

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total is less than max
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show pages around current page
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                end = Math.min(totalPages, 5);
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                start = Math.max(1, totalPages - 4);
            }

            // Add first page and ellipsis if needed
            if (start > 1) {
                pages.push(1);
                if (start > 2) {
                    pages.push('...');
                }
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add last page and ellipsis if needed
            if (end < totalPages) {
                if (end < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, dataLength);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-gray-600 text-sm">
            {/* Results info */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <p>
                    {t("pagination.showing", "Showing")} <span className="font-semibold">{startItem}</span>{" "}
                    {t("pagination.to", "to")} <span className="font-semibold">{endItem}</span>{" "}
                    {t("pagination.of", "of")} <span className="font-semibold">{dataLength}</span>{" "}
                    {t("pagination.entries", "entries")}
                </p>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center space-x-1">
                {/* First page button */}
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className={`px-2 py-1 rounded-md text-xs ${currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    title={t("pagination.firstPage", "First page")}
                >
                    ««
                </button>

                {/* Previous page button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    title={t("pagination.previousPage", "Previous page")}
                >
                    ‹
                </button>

                {/* Page numbers */}
                {pageNumbers.map((page, index) => (
                    <span key={index}>
                        {page === '...' ? (
                            <span className="px-3 py-1 text-gray-400">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-1 rounded-md min-w-[2rem] ${currentPage === page
                                        ? "bg-blue-600 text-white font-medium"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </span>
                ))}

                {/* Next page button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    title={t("pagination.nextPage", "Next page")}
                >
                    ›
                </button>

                {/* Last page button */}
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-1 rounded-md text-xs ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    title={t("pagination.lastPage", "Last page")}
                >
                    »»
                </button>
            </div>
        </div>
    );
};

export default Pagination;