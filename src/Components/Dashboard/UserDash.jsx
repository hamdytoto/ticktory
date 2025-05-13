import { useGetUserStatisticsQuery } from "../../redux/feature/statistics/stat.apiSlice";
import DashboardLayout from "./DashboardLayout";
import { calcPercent } from "./helper";

const UserDash = () => {
  const { data } = useGetUserStatisticsQuery();
  const statistics = data?.data || {};
  console.log(statistics);

  const stats = [
    { label: "stats.allTickets", value: statistics.all_tickets, percentage: 100 },
    { label: "stats.openTickets", value: statistics.opened_tickets, percentage: calcPercent(statistics.opened_tickets, statistics.all_tickets) },
    { label: "stats.closedTickets", value: statistics.closed_tickets, percentage: calcPercent(statistics.closed_tickets, statistics.all_tickets) },
    { label: "stats.inProgressTickets", value: statistics.in_processing_tickets, percentage: calcPercent(statistics.in_processing_tickets, statistics.all_tickets) },
  ];

  return (
    <DashboardLayout
      stats={stats}
      annualTickets={statistics.annual_tickets_average}
      recentTickets={statistics.recent_tickets || []}
    />
  );
};

export default UserDash;
