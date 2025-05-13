import { useGetAdminStatisticsQuery } from "../../redux/feature/statistics/stat.apiSlice";
import DashboardLayout from "./DashboardLayout";
import { calcPercent } from "./helper";

const AdminDash = () => {
  const { data } = useGetAdminStatisticsQuery();
  const statsData = data?.data || {};
  console.log(statsData);

  const stats = [
    { label: "stats.allTickets", value: statsData.all_tickets, percentage: 100 },
    { label: "stats.openTickets", value: statsData.opened_tickets, percentage: calcPercent(statsData.opened_tickets, statsData.all_tickets) },
    { label: "stats.closedTickets", value: statsData.closed_tickets, percentage: calcPercent(statsData.closed_tickets, statsData.all_tickets) },
    { label: "stats.inProgressTickets", value: statsData.in_processing_tickets, percentage: calcPercent(statsData.in_processing_tickets, statsData.all_tickets) },
    { label: "stats.managersCount", value: statsData.managers_count, percentage: 100 },
    { label: "stats.servicesCount", value: statsData.services_count, percentage: 100 },
  ];


  return (
    <DashboardLayout
      stats={stats}
      annualTickets={statsData.annual_tickets_average}
      recentTickets={statsData.recent_tickets || []}
    />
  );
};

export default AdminDash;
