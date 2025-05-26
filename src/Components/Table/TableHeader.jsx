/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';

const TableHeader = ({ columns }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <tr
      className={`text-gray-600 ${
        isArabic ? 'text-right' : 'text-left'
      } text-lg md:text-md font-semibold border-b border-gray-300`}
    >
      {columns.map((col) => (
        <th key={col.key} className="py-3 px-4">
          {col.label}
        </th>
      ))}
    </tr>
  );
};
export default TableHeader;