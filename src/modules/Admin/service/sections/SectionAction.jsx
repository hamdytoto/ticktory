// SectionActions.jsx
/* eslint-disable react/prop-types */
import { FaPlus, FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
// import { useParams } from "react-router-dom";

const SectionActions = ({
    search, setSearch,
    itemsPerPage, setItemsPerPage,
    setShowModal
}) => {
    const { t } = useTranslation();
    // const { serviceId } = useParams();

    return (
        <>
            <h1 className="text-4xl font-bold text-gray-800">
                {t("section.header")}
            </h1>
            <div className="p-0 mb-6 mt-6 flex flex-wrap items-center justify-between gap-4">
                {/* Search Box */}
                <div className="flex items-center rounded-xl bg-gray-50 shadow-md overflow-hidden flex-1 max-w-md p-3">
                    <div className="pl-1 pr-2 text-gray-400 flex-shrink-0">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        placeholder={t("section.search_placeholder")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 py-2 px-2 outline-none text-sm min-w-0 bg-transparent"
                    />
                </div>
                {/* Dropdown & Button */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
                    <button
                        className="w-full sm:w-auto px-4 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        onClick={() => setShowModal(true)}
                    >
                        <FaPlus className="w-4 h-4" /> {t("section.new")}
                    </button>
                    <select
                        className="w-full sm:w-28 px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-gray-400 transition-colors"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        {[5, 7, 10, 25, 50].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

export default SectionActions;