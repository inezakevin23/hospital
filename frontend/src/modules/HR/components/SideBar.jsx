import { FiGrid, FiUsers, FiCalendar, FiFileText, FiMenu } from "react-icons/fi";
import { useState } from "react";

const Sidebar = ({ activePage, setActivePage }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-lg"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-teal-600 to-teal-700 text-white overflow-hidden shadow-lg transition-all duration-300 z-40 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* TITLE SECTION */}
        <div className="p-6 border-b border-teal-500/30">
          <h1 className="text-2xl font-bold text-white">HR Portal</h1>
          <p className="text-teal-100 mt-2 text-sm leading-6">
            Manage hospital staff
          </p>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-2">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => {
                setActivePage(menu.id);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 text-left ${
                activePage === menu.id
                  ? "bg-white/20 text-white shadow-md ring-1 ring-white/30"
                  : "text-teal-100 hover:bg-white/10"
              }`}
            >
              <span className="text-lg">{menu.icon}</span>
              <span>{menu.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-teal-500/30">
          <p className="text-xs text-teal-100 text-center">
            Hospital Management System
          </p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
