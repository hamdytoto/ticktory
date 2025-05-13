/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
    useShowAllTechnicianQuery,
    useDeleteTechnicianMutation,
    useUpdateTechnicianMutation,
} from "../../../../redux/feature/Manager/technician/manager.tech.apiSlice.js";
import { toast } from "react-toastify";
import EditTechnicianModal from "./EditTechnician.jsx";
import Pagination from "../../../../common/Pagnitation.jsx";
import ConfirmDialog from "../../../../common/ConfirmDialogu.jsx";

const itemsPerPage = 7;

const TechnicianTable = ({ search }) => {
    const { data, refetch } = useShowAllTechnicianQuery();
    const [deleteTechnician] = useDeleteTechnicianMutation();
    const [updateTechnician] = useUpdateTechnicianMutation();
    const techniciansData = data?.data || [];
    const [currentPage, setCurrentPage] = useState(1);
    const filteredTechnicians = techniciansData.filter((tech) =>
        tech.user.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredTechnicians?.length / itemsPerPage);

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
            await deleteTechnician(selectedId).unwrap();
            toast.success("Technician deleted successfully");
            refetch();
        } catch (err) {
            toast.error("Failed to delete technician");
            console.error(err);
        } finally {
            setShowConfirm(false);
            setSelectedId(null);
        }
    };

    // Edit logic
    const [editingTechnician, setEditingTechnician] = useState(null);

    const handleEdit = (tech) => {
        setEditingTechnician({
            id: tech.id,
            name: tech.user.name,
            email: tech.user.email,
            password: tech.user.password, 
            password_confirmation: tech.user.password_confirmation, 
        });
    };

    const handleEditSubmit = async () => {
        try {
            await updateTechnician({
                id: editingTechnician.id,
                body: editingTechnician,
            }).unwrap();
            toast.success("Technician updated successfully");
            setEditingTechnician(null);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update technician");
            console.error(err);
        }
    };

    const displayedTechnicians = filteredTechnicians?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                        {displayedTechnicians?.map((tech) => (
                            <tr
                                key={tech.id}
                                className="border-b border-gray-200 hover:bg-gray-100 transition"
                            >
                                <td className="py-3 px-4">
                                    <img src={tech.user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="py-3 px-4 text-gray-800 text-md font-medium">{tech.user.name}</td>
                                <td className="py-3 px-4 text-gray-500 text-md">{tech.user.email}</td>
                                <td className="py-3 px-4 text-gray-500 text-md">{tech.user.phone}</td>
                                <td className="py-3 px-4 text-gray-500 text-md">{tech.service?.name}</td>
                                <td className="py-3 px-4 flex items-center space-x-3">
                                    <button
                                        onClick={() => handleDeleteClick(tech.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(tech)}
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
                dataLength={filteredTechnicians.length}
            />

            <EditTechnicianModal
                show={editingTechnician !== null}
                onClose={() => setEditingTechnician(null)}
                managerData={editingTechnician}
                setManagerData={setEditingTechnician}
                onSave={handleEditSubmit}
            />

            <ConfirmDialog
                show={showConfirm}
                message="Do you really want to delete this technician? It cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};

export default TechnicianTable;
