/* eslint-disable react/prop-types */
import { useGetServicesQuery } from "../../../../redux/feature/selectMenu/select.apislice.js";

const AddManagerModal = ({ show, onClose, managerData, setManagerData, onAdd }) => {
    const { data: servicesData } = useGetServicesQuery();
    const services = servicesData?.data || [];

    if (!show) return null;

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setManagerData({
            ...managerData,
            user: {
                ...managerData.user,
                [name]: value,
            },
        });
    };

    const handleServiceIdChange = (e) => {
        setManagerData({
            ...managerData,
            service_id: e.target.value,
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

                {/* Modal Title */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Manager</h2>

                {/* Service Selection Dropdown */}
                <div className="mb-4">
                    <select
                        value={managerData.service_id || ''}
                        onChange={handleServiceIdChange}
                        className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Service</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Manager Info Inputs */}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={managerData.user.name}
                    onChange={handleUserChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={managerData.user.email}
                    onChange={handleUserChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={managerData.user.password}
                    onChange={handleUserChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={managerData.user.password_confirmation}
                    onChange={handleUserChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddManagerModal;
