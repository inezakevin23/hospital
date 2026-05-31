const StatCard = ({ title, value, icon, iconBg, iconColor }) => {
  return (
    <div className="group relative rounded-2xl border border-white/20 bg-white/80 backdrop-blur-sm px-6 py-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-white/40 min-h-[180px]">
      {/* Gradient background decoration */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex h-full flex-col justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            {title}
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-md transform transition-transform duration-300 group-hover:scale-110 ${iconBg}`}
        >
          <span className={`text-2xl ${iconColor}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
