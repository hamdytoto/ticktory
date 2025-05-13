/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useShowAllTechnicianQuery } from "../../../../redux/feature/Manager/technician/manager.tech.apiSlice.js";

const TechnicianAssignModal = ({ isOpen, onClose, onSubmit, ticketId }) => {
    const [selectedTechnician, setSelectedTechnician] = useState("");

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
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (selectedTechnician) {
            onSubmit(ticketId, selectedTechnician);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Assign Technician</h2>

                {isLoading ? (
                    <p className="text-center text-gray-600">Loading technicians...</p>
                ) : isError ? (
                    <p className="text-center text-red-500">Failed to load technicians</p>
                ) : (
                    <select
                        className="w-full border px-3 py-2 rounded mb-4"
                        value={selectedTechnician}
                        onChange={(e) => setSelectedTechnician(e.target.value)}
                    >
                        <option value="">Select Technician</option>
                        {technicians.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                                {tech.user.name}
                            </option>
                        ))}
                    </select>
                )}

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={!selectedTechnician}
                    >
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TechnicianAssignModal;
