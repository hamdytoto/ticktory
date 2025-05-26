
export const getTicketStatusInfo = (status,t =(key) => key) => {
	switch (status) {
    case 0:
      return {
        label: t("status.pending"),
        className: "bg-yellow-100 text-yellow-800",
      };
    case 1:
      return {
        label: t("status.in_progress"),
        className: "bg-blue-100 text-blue-800",
      };
    case 2:
      return {
        label: t("status.resolved"),
        className: "bg-green-100 text-green-800",
      };
    case 3:
      return {
        label: t("status.closed"),
        className: "bg-gray-200 text-gray-800",
      };
    default:
      return {
        label: t("status.unknown"),
        className: "bg-red-100 text-red-800",
      };
  }
};
