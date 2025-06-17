/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { useGetServicesQuery, useGetSectionsQuery } from "../../../../redux/feature/selectMenu/select.apislice.js";

const AddTicketModal = ({ show, onClose, ticketData, setTicketData, onAdd }) => {
    const { t } = useTranslation();
    const { data: servicesData } = useGetServicesQuery({
        only_associated_to_managers: 1,
    });
    const services = servicesData?.data || [];
    
    // Get all sections for all services
    const { data: sectionsData } = useGetSectionsQuery();
    const sections = sectionsData?.data || [];
    
    if (!show) return null;

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

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    onClick={onClose}
                    aria-label={t("addTicket.close", "Close")}
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

                <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t("addTicket.title", "Add New Ticket")}</h2>

                {/* Title Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        placeholder={t("addTicket.ticketTitle", "Title")}
                        value={ticketData.title}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Dropdown for Service-Section Selection */}
                <div className="mb-4">
                    <select
                        value={ticketData.section_id || ''}
                        onChange={handleSectionChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">{t("addTicket.selectSection", "Select a Section")}</option>
                        {groupedOptions.map(({ service, sections: serviceSections }) => (
                            <optgroup key={service.id} label={service.name}>
                                {serviceSections.map(section => (
                                    <option key={section.id} value={section.id}>
                                        {section.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* Description Textarea */}
                <div className="mb-6">
                    <textarea
                        name="description"
                        placeholder={t("addTicket.description", "Description")}
                        value={ticketData.description}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        {t("addTicket.cancel", "Cancel")}
                    </button>
                    <button
                        onClick={onAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {t("addTicket.submit", "Submit")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTicketModal;