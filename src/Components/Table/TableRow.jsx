/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
const TableRow = ({
    ticket,
    columns,
    onTicketClick,
    getTicketStatusInfo = undefined,
    actionsRenderer,
}) => {
    const { t } = useTranslation();
    const statusInfo = getTicketStatusInfo ? getTicketStatusInfo(ticket.status, t) : {};
    const label = statusInfo.label || ticket.status || "";
    const className = statusInfo.className || "";

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer">
            {columns.map((col) => (
                <td
                    key={col.key}
                    className="py-3 px-4"
                    onClick={col.clickable ? () => onTicketClick(ticket.id) : undefined}
                >
                    {col.render ? col.render(ticket, label, className) : ticket[col.key] || "—"}
                </td>
            ))}
            {actionsRenderer && (
                <td className="py-3 px-4 flex items-center space-x-3">
                    {actionsRenderer(ticket)}
                </td>
            )}
        </tr>
    );
};

export default TableRow;
