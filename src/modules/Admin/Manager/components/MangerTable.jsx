/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
    useShowAllManagersApiQuery,
    useDeleteManagerApiMutation,
    useUpdateManagerApiMutation,
} from "../../../../redux/feature/admin/Managers/admin.manager.apislice.js";
import { toast } from "react-toastify";
import EditManagerModal from "./EditManger.jsx";
import Pagination from "../../../../common/Pagnitation.jsx";
import ConfirmDialog from "../../../../common/ConfirmDialogu.jsx";

const ManagerTable = ({ search, itemsPerPage, currentPage, setCurrentPage }) => {
    // Send page and search parameters to the API
    const { data, refetch } = useShowAllManagersApiQuery({
        per_page: itemsPerPage,
        page: currentPage,
        handle: search || '', // Send search parameter to backend
    });
    
    const [deleteManager] = useDeleteManagerApiMutation();
    const [updateManager] = useUpdateManagerApiMutation();
    
    // Get data from API response
    const managersData = data?.data || [];
    const meta = data?.meta || {};
    
    // Use pagination info from API response
    const totalPages = meta.last_page || 1;
    const totalItems = meta.total || 0;
    
    console.log(managersData);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Delete logic
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteManager(selectedId).unwrap();
            toast.success("Manager deleted successfully");
            refetch();
        } catch (err) {
            toast.error("Failed to delete manager");
            console.error(err);
        } finally {
            setShowConfirm(false);
            setSelectedId(null);
        }
    };

    // Edit logic
    const [editingManager, setEditingManager] = useState(null);

    const handleEdit = (manager) => {
        setEditingManager({
            id: manager.id,
            service_id: manager.service_id,
            user: {
                id: manager.user.id,
                name: manager.user.name,
                email: manager.user.email,
                password: manager.user.password, // Leave blank for optional update
                password_confirmation: manager.user.password, // Leave blank for optional update
            },
        });
    };

    const handleEditSubmit = async () => {
        try {
            await updateManager({
                id: editingManager.id,
                body: editingManager,
            }).unwrap();
            toast.success("Manager updated successfully");
            setEditingManager(null);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update manager");
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-left text-lg md:text-md font-semibold border-b border-gray-300">
                            <th className="py-3 px-4">AVATAR</th>
                            <th className="py-3 px-4">NAME</th>
                            <th className="py-3 px-4">EMAIL</th>
                            <th className="py-3 px-4">PHONE</th>
                            <th className="py-3 px-4">DEPARTMENT</th>
                            <th className="py-3 px-4">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managersData?.map((manager) => (
                            <tr
                                key={manager.id}
                                className="border-b border-gray-200 hover:bg-gray-100 transition"
                            >
                                <td className="py-3 px-4">
                                    <img src={manager.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="py-3 px-4 text-gray-800 text-md font-medium">{manager.user.name}</td>
                                <td className="py-3 px-4 text-gray-500 text-md">{manager.user.email}</td>
                                <td className="py-3 px-4 text-gray-500 text-md">{manager.user.phone}</td>
                                <td className="py-3 px-4 text-gray-500 text-md">{manager.service?.name}</td>
                                <td className="py-3 px-4 flex items-center space-x-3">
                                    <button
                                        onClick={() => handleDeleteClick(manager.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(manager)}
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
                dataLength={totalItems} // Use total from API instead of filtered length
            />

            <EditManagerModal
                show={editingManager !== null}
                onClose={() => setEditingManager(null)}
                managerData={editingManager}
                setManagerData={setEditingManager}
                onSave={handleEditSubmit}
            />

            <ConfirmDialog
                show={showConfirm}
                message="Do you really want to delete this manager? It cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};

export default ManagerTable;