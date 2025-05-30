/* eslint-disable react/prop-types */

const ItemsPerPageSelector = ({ itemsPerPage, onItemsPerPageChange, options }) => (
  <div className="flex items-center justify-center sm:justify-start gap-2 flex-shrink-0">
    <label className="text-sm text-gray-600 hidden sm:inline">Show:</label>
    <select
      value={itemsPerPage}
      onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <span className="text-sm text-gray-600 hidden sm:inline">per page</span>
  </div>
);

export default ItemsPerPageSelector;
