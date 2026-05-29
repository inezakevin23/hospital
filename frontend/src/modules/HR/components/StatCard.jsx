const StatCard = ({ title, value, icon, iconBg, iconColor }) => {
  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white px-5 py-5 shadow-sm transition-all duration-200 hover:shadow-md min-h-[160px]">
      <div className="flex h-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-3xl ${iconBg}`}
        >
          <span className={`text-xl ${iconColor}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
