const StatCard = ({ title, value, icon, iconBg, iconColor }) => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-28px_rgba(15,23,42,0.25)] min-h-[190px]">
      <div className="pointer-events-none absolute -right-10 top-0 h-36 w-36 rounded-full bg-sky-200/30 blur-3xl"></div>
      <div className="pointer-events-none absolute -left-8 bottom-8 h-28 w-28 rounded-full bg-rose-200/25 blur-3xl"></div>

      <div className="relative flex h-full flex-col justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {title}
          </p>
          <h2 className="mt-5 text-5xl font-semibold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div
            className={`w-16 h-16 rounded-3xl grid place-items-center ${iconBg}`}
          >
            <span className={`text-2xl ${iconColor}`}>{icon}</span>
          </div>
          <div className="rounded-full bg-slate-900/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm">
            live update
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
