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
    <div className="flex w-full min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-auto lg:ml-0 pt-20 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default HRModule;
