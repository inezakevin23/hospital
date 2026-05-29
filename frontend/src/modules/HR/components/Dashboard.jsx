import {
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";

import StatCard from "./StatCard";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Staff",
      value: 127,
      icon: <FiUsers />,
      iconBg: "bg-gradient-to-br from-sky-100 to-sky-200",
      iconColor: "text-sky-700",
    },

    {
      title: "Present Today",
      value: 118,
      icon: <FiUserCheck />,
      iconBg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      iconColor: "text-emerald-700",
    },

    {
      title: "On Leave",
      value: 5,
      icon: <FiCalendar />,
      iconBg: "bg-gradient-to-br from-orange-100 to-orange-200",
      iconColor: "text-orange-700",
    },

    {
      title: "Expired Licenses",
      value: 3,
      icon: <FiAlertCircle />,
      iconBg: "bg-gradient-to-br from-rose-100 to-rose-200",
      iconColor: "text-rose-700",
    },

    {
      title: "Pending Salary",
      value: 0,
      icon: <FiClock />,
      iconBg: "bg-gradient-to-br from-amber-100 to-amber-200",
      iconColor: "text-amber-700",
    },
  ];

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-[#111827]">Dashboard</h1>
        <p className="text-slate-500 text-lg mt-2">
          Overview of hospital HR operations
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
