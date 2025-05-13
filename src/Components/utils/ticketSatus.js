// utils/ticketStatus.js
export const getTicketStatusInfo = (status) => {
	switch (status) {
		case 0:
			return {
				label: "Pending",
				className: "bg-yellow-100 text-yellow-800",
			};
		case 1:
			return {
				label: "In Progress",
				className: "bg-blue-100 text-blue-800",
			};
		case 2:
			return {
				label: "Resolved",
				className: "bg-green-100 text-green-800",
			};
		case 3:
			return {
				label: "Closed",
				className: "bg-gray-200 text-gray-800",
			};
		default:
			return {
				label: "Unknown",
				className: "bg-red-100 text-red-800",
			};
	}
};
