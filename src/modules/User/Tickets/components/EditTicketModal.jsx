/* eslint-disable react/prop-types */
import { FaTimes, FaSave } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useValidation } from "../../../../Components/utils/validation";
import InputField from "../../../../Components/Form/InputField";
import SelectComponent from "../../../../Components/Form/SelectComponent.jsx";
import { useGetServicesQuery, useGetSectionsQuery } from "../../../../redux/feature/selectMenu/select.apislice.js";

const EditTicketModal = ({ show, onClose, ticketData, setTicketData, onUpdate }) => {
    const { t} = useTranslation();
    const errors = useValidation().getErrors("editticket");

    // Add service and section queries
    const { data: servicesData } = useGetServicesQuery({
        only_associated_to_managers: 1,
    });
    const services = servicesData?.data || [];

    // Get all sections for all services
    const { data: sectionsData } = useGetSectionsQuery();
    const sections = sectionsData?.data || [];

    if (!show || !ticketData) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData({
            ...ticketData,
            [name]: value,
        });
    };

    const handleSectionChange = (e) => {
        const selectedSectionId = e.target.value;
        const selectedSection = sections.find(section => section.id == selectedSectionId);

        setTicketData({
            ...ticketData,
            section_id: selectedSectionId,
            service_id: selectedSection.section.service_id || '',
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

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    onClick={onClose}
                    aria-label={t("editTicket.close", "Close")}
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

                {/* Modal Content */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {t("editTicket.title", "Edit Ticket")}
                </h2>

                {/* Service-Section Dropdown */}
                <div className="mb-4">
                    <SelectComponent
                        options={groupedOptions}
                        value={ticketData?.section.id || ''}
                        onChange={handleSectionChange}
                        placeholder={t("editTicket.selectSection", "Select a Section")}
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

                {/* Title Input */}
                <InputField
                    type="text"
                    name="title"
                    placeholder={t("editTicket.ticketTitle", "Title")}
                    value={ticketData?.title || ""}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    error={errors["title"]}
                />

                {/* Description Textarea */}
                <div className="mb-6">
                    <textarea
                        name="description"
                        placeholder={t("editTicket.description", "Description")}
                        value={ticketData?.description || ""}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                    {errors["description"] && (
                        <span className="text-red-500 text-sm mt-1 block">
                            {errors["description"]}
                        </span>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition flex items-center gap-1"
                    >
                        <FaTimes className="text-sm" />
                        {t("editTicket.cancel", "Cancel")}
                    </button>
                    <button
                        onClick={onUpdate}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-1"
                    >
                        <FaSave className="text-sm" />
                        {t("editTicket.saveChanges", "Save Changes")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTicketModal;