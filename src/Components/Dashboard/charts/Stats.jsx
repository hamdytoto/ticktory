/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell } from "recharts";
import getIconByLabel from "./stats-icons";
import { useTranslation } from "react-i18next";

const COLORS = ["#0D1B44", "#E5E7EB"];

const StatsCards = ({ stats }) => {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:items-start justify-between min-w-0 transition-all duration-300 hover:shadow-2xl"
                    style={{
                        borderRadius: "16px",
                        border: "1px solid #D1D5DB",
                        boxShadow: "0px 4px 10px rgba(13, 27, 68, 0.2)",
                    }}
                >
                    {/* Left: Label & Value */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 w-full">
                        <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-sm sm:text-base text-gray-600 font-medium flex-wrap">
                            {t(stat.label)}
                            <span className="text-lg">{getIconByLabel(stat.label)}</span>
                        </div>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
                            {stat.value}
                        </p>
                    </div>

                    {/* Right: Circular Progress Bar */}
                    <div className="relative mt-4 sm:mt-0 sm:ml-4 w-16 h-16 flex items-center justify-center">
                        {/* Outer Shadow Circle */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(0,0,0,0.05) 20%, transparent 70%)",
                                boxShadow: "0px 4px 10px rgba(13, 27, 68, 0.4)",
                            }}
                        ></div>

                        {/* Pie Chart */}
                        <PieChart width={64} height={64}>
                            <Pie
                                data={[
                                    { name: "Completed", value: stat.percentage },
                                    { name: "Remaining", value: 100 - stat.percentage },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={22}
                                outerRadius={30}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                <Cell fill={COLORS[0]} />
                                <Cell fill={COLORS[1]} />
                            </Pie>
                        </PieChart>

                        {/* Percentage Text */}
                        <span className="absolute text-sm font-semibold text-gray-900">
                            {stat.percentage.toFixed(0)}%
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
