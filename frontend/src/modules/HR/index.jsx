import { useState } from "react";

import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import StaffManagement from "./components/StaffManagement";
import LeaveManagement from "./components/LeaveManagement";
import ReportSubmission from "./components/ReportSubmission";

const HRModule = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "staff":
        return <StaffManagement />;

      case "leave":
        return <LeaveManagement />;

      case "report":
        return <ReportSubmission />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-slate-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 overflow-auto bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8 lg:px-10 lg:py-10">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default HRModule;
