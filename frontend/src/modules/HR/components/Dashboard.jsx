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
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
      iconColor: "text-blue-700",
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
      <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-600 text-base mt-2 sm:text-lg">
            Overview of hospital HR operations and staff metrics
          </p>
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="space-y-8">
        {/* Stat Cards Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-5">
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

        {/* Additional Content Section */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              View Staff Reports
            </button>
            <button className="p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Manage Leave Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
