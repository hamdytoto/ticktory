/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
    useShowAllServicesApiQuery,
    useDeleteServiceApiMutation,
    useUpdateServiceApiMutation,
} from "../../../redux/feature/admin/Services/admin.service.apislice.js";
import { toast } from "react-toastify";
import EditServiceModal from "./EditService.jsx";
import Pagination from "../../../common/Pagnitation.jsx";
import ConfirmDialog from "../../../common/ConfirmDialogu.jsx";


const ServicesTable = ({ search , itemsPerPage}) => {
    const { data, refetch } = useShowAllServicesApiQuery();
    const [deleteService] = useDeleteServiceApiMutation();
    const [updateService] = useUpdateServiceApiMutation();
    const servicesData = data?.data || [];
    const [currentPage, setCurrentPage] = useState(1);

    const filteredServices = servicesData.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase()))
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

    const [editingService, setEditingService] = useState(null);
    const [editName, setEditName] = useState("");

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };
    const confirmDelete = async () => {
        try {
            await deleteService(selectedId).unwrap();
            toast.success("Service deleted successfully");
            refetch();
        } catch (err) {
            toast.error("Failed to delete service");
            console.error(err);
        } finally {
            setShowConfirm(false);
            setSelectedId(null);
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setEditName(service.name);
    };

    const handleEditSubmit = async () => {
        if (!editName.trim()) return;
        try {
            await updateService({
                id: editingService.id,
                body: { name: editName },
            }).unwrap();
            toast.success("Service updated successfully");
            setEditingService(null);
            refetch();
        } catch (err) {
            toast.error("Failed to update service");
            console.error(err);
        }
    };

    const displayedServices = filteredServices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-left text-lg md:text-md font-semibold border-b border-gray-300">
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3 px-4">NAME</th>
                            <th className="py-3 px-4">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedServices.map((service) => (
                            <tr
                                key={service.id}
                                className="border-b border-gray-200 hover:bg-gray-100 transition"
                            >
                                <td className="py-3 px-4 text-gray-800 text-md font-medium">
                                    #{service.id}
                                </td>
                                <td className="py-3 px-4 text-gray-800 text-md font-medium">
                                    {service.name}
                                </td>
                                <td className="py-3 px-4 flex items-center space-x-3">
                                    <button
                                        onClick={() => handleDeleteClick(service.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="text-gray-600 hover:text-black"
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                dataLength={servicesData?.length}
            />
            <EditServiceModal
                show={editingService !== null}
                onClose={() => setEditingService(null)}
                editName={editName}
                setEditName={setEditName}
                onSave={handleEditSubmit}
            />

            <ConfirmDialog
                show={showConfirm}
                message="Do you really want to delete this service? it cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};

export default ServicesTable;
