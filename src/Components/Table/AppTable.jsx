/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

const AppTable = ({
    columns = [],
    data = [],
    renderActions = () => null,
    onRowClick = null,
}) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className={`text-gray-600 ${isArabic ? 'text-right' : 'text-left'
                        } text-lg md:text-md font-semibold border-b border-gray-300`}>
                        {columns.map((col) => (
                            <th key={col.key} className="py-3 px-4">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b border-gray-200 hover:bg-gray-100 transition"
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="py-3 px-4"
                                    onClick={() => col.clickable && onRowClick?.(row.id)}
                                >
                                    {col.render ? col.render(row) : row[col.key] || "—"}
                                </td>
                            ))}
                            {renderActions && (
                                <td className="py-3 px-4 mt-3 flex items-center space-x-3">
                                    {renderActions(row)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppTable;