import { FiGrid, FiUsers, FiCalendar, FiFileText } from "react-icons/fi";

const Sidebar = ({ activePage, setActivePage }) => {
  const menus = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FiGrid />,
    },
    {
      id: "staff",
      label: "Staff Management",
      icon: <FiUsers />,
    },
    {
      id: "leave",
      label: "Leave & Permissions",
      icon: <FiCalendar />,
    },
    {
      id: "report",
      label: "Submit Report",
      icon: <FiFileText />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/70 h-screen sticky top-0 overflow-hidden shadow-sm">
      {/* TITLE */}
      <div className="p-6 border-b border-slate-200/70">
        <h1 className="text-2xl font-semibold text-slate-950">HR Portal</h1>
        <p className="text-slate-500 mt-2 text-sm leading-6">
          Report and manage hospital staff
        </p>
      </div>

      {/* MENU */}
      <nav className="p-5 space-y-2.5">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => setActivePage(menu.id)}
            className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 text-left ${
              activePage === menu.id
                ? "bg-sky-50 text-sky-700 shadow-sm ring-1 ring-sky-200"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span className="text-lg">{menu.icon}</span>
            <span>{menu.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
