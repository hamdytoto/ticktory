// Updated ServicesTable.jsx (Add manage sections button)
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash, FaEdit, FaSitemap } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  useShowAllServicesApiQuery,
  useDeleteServiceApiMutation,
  useUpdateServiceApiMutation,
} from "../../../redux/feature/admin/Services/admin.service.apislice.js";

import { toast } from "react-toastify";
import EditServiceModal from "./EditService.jsx";
import Pagination from "../../../common/Pagnitation.jsx";
import ConfirmDialog from "../../../common/ConfirmDialogu.jsx";
import AppTable from "../../../Components/Table/AppTable.jsx";
import { useApiCallback } from "../../../Components/utils/validation.js";

const ServicesTable = ({ search, itemsPerPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, refetch } = useShowAllServicesApiQuery();
  const [deleteService] = useDeleteServiceApiMutation();
  const [updateService] = useUpdateServiceApiMutation();
  const servicesData = data?.data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const { handleApiCallback } = useApiCallback();
  const filteredServices = servicesData.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase()),
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
      toast.success(t("service.deleted_success"));
      refetch();
    } catch (err) {
      toast.error(t("service.delete_error"));
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

    handleApiCallback(async () => {
      await updateService({
        id: editingService.id,
        body: { name: editName },
      }).unwrap();
      toast.success(t("service.updated_success"));
      setEditingService(null);
      refetch();
    }, "editservice");
  };

  const handleManageSections = (serviceId) => {
    navigate(`${serviceId}/sections`);
  };

  const displayedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    {
      key: "id",
      header: t("service.id"),
      render: (row) => (
        <span className="text-gray-800 text-md font-medium">#{row.id}</span>
      ),
    },
    {
      key: "name",
      header: t("service.name"),
      render: (row) => (
        <span className="text-gray-800 text-md font-medium">{row.name}</span>
      ),
    },
    {
      key: "actions",
      header: t("service.actions"),
      render: (row) => (
        <div className="flex items-center space-x-2">{renderActions(row)}</div>
      ),
    },
  ];

  const renderActions = (service) => (
    <>
      <button
        onClick={() => handleDeleteClick(service.id)}
        className="text-red-500 hover:text-red-700"
        title={t("service.delete_tooltip")}
      >
        <FaTrash />
      </button>
      <button
        onClick={() => handleEdit(service)}
        className="text-gray-600 hover:text-black"
        title={t("service.edit_tooltip")}
      >
        <FaEdit />
      </button>
      <button
        onClick={() => handleManageSections(service.id)}
        className="text-blue-600 hover:text-blue-800"
        title={t("service.sections_tooltip")}
      >
        <FaSitemap />
      </button>
    </>
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      <AppTable columns={columns} data={displayedServices} />
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
        message={t("service.confirm_delete")}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default ServicesTable;

