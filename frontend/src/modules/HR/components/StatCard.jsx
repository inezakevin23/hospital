const StatCard = ({ title, value, icon, iconBg, iconColor }) => {
  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:shadow-md min-h-[140px]">
      <div className="flex h-full items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-3xl ${iconBg}`}
        >
          <span className={`text-xl ${iconColor}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
