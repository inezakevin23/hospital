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
      iconBg: "bg-light_blue-600",
      iconColor: "text-jet_black-500",
    },

    {
      title: "Present Today",
      value: 118,
      icon: <FiUserCheck />,
      iconBg: "bg-light_cyan-700",
      iconColor: "text-jet_black-500",
    },

    {
      title: "On Leave",
      value: 5,
      icon: <FiCalendar />,
      iconBg: "bg-cool_steel-300",
      iconColor: "text-jet_black-500",
    },

    {
      title: "Expired Licenses",
      value: 3,
      icon: <FiAlertCircle />,
      iconBg: "bg-light_blue-700",
      iconColor: "text-light_cyan-500",
    },

    {
      title: "Pending Salary",
      value: 0,
      icon: <FiClock />,
      iconBg: "bg-cool_steel-400",
      iconColor: "text-jet_black-500",
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
