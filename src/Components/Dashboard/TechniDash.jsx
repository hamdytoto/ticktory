import { useGetTechnicianStatisticsQuery } from "../../redux/feature/statistics/stat.apiSlice";
import DashboardLayout from "./DashboardLayout";
import { calcPercent } from "./helper";
import {useTranslation} from "react-i18next";

const TechniDash = () => {
  const { data } = useGetTechnicianStatisticsQuery();
  const statsData = data?.data || {};
  const { t } = useTranslation();
  const title = t("menu.dashboard");

  const stats = [
    { label: "stats.allTickets", value: statsData.all_tickets, percentage: 100 },
    { label: "stats.closedTickets", value: statsData.closed_tickets, percentage: calcPercent(statsData.closed_tickets, statsData.all_tickets) },
    { label: "stats.inProgressTickets", value: statsData.in_processing_tickets, percentage: calcPercent(statsData.in_processing_tickets, statsData.all_tickets) },
  ];

  return (
    <DashboardLayout
      stats={stats}
      title={title}
      annualTickets={statsData.annual_tickets_average}
      recentTickets={statsData.recent_tickets|| []}
    />
  );
};

export default TechniDash;
