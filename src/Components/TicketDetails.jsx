/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import getUserRole from "../context/userType";
import { getTicketQueryHookByRole } from "./utils/ticketQuires";
import { getTicketStatusInfo } from "./utils/ticketSatus";
import LoadingSpinner from "../common/Loadingspinner";
import moment from "moment";
import ChatActions from "../modules/Chat/ChatActions";
import { useTranslation } from "react-i18next";
import { formatDate } from "./utils/date";

export default function TicketDetails({ ticketId: propTicketId }) {
  const { t } = useTranslation();
  const { ticketId: routeTicketId } = useParams();
  const ticketId = propTicketId || routeTicketId;
  const { user } = useUser();
  const navigate = useNavigate();

  const useTicketQuery = getTicketQueryHookByRole(getUserRole(user?.type));

  if (!useTicketQuery) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        {t("ticketDetails.unsupportedRole")}
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, error } = useTicketQuery(ticketId);

  if (isLoading) return <LoadingSpinner />;

  if (error || !data?.data) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        {error?.data?.message || t("ticketDetails.notFound")}
      </div>
    );
  }

  const ticket = data.data;
  const { label: statusLabel, className: statusClass } = getTicketStatusInfo(
    ticket.status,
    t,
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🎫 {t("ticketDetails.title")}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          {t("ticketDetails.back")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <DetailItem label={t("ticketDetails.ticketId")} value={ticket.id} />
        <DetailItem
          label={t("ticketDetails.ticketTitle")}
          value={ticket.title}
        />
        <DetailItem label={t("ticketDetails.status")}>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
          >
            {statusLabel}
          </span>
        </DetailItem>
        <DetailItem
          label={t("ticketDetails.createdAt")}
          value={formatDate(ticket.created_at)}
        />
        <DetailItem
          label={t("ticketDetails.section")}
          value={ticket.section?.name || t("ticketDetails.unknown")}
        />
        <DetailItem
          label={t("ticketDetails.service")}
          value={ticket.section.service?.name || t("ticketDetails.unknown")}
        />
        <DetailItem
          label={t("ticketDetails.user")}
          value={ticket.user?.name || t("ticketDetails.unknown")}
        />
        <DetailItem
          label={t("ticketDetails.manager")}
          value={ticket.manager?.user?.name || t("ticketDetails.notAssigned")}
        />
        <DetailItem
          label={t("ticketDetails.technician")}
          value={
            ticket.technician?.user?.name || t("ticketDetails.notAssigned")
          }
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {t("ticketDetails.description")}
        </h2>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-gray-700 leading-relaxed">
          {ticket.description || t("ticketDetails.noDescription")}
        </div>
      </div>
      <ChatActions currentUser={user} ticket={ticket} />
    </div>
  );
}

function DetailItem({ label, value, children }) {
  return (
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <div className="text-base font-semibold">
        {children || value || "N/A"}
      </div>
    </div>
  );
}
