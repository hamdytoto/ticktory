/* eslint-disable react/prop-types */
import { FaTimes, FaPlus } from "react-icons/fa";

const AddTechnicianModal = ({ show, onClose, technicianData, setTechnicianData, onAdd }) => {
    if (!show) return null;

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setTechnicianData({
            ...technicianData,
            [name]: value,
        });
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    onClick={onClose}
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
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Technician</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={technicianData?.name || ""}
                    onChange={handleUserChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={technicianData?.email || ""}
                    onChange={handleUserChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={technicianData?.password || ""}
                    onChange={handleUserChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={technicianData?.password_confirmation || ""}
                    onChange={handleUserChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition flex items-center gap-1"
                    >
                        <FaTimes className="text-sm" />
                        Cancel
                    </button>
                    <button
                        onClick={onAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
                    >
                        <FaPlus className="text-sm" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTechnicianModal;
