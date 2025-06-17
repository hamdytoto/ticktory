/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSave, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useValidation } from "../../../../Components/utils/validation";
import InputField from "../../../../Components/Form/InputField";
import SelectComponent from "../../../../Components/Form/SelectComponent.jsx";
import { useGetServicesQuery, useGetSectionsQuery } from "../../../../redux/feature/selectMenu/select.apislice.js";

const EditTechnicianModal = ({ show, onClose, managerData, setManagerData, onSave }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    const errors = useValidation().getErrors("edittechnician");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // Add service and section queries
    const { data: servicesData } = useGetServicesQuery({
        only_associated_to_managers: 1,
    });
    const services = servicesData?.data || [];

    // Get all sections for all services
    const { data: sectionsData } = useGetSectionsQuery();
    const sections = sectionsData?.data || [];

    if (!show || !managerData) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setManagerData({
            ...managerData,
            [name]: value,
        });
    };

    const handleSectionChange = (e) => {
        const selectedSectionId = e.target.value;
        const selectedSection = sections.find(section => section.id == selectedSectionId);

        setManagerData({
            ...managerData,
            section_id: selectedSectionId,
            service_id: selectedSection?.service_id || '',
        });
    };

    // Group sections by service
    const groupedOptions = services.map(service => {
        const serviceSections = sections.filter(section => section.service_id == service.id);
        return {
            service,
            sections: serviceSections
        };
    });

    // Helper for icon position
    const iconPositionClass = isRTL ? "left-3 right-auto" : "right-3 left-auto";

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    onClick={onClose}
                    aria-label={t("technician.edit.close", "Close")}
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Header */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {t("technician.edit.title", "Edit Technician")}
                </h2>

                {/* Service-Section Dropdown */}
                <div className="mb-4">
                    <SelectComponent
                        options={groupedOptions}
                        value={managerData?.section_id || ''}
                        onChange={handleSectionChange}
                        placeholder={t("technician.edit.section", "Section")}
                        error={errors["section_id"]}
                        isGrouped={true}
                        groupDefinition={{
                            groupKey: "service",
                            itemsKey: "sections",
                            groupId: "id",
                            groupName: "name",
                        }}
                        definition={{
                            id: "id",
                            name: "name",
                        }}
                    />
                </div>

                <InputField
                    type="text"
                    name="name"
                    placeholder={t("technician.edit.name", "Name")}
                    value={managerData?.name || ""}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    error={errors["name"]}
                />

                <InputField
                    type="email"
                    name="email"
                    placeholder={t("technician.edit.email", "Email")}
                    value={managerData?.email || ""}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    error={errors["email"]}
                />

                <div className="relative mb-1">
                    <InputField
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={t("technician.edit.password", "Password (leave blank to keep current)")}
                        value={managerData?.password || ""}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        error={errors["password"]}
                    />
                    <button
                        type="button"
                        className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${iconPositionClass}`}
                        onClick={() => setShowPassword(prev => !prev)}
                        tabIndex={-1}
                        aria-label={showPassword ? t("technician.edit.hidePassword", "Hide password") : t("technician.edit.showPassword", "Show password")}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className="relative mb-6">
                    <InputField
                        type={showPasswordConfirm ? "text" : "password"}
                        name="password_confirmation"
                        placeholder={t("technician.edit.confirmPassword", "Confirm Password")}
                        value={managerData?.password_confirmation || ""}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        error={errors["password_confirmation"]}
                    />
                    <button
                        type="button"
                        className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${iconPositionClass}`}
                        onClick={() => setShowPasswordConfirm(prev => !prev)}
                        tabIndex={-1}
                        aria-label={showPasswordConfirm ? t("technician.edit.hidePassword", "Hide password") : t("technician.edit.showPassword", "Show password")}
                    >
                        {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition flex items-center gap-1"
                    >
                        <FaTimes className="text-sm" />
                        {t("technician.edit.cancel", "Cancel")}
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
                    >
                        <FaSave className="text-sm" />
                        {t("technician.edit.submit", "Save")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTechnicianModal;