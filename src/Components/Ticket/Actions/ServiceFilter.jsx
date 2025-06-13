/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";

const ServiceFilterDropdown = ({
    serviceId,
    services=[],
    onServiceChange,
    clearServiceFilter,
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 ">
            <label className="text-sm font-medium text-gray-700 min-w-max">
                {t("filters.service", "Service")}:
            </label>
            <div className="flex items-center gap-2">
                <select
                    value={serviceId || ""}
                    onChange={(e) => onServiceChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                >
                    <option value="">
                        {t("filters.allServices", "All Services")}
                    </option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
                {serviceId && (
                    <button
                        type="button"
                        onClick={clearServiceFilter}
                        className="p-2 text-gray-500 hover:text-red-500 transition"
                        title={t("filters.clearService", "Clear service filter")}
                    >
                        <FaTimes className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ServiceFilterDropdown;