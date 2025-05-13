/* eslint-disable react/prop-types */
import StatsCards from "./charts/Stats";
import DailyRespondChart from "./charts/DailyChart";
import AnnualTicketsChart from "./charts/AnnalChart";
import RecentTicketsTable from "./charts/RecentTickets";

const DashboardLayout = ({
    title = "Dashboard",
    stats,
    annualTickets,
    recentTickets,
}) => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <DailyRespondChart />
                <AnnualTicketsChart data={annualTickets} />
            </div>
            {/* Recent Tickets */}
            <div className="mt-6">
                <RecentTicketsTable recent_tickets={recentTickets} />
            </div>
        </div>
    );
};

export default DashboardLayout;
