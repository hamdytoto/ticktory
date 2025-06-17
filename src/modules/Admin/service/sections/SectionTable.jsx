// SectionTable.jsx
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash, FaEdit, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import {
  useShowAllSectionsQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} from "../../../../redux/feature/admin/Services/Sections/service.section.apislice.js";

import { toast } from "react-toastify";
import EditSectionModal from "./EditSection.jsx";
import Pagination from "../../../../common/Pagnitation.jsx";
import ConfirmDialog from "../../../../common/ConfirmDialogu.jsx";
import AppTable from "../../../../Components/Table/AppTable.jsx";
import { useApiCallback } from "../../../../Components/utils/validation.js";

const SectionTable = ({ search, itemsPerPage }) => {
  const { t } = useTranslation();
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const { data, refetch } = useShowAllSectionsQuery(serviceId);
  const [deleteSection] = useDeleteSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const { handleApiCallback } = useApiCallback();
  const sectionsData = data?.data || [];
  const serviceName = data?.serviceName || "";
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSections = sectionsData.filter((section) =>
    section.name.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);

  const [editingSection, setEditingSection] = useState(null);
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
      await deleteSection({
        serviceId: serviceId,
        sectionId: selectedId,
      }).unwrap();
      toast.success(t("section.deleted_success"));
      refetch();
    } catch (err) {
      toast.error(t("section.delete_error"));
      console.error(err);
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setEditName(section.name);
  };

  const handleEditSubmit = async () => {
    if (!editName.trim()) return;
    await handleApiCallback(async () => {
      await updateSection({
        sectionId: editingSection.id,
        body: { name: editName },
        serviceId: serviceId,
      }).unwrap();
      toast.success(t("section.updated_success"));
      setEditingSection(null);
      refetch();
    }, "editsection");
  };

  const displayedSections = filteredSections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    {
      key: "id",
      header: t("section.id"),
      render: (row) => (
        <span className="text-gray-800 text-md font-medium">#{row.id}</span>
      ),
    },
    {
      key: "name",
      header: t("section.name"),
      render: (row) => (
        <span className="text-gray-800 text-md font-medium">{row.name}</span>
      ),
    },
    {
      key: "actions",
      header: t("section.actions"),
      render: (row) => (
        <div className="flex items-center space-x-2">{renderActions(row)}</div>
      ),
    },
  ];

  const renderActions = (section) => (
    <>
      <button
        onClick={() => handleDeleteClick(section.id)}
        className="text-red-500 hover:text-red-700"
        title={t("section.delete_tooltip")}
      >
        <FaTrash />
      </button>
      <button
        onClick={() => handleEdit(section)}
        className="text-gray-600 hover:text-black"
        title={t("section.edit_tooltip")}
      >
        <FaEdit />
      </button>
    </>
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      {/* Back Button and Service Info */}
      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft />
          <span>{t("common.back")}</span>
        </button>
        <div className="text-sm text-gray-600">
          {t("section.service_info", { serviceName })}
        </div>
      </div>

      <AppTable columns={columns} data={displayedSections} />

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          dataLength={sectionsData?.length}
        />
      </div>

      <EditSectionModal
        show={editingSection !== null}
        onClose={() => setEditingSection(null)}
        editName={editName}
        setEditName={setEditName}
        onSave={handleEditSubmit}
      />

      <ConfirmDialog
        show={showConfirm}
        message={t("section.confirm_delete")}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default SectionTable;
