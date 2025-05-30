/* eslint-disable react/prop-types */
import Pagination from "../../../common/Pagnitation.jsx";
import { getTicketStatusInfo } from "../../../Components/utils/ticketSatus.js";
import Table from "../../../Components/Table/Table.jsx";
import { useTranslation } from "react-i18next";

const TicketsTable = ({
  ticketsData,
  onTicketClick,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalRecords
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Columns config for the generic Table
  const columns = [
    {
      key: "title",
      label: t("table.columns.title"),
      clickable: true,
      render: (ticket) => (
        <>
          <p className="text-gray-800 text-md font-medium">
            {ticket.title.slice(0, 30)} ...
          </p>
          <p className="text-gray-500 text-sm">
            {ticket.user?.name || "—"} 👤
          </p>
        </>
      ),
    },
    {
      key: "description",
      label: t("table.columns.description"),
      render: (ticket) => `${ticket.description?.slice(0, 50)} ...`,
    },
    {
      key: "status",
      label: t("table.columns.status"),
      render: (ticket) => {
        const { label, className } = getTicketStatusInfo(ticket.status, t);
        return (
          <span className={`px-3 py-2 text-sm font-bold rounded-lg ${className}`}>
            {label}
          </span>
        );
      },
    },
    {
      key: "service",
      label: t("table.columns.service"),
      render: (ticket) => ticket.service?.name || "—",
    },
    {
      key: "manager",
      label: t("table.columns.manager"),
      render: (ticket) => ticket.manager?.user?.name || "—",
    },
    {
      key: "technician",
      label: t("table.columns.technician"),
      render: (ticket) => ticket.technician?.user?.name || "—",
    },
    {
      key: "createdAt",
      label: t("table.columns.createdAt"),
      render: (ticket) => new Date(ticket.created_at).toLocaleString(`${isArabic ? "ar-EG" : "en-US"}`, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    },
  ];

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      {/* Results Summary */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {ticketsData.length > 0 ? ((currentPage - 1) * itemsPerPage + 1) : 0} to{" "}
          {Math.min(currentPage * itemsPerPage, totalRecords)} of {totalRecords} tickets
        </div>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {ticketsData.length > 0 ? (
          <Table
            columns={columns}
            tickets={ticketsData}
            onTicketClick={onTicketClick}
            getTicketStatusInfo={getTicketStatusInfo}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📋</div>
            <div className="text-gray-600 text-lg font-medium">No tickets found</div>
            <div className="text-gray-500 text-sm">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          dataLength={totalRecords}
        />
      )}
    </div>
  );
};

export default TicketsTable;