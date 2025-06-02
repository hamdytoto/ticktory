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
import AppTable from "../../../Components/Table/AppTable.jsx"; // Adjust path as needed

const ServicesTable = ({ search, itemsPerPage }) => {
    const { data, refetch } = useShowAllServicesApiQuery();
    const [deleteService] = useDeleteServiceApiMutation();
    const [updateService] = useUpdateServiceApiMutation();
    const servicesData = data?.data || [];
    const [currentPage, setCurrentPage] = useState(1);

    const filteredServices = servicesData.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );
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

    // Define columns for AppTable
    const columns = [
        {
            key: "id",
            header: "Id",
            render: (row) => (
                <span className="text-gray-800 text-md font-medium">
                    #{row.id}
                </span>
            ),
        },
        {
            key: "name",
            header: "Name",
            render: (row) => (
                <span className="text-gray-800 text-md font-medium">
                    {row.name}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Actions",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    {renderActions(row)}
                </div>
            ),
        }
    ];

    // Define actions for AppTable
    const renderActions = (service) => (
        <>
            <button
                onClick={() => handleDeleteClick(service.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete service"
            >
                <FaTrash />
            </button>
            <button
                onClick={() => handleEdit(service)}
                className="text-gray-600 hover:text-black"
                title="Edit service"
            >
                <FaEdit />
            </button>
        </>
    );

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <AppTable
                columns={columns}
                data={displayedServices}
            />
            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    dataLength={servicesData?.length}
                />
            </div>

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