import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaReply } from "react-icons/fa"; // Reply Icon
import { useTranslation } from "react-i18next";

const data = [
  { name: "Sat", value: 30 },
  { name: "Sun", value: 50 },
  { name: "Mon", value: 80 },
  { name: "Tue", value: 100 },
  { name: "Wed", value: 80 },
  { name: "Thu", value: 60 },
  { name: "Fri", value: 10 },
];

const DailyRespondChart = () => {
  const { t } = useTranslation();
  return (
    <div
      className="bg-white p-4 md:p-6 rounded-xl shadow-lg flex flex-col"
      style={{
        borderRadius: "16px",
        border: "1px solid #D1D5DB",
        boxShadow: "0px 4px 10px rgba(13, 27, 68, 0.2)", // Soft shadow effect
      }}
    >
      {/* Title with Icon */}
      <div className="flex items-center gap-2 text-gray-700 font-medium text-sm md:text-lg mb-2">
        {t("stats.dailyRespond")}
        <FaReply className="text-gray-400 text-[10px] md:text-sm" />
      </div>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tick={{ fill: "#4B5563", fontSize: 12, fontWeight: "500" }}
            tickLine={false}
          />
          <Tooltip contentStyle={{ background: "#F3F4F6", borderRadius: "8px" }} />
          <Bar
            dataKey="value"
            fill="url(#blueGradient)"
            radius={[16, 16, 4, 4]}
            barSize={26}
          />
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D1B44" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyRespondChart;
