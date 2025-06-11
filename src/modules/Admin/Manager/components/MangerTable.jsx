/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
    useShowAllManagersApiQuery,
    useDeleteManagerApiMutation,
    useUpdateManagerApiMutation,
} from "../../../../redux/feature/admin/Managers/admin.manager.apislice.js";
import { toast } from "react-toastify";
import EditManagerModal from "./EditManger.jsx";
import Pagination from "../../../../common/Pagnitation.jsx";
import ConfirmDialog from "../../../../common/ConfirmDialogu.jsx";
import AppTable from "../../../../Components/Table/AppTable.jsx"; // Adjust path as needed

const ManagerTable = ({ search, itemsPerPage, currentPage, setCurrentPage }) => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    // Send page and search parameters to the API
    const { data, refetch } = useShowAllManagersApiQuery({
        per_page: itemsPerPage,
        page: currentPage,
        handle: search || '',
    });

    const [deleteManager] = useDeleteManagerApiMutation();
    const [updateManager] = useUpdateManagerApiMutation();

    // Get data from API response
    const managersData = data?.data || [];
    const meta = data?.meta || {};

    // Use pagination info from API response
    const totalPages = meta.last_page || 1;
    const totalItems = meta.total || 0;

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
            toast.success(t("managerTable.deleteSuccess", "Manager deleted successfully"));
            refetch();
        } catch (err) {
            toast.error(t("managerTable.deleteFail", "Failed to delete manager"));
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
            automatic_assignment: manager.automatic_assignment,
            user: {
                id: manager.user.id,
                name: manager.user.name,
                email: manager.user.email,
                password: manager.user.password,
                password_confirmation: manager.user.password,
            },
        });
    };

    const handleEditSubmit = async () => {
        try {
            await updateManager({
                id: editingManager.id,
                body: editingManager,
            }).unwrap();
            toast.success(t("managerTable.updateSuccess", "Manager updated successfully"));
            setEditingManager(null);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || t("managerTable.updateFail", "Failed to update manager"));
            console.error(err);
        }
    };

    // Define columns for AppTable
    const columns = [
        // {
        //     key: "avatar",
        //     header: t("managerTable.avatar", "Avatar"),
        //     render: (row) => (
        //         <img 
        //             src={row.avatar} 
        //             alt={t("managerTable.avatarAlt", "Avatar")} 
        //             className="w-10 h-10 rounded-full object-cover"
        //         />
        //     ),
        // },
        {
            key: "name",
            header: t("managerTable.name", "Name"),
            render: (row) => (
                <span className="text-gray-800 text-md font-medium">
                    {row.user.name}
                </span>
            ),
        },
        {
            key: "email",
            header: t("managerTable.email", "Email"),
            render: (row) => (
                <span className="text-gray-500 text-md">
                    {row.user.email}
                </span>
            ),
        },
        // {
        //     key: "phone",
        //     header: t("managerTable.phone", "Phone"),
        //     render: (row) => (
        //         <span className="text-gray-500 text-md">
        //             {row.user.phone||"__"}
        //         </span>
        //     ),
        // },
        {
            key: "department",
            header: t("managerTable.department", "Department"),
            render: (row) => (
                <span className="text-gray-500 text-md">
                    {row.service?.name}
                </span>
            ),
        },
        {
            key:"automatic_assignment",
            header: t("managerTable.automaticAssignment", "Auto Assignment"),
            render: (row) => (
                <span className={`font-medium ${row.automatic_assignment ? 'text-green-900' : 'text-red-900'}`}>
                    {row.automatic_assignment ? t("managerTable.yes", "Yes") : t("managerTable.no", "No")}
                </span>
            )
        },
        {
            key: "actions",
            header: t("managerTable.actions", "Actions"),
            render: (row) => renderActions(row),
        },
    ];

    // Define actions for AppTable
    const renderActions = (manager) => (
        <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            <button
                onClick={() => handleDeleteClick(manager.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label={t("managerTable.delete", "Delete")}
                title={t("managerTable.delete", "Delete")}
            >
                <FaTrash />
            </button>
            <button
                onClick={() => handleEdit(manager)}
                className="text-gray-600 hover:text-black transition-colors"
                aria-label={t("managerTable.edit", "Edit")}
                title={t("managerTable.edit", "Edit")}
            >
                <FaEdit />
            </button>
        </div>
    );

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <div className={`${isArabic ? 'rtl' : 'ltr'}`}>
                <AppTable
                    columns={columns}
                    data={managersData}
                    // renderActions={renderActions}
                />
            </div>

            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    dataLength={totalItems}
                />
            </div>

            <EditManagerModal
                show={editingManager !== null}
                onClose={() => setEditingManager(null)}
                managerData={editingManager}
                setManagerData={setEditingManager}
                onSave={handleEditSubmit}
            />

            <ConfirmDialog
                show={showConfirm}
                message={t("managerTable.confirmDelete", "Do you really want to delete this manager? It cannot be undone.")}
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};

export default ManagerTable;