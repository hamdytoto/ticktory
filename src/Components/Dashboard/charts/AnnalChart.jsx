/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from "recharts";
import { useTranslation } from "react-i18next";

const AnnualTicketsChart = ({ data }) => {
    const { t } = useTranslation()
    return (
        <div
            className="bg-white p-4 md:p-6 rounded-xl shadow-lg flex flex-col"
            style={{
                borderRadius: "16px",
                border: "1px solid #D1D5DB",
                boxShadow: "0px 4px 10px rgba(13, 27, 68, 0.2)", // Soft shadow effect
            }}
        >
            {/* Title */}
            <h3 className="text-gray-700 font-medium text-sm md:text-lg mb-2">{t("stats.annualTickets")}</h3>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#E5E7EB" vertical={false} />
                    <XAxis
                        dataKey="year"
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip contentStyle={{ background: "#F3F4F6", borderRadius: "8px" }} />

                    {/* Area for Gradient Fill */}
                    <defs>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22C55E" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area type="monotone" dataKey="count" stroke="none" fill="url(#greenGradient)" />
                    <Line type="monotone" dataKey="count" stroke="#22C55E" strokeWidth={2.5} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnnualTicketsChart;
