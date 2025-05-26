/* eslint-disable react/prop-types */
import { FaSave, FaTimes } from "react-icons/fa";
import { useGetServicesQuery } from "../../../../redux/feature/selectMenu/select.apislice";

const EditManagerModal = ({ show, onClose, managerData, setManagerData, onSave }) => {
    const { data: servicesData } = useGetServicesQuery({
        only_unique: 1,
    });
    const services = servicesData?.data || [];
    if (!show || !managerData || !managerData.user) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["name", "email", "password", "password_confirmation"].includes(name)) {
            setManagerData({
                ...managerData,
                user: {
                    ...managerData.user,
                    [name]: value,
                },
            });
        } else {
            setManagerData({
                ...managerData,
                [name]: value,
            });
        }
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

                {/* Modal Header */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Manager</h2>

                <div className="mb-4">

                    <select
                        value={managerData.service_id || ""}
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
                {/* Manager Info */}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={managerData.user.name || ""}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={managerData.user.email || ""}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password (leave blank to keep current)"
                    value={managerData.user.password || ""}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={managerData.user.password_confirmation || ""}
                    onChange={handleChange}
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
                        onClick={onSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
                    >
                        <FaSave className="text-sm" />
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditManagerModal;
