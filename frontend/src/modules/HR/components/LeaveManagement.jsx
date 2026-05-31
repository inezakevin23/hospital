import { useState } from "react";

import { Calendar, Clock, Check, X } from "lucide-react";

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("annual");

  const annualLeaveData = [
    {
      id: 1,
      staffName: "Dr. Sarah Johnson",
      type: "annual",
      startDate: "2026-06-15",
      endDate: "2026-06-22",
      reason: "Family vacation",
      status: "approved",
      daysUsed: 12,
      totalDays: 21,
    },

    {
      id: 2,
      staffName: "Nurse Michael Chen",
      type: "annual",
      startDate: "2026-07-01",
      endDate: "2026-07-10",
      reason: "Personal travel",
      status: "pending",
      daysUsed: 5,
      totalDays: 18,
    },

    {
      id: 3,
      staffName: "Dr. Emily Rodriguez",
      type: "annual",
      startDate: "2026-08-05",
      endDate: "2026-08-12",
      reason: "Conference attendance",
      status: "approved",
      daysUsed: 8,
      totalDays: 21,
    },
  ];

  const permissionRequests = [
    {
      id: 4,
      staffName: "Nurse David Kim",
      type: "permission",
      startDate: "2026-05-28",
      endDate: "2026-05-28",
      reason: "Medical appointment",
      status: "approved",
    },

    {
      id: 5,
      staffName: "Dr. James Wilson",
      type: "permission",
      startDate: "2026-05-29",
      endDate: "2026-05-29",
      reason: "Family emergency",
      status: "pending",
    },

    {
      id: 6,
      staffName: "Nurse Michael Chen",
      type: "permission",
      startDate: "2026-05-27",
      endDate: "2026-05-27",
      reason: "Bank visit (2 hours)",
      status: "approved",
    },
  ];

  const handleApprove = (id) => {
    console.log("Approved leave request:", id);
  };

  const handleReject = (id) => {
    console.log("Rejected leave request:", id);
  };

  const renderStatusBadge = (status) => {
    if (status === "approved") {
      return (
        <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold flex items-center gap-2">
          <Check size={16} />
          Approved
        </span>
      );
    }

    if (status === "pending") {
      return (
        <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold flex items-center gap-2">
          <Clock size={16} />
          Pending
        </span>
      );
    }

    return (
      <span className="px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold flex items-center gap-2">
        <X size={16} />
        Rejected
      </span>
    );
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          Leave & Permissions
        </h2>
        <p className="text-slate-600 text-lg">
          Track annual leave and permission requests
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        {/* TABS */}
        <div className="border-b border-white/20 bg-white/50 backdrop-blur-sm">
          <div className="flex gap-2 p-4">
            <button
              onClick={() => setActiveTab("annual")}
              className={`px-5 py-3 rounded-lg transition-all font-semibold ${
                activeTab === "annual"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-white/50"
              }`}
            >
              Annual Leave Tracker
            </button>

            <button
              onClick={() => setActiveTab("permissions")}
              className={`px-5 py-3 rounded-lg transition-all font-semibold ${
                activeTab === "permissions"
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-white/50"
              }`}
            >
              Permission Requests
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* ANNUAL LEAVE */}
          {activeTab === "annual" && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Annual Leave Overview
              </h3>

              <div className="space-y-5">
                {annualLeaveData.map((leave) => (
                  <div
                    key={leave.id}
                    className="border border-white/20 rounded-xl p-6 hover:bg-white/40 hover:shadow-md transition-all bg-white/50 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        {/* TOP */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h4 className="text-lg font-bold text-slate-900">
                            {leave.staffName}
                          </h4>

                          {renderStatusBadge(leave.status)}
                        </div>

                        {/* DATES */}
                        <div className="flex items-center gap-6 text-sm text-slate-600 mb-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />

                            <span>
                              {leave.startDate} to {leave.endDate}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock size={16} />

                            <span>
                              {leave.daysUsed}/{leave.totalDays} days used
                            </span>
                          </div>
                        </div>

                        {/* REASON */}
                        <p className="text-gray-700 mb-4">
                          <span className="text-gray-500">Reason:</span>{" "}
                          {leave.reason}
                        </p>

                        {/* PROGRESS BAR */}
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full"
                            style={{
                              width: `${
                                ((leave.daysUsed || 0) /
                                  (leave.totalDays || 1)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* ACTIONS */}
                      {leave.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(leave.id)}
                            className="p-3 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition-all"
                          >
                            <Check size={20} />
                          </button>

                          <button
                            onClick={() => handleReject(leave.id)}
                            className="p-3 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition-all"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PERMISSIONS */}
          {activeTab === "permissions" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Short Leave / Permission Requests
              </h3>

              <div className="space-y-5">
                {permissionRequests.map((permission) => (
                  <div
                    key={permission.id}
                    className="border border-gray-200 rounded-2xl p-5 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        {/* TOP */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h4 className="text-xl font-semibold text-gray-900">
                            {permission.staffName}
                          </h4>

                          {renderStatusBadge(permission.status)}
                        </div>

                        {/* DATE */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <Calendar size={16} />

                          <span>{permission.startDate}</span>
                        </div>

                        {/* REASON */}
                        <p className="text-gray-700">
                          <span className="text-gray-500">Reason:</span>{" "}
                          {permission.reason}
                        </p>
                      </div>

                      {/* ACTIONS */}
                      {permission.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(permission.id)}
                            className="p-3 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition-all"
                          >
                            <Check size={20} />
                          </button>

                          <button
                            onClick={() => handleReject(permission.id)}
                            className="p-3 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition-all"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
