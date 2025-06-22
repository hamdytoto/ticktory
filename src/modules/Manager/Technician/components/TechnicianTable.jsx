/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
  useShowAllTechnicianQuery,
  useDeleteTechnicianMutation,
  useUpdateTechnicianMutation,
} from "../../../../redux/feature/Manager/technician/manager.tech.apiSlice.js";
import { useApiCallback } from "../../../../Components/utils/validation.js";
import { toast } from "react-toastify";
import EditTechnicianModal from "./EditTechnician.jsx";
import Pagination from "../../../../common/Pagnitation.jsx";
import ConfirmDialog from "../../../../common/ConfirmDialogu.jsx";
import AppTable from "../../../../Components/Table/AppTable.jsx";

const TechnicianTable = ({ search, itemsPerPage }) => {
  const { t } = useTranslation();
  const { data, refetch } = useShowAllTechnicianQuery();
  const [deleteTechnician] = useDeleteTechnicianMutation();
  const [updateTechnician] = useUpdateTechnicianMutation();
  const { handleApiCallback } = useApiCallback();
  const techniciansData = data?.data || [];
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTechnicians = techniciansData.filter((tech) =>
    tech.user.name.toLowerCase().includes(search.toLowerCase()),
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
      toast.success(
        t("technician.toast.deleteSuccess", "Technician deleted successfully"),
      );
      refetch();
    } catch (err) {
      toast.error(
        t("technician.toast.deleteFail", "Failed to delete technician"),
      );
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
      section_id: tech.section.id,
      password_confirmation: tech.user.password,
      ...((tech.user.password_confirmation || tech.user.password) && {
        password_confirmation: tech.user.password_confirmation,
        password: tech.user.password,
      }),
    });
  };

  const handleEditSubmit = async () => {
    handleApiCallback(async () => {
      await updateTechnician({
        id: editingTechnician.id,
        body: editingTechnician,
      }).unwrap();
      toast.success(
        t("technician.toast.updateSuccess", "Technician updated successfully"),
      );
      setEditingTechnician(null);
      refetch();
    }, "editTechnician");
  };

  const displayedTechnicians = filteredTechnicians?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Define columns for AppTable
  const columns = [
    {
      key: "avatar",
      header: t("technician.columns.avatar", "AVATAR"),
      render: (row) => (
        <img
          src={row.user.avatar}
          alt={t("technician.avatarAlt", "Avatar")}
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
    {
      key: "name",
      header: t("technician.columns.name", "NAME"),
      render: (row) => (
        <span className="text-gray-800 text-md font-medium">
          {row.user.name}
        </span>
      ),
    },
    {
      key: "service",
      header: t("table.columns.service"),
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.section?.name || "—"}</span>
          {row.section?.service?.name && (
            <span className="text-sm text-gray-500">
              ({row.section.service.name})
            </span>
          )}
        </div>
      ),
    },
    {
      key: "email",
      header: t("technician.columns.email", "EMAIL"),
      render: (row) => (
        <span className="text-gray-500 text-md">{row.user.email}</span>
      ),
    },
    {
      key: "phone",
      header: t("technician.columns.phone", "PHONE"),
      render: (row) => (
        <span className="text-gray-500 text-md">{row.user.phone || "—"}</span>
      ),
    },
    {
      key: "actions",
      header: t("technician.columns.actions", "ACTIONS"),
      render: (row) => (
        <div className="flex items-center space-x-2">{renderActions(row)}</div>
      ),
    },
  ];

  // Define actions for AppTable
  const renderActions = (tech) => (
    <>
      <button
        onClick={() => handleDeleteClick(tech.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
        title={t("technician.actions.delete", "Delete technician")}
      >
        <FaTrash />
      </button>
      <button
        onClick={() => handleEdit(tech)}
        className="text-gray-600 hover:text-black transition-colors"
        title={t("technician.actions.edit", "Edit technician")}
      >
        <FaEdit />
      </button>
    </>
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      <AppTable columns={columns} data={displayedTechnicians} />

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          dataLength={filteredTechnicians.length}
        />
      </div>

      <EditTechnicianModal
        show={editingTechnician !== null}
        onClose={() => setEditingTechnician(null)}
        managerData={editingTechnician}
        setManagerData={setEditingTechnician}
        onSave={handleEditSubmit}
      />

      <ConfirmDialog
        show={showConfirm}
        message={t(
          "technician.confirmDelete",
          "Do you really want to delete this technician? It cannot be undone.",
        )}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default TechnicianTable;

