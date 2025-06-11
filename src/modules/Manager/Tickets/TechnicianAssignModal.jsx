/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes, FaUserCog } from "react-icons/fa";
import { useShowAllTechnicianQuery } from "../../../redux/feature/Manager/technician/manager.tech.apiSlice.js";

const TechnicianAssignModal = ({ isOpen, onClose, onSubmit, ticketId }) => {
    const { t } = useTranslation();
    const [selectedTechnician, setSelectedTechnician] = useState("");
    const [maxMinutes, setMaxMinutes] = useState(60); // Add state for maximum minutes

    // Fetch technicians from API (inside modal)
    const { data, isLoading, isError } = useShowAllTechnicianQuery(undefined, {
        skip: !isOpen, // Only fetch when modal is open
    });

    // Default to an empty array if technicians is not an array
    const technicians = data?.data;

    // Reset selection when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setSelectedTechnician("");
            setMaxMinutes(60); // Reset to default value
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e?.preventDefault(); // Add this to prevent form submission if called from form
        if (selectedTechnician) {
            // Make sure all parameters are explicitly passed
            const payload = {
                ticketId,
                technicianId: selectedTechnician,
                maximum_minutes: parseInt(maxMinutes) // Ensure it's a number
            };
            onSubmit(payload.ticketId, payload.technicianId, payload.maximum_minutes);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                    <FaTimes />
                </button>

                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FaUserCog className="text-blue-600" />
                    {t('tickets.assign.title')}
                </h2>

                {isLoading ? (
                    <p className="text-center text-gray-600">{t('tickets.assign.loading')}</p>
                ) : isError ? (
                    <p className="text-center text-red-500">{t('tickets.assign.error')}</p>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('tickets.assign.selectTechnician')}
                            </label>
                            <select
                                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                value={selectedTechnician}
                                onChange={(e) => setSelectedTechnician(e.target.value)}
                            >
                                <option value="">{t('tickets.assign.selectTechnician')}</option>
                                {technicians.map((tech) => (
                                    <option key={tech.id} value={tech.id}>
                                        {tech.user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('tickets.assign.maxMinutes')}
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={maxMinutes}
                                onChange={(e) => setMaxMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder={t('tickets.assign.enterMaxMinutes')}
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={!selectedTechnician}
                    >
                        {t('tickets.assign.button')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TechnicianAssignModal;
