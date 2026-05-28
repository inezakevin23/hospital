const StatCard = ({ title, value, icon, iconBg, iconColor }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200/70 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[160px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-4 text-4xl font-semibold text-[#111827]">
            {value}
          </h2>
        </div>

        <div
          className={`w-16 h-16 rounded-3xl flex items-center justify-center ${iconBg}`}
        >
          <span className={`text-2xl ${iconColor}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
