import { useState } from "react";

import { Check, X, AlertTriangle, DollarSign, Calendar } from "lucide-react";

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  const staffData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      attendance: "present",
      dressCode: "compliant",
      licenseExpiry: "2026-06-05",
      salaryPaid: true,
      contractStart: "2020-01-15",
      contractEnd: "2027-01-15",
    },

    {
      id: 2,
      name: "Nurse Michael Chen",
      role: "Registered Nurse",
      attendance: "present",
      dressCode: "compliant",
      licenseExpiry: "2026-12-20",
      salaryPaid: true,
      contractStart: "2021-03-10",
      contractEnd: "2026-03-10",
    },

    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Pediatrician",
      attendance: "present",
      dressCode: "non-compliant",
      licenseExpiry: "2027-08-15",
      salaryPaid: true,
      contractStart: "2019-06-01",
      contractEnd: "2028-06-01",
    },

    {
      id: 4,
      name: "Nurse David Kim",
      role: "ICU Nurse",
      attendance: "absent",
      dressCode: "compliant",
      licenseExpiry: "2026-05-28",
      salaryPaid: false,
      contractStart: "2022-02-20",
      contractEnd: "2027-02-20",
    },
  ];

  const tabs = [
    {
      id: "attendance",
      label: "Attendance & Dress Code",
    },

    {
      id: "files",
      label: "Staff Files & Licenses",
    },

    {
      id: "salary",
      label: "Salary Tracking",
    },

    {
      id: "contracts",
      label: "Employment Contracts",
    },
  ];

  const today = new Date("2026-05-27");

  const isLicenseExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    return daysUntilExpiry <= 30 && expiry >= today;
  };

  const isLicenseExpired = (expiryDate) => {
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const getContractStatus = (staff) => {
    const contractEnd = new Date(staff.contractEnd);
    const daysUntilEnd = Math.floor(
      (contractEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (
      new Date(staff.contractStart).getTime() > new Date("2026-01-01").getTime()
    ) {
      return {
        label: "New Hire",
        icon: <Calendar size={16} />,
        classes: "bg-blue-100 text-blue-700",
      };
    }

    if (daysUntilEnd < 180) {
      return {
        label: "Expiring Soon",
        icon: <AlertTriangle size={16} />,
        classes: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "Active",
      icon: <Check size={16} />,
      classes: "bg-green-100 text-green-700",
    };
  };

  const getSalaryValue = (staff) =>
    staff.role.includes("Dr") ? "3,500" : "2,200";

  const getStatusBadge = (label, icon, variant) => (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${variant}`}
    >
      {icon}
      {label}
    </span>
  );

  const renderMobileCards = () => {
    return (
      <div className="grid gap-4 lg:hidden">
        {staffData.map((staff) => {
          const expired = isLicenseExpired(staff.licenseExpiry);
          const expiringSoon = isLicenseExpiringSoon(staff.licenseExpiry);
          const contractStatus = getContractStatus(staff);
          const statusBadge =
            activeTab === "attendance"
              ? staff.attendance === "present"
                ? getStatusBadge(
                    "Present",
                    <Check size={16} />,
                    "bg-green-100 text-green-700",
                  )
                : getStatusBadge(
                    "Absent",
                    <X size={16} />,
                    "bg-red-100 text-red-700",
                  )
              : activeTab === "files"
                ? expired
                  ? getStatusBadge(
                      "Expired",
                      <AlertTriangle size={16} />,
                      "bg-red-100 text-red-700",
                    )
                  : expiringSoon
                    ? getStatusBadge(
                        "Expires Soon",
                        <AlertTriangle size={16} />,
                        "bg-yellow-100 text-yellow-700",
                      )
                    : getStatusBadge(
                        "Valid",
                        <Check size={16} />,
                        "bg-green-100 text-green-700",
                      )
                : activeTab === "salary"
                  ? staff.salaryPaid
                    ? getStatusBadge(
                        "Paid",
                        <Check size={16} />,
                        "bg-green-100 text-green-700",
                      )
                    : getStatusBadge(
                        "Pending",
                        <AlertTriangle size={16} />,
                        "bg-red-100 text-red-700",
                      )
                  : getStatusBadge(
                      contractStatus.label,
                      contractStatus.icon,
                      contractStatus.classes,
                    );

          const details = {
            attendance: [
              {
                label: "Attendance",
                value: staff.attendance === "present" ? "Present" : "Absent",
              },
              {
                label: "Dress Code",
                value:
                  staff.dressCode === "compliant"
                    ? "Compliant"
                    : "Non-Compliant",
              },
            ],
            files: [
              { label: "License Expiry", value: staff.licenseExpiry },
              {
                label: "Status",
                value: expired
                  ? "Expired"
                  : expiringSoon
                    ? "Expires Soon"
                    : "Valid",
              },
            ],
            salary: [
              { label: "Salary", value: `$${getSalaryValue(staff)}` },
              {
                label: "Payment",
                value: staff.salaryPaid ? "Paid" : "Pending",
              },
            ],
            contracts: [
              { label: "Start Date", value: staff.contractStart },
              { label: "End Date", value: staff.contractEnd },
              { label: "Contract", value: contractStatus.label },
            ],
          };

          return (
            <div
              key={staff.id}
              className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Staff Member
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-950">
                    {staff.name}
                  </p>
                  <p className="text-sm text-slate-600">{staff.role}</p>
                </div>
                <div className="min-w-[110px] text-right">
                  <p className="text-sm text-slate-500">Snapshot</p>
                  <div className="mt-2">{statusBadge}</div>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {details[activeTab].map((item) => (
                  <div key={item.label} className="grid gap-1">
                    <span className="text-sm text-slate-500">{item.label}</span>
                    <span className="text-sm text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-950 mb-2">
          Staff Management
        </h2>
        <p className="text-slate-600 text-base sm:text-lg">
          Manage daily operations and staff records
        </p>
      </div>

      {/* CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* TABS */}
        <div className="border-b border-slate-200">
          <div className="flex flex-wrap gap-2 p-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-150 ${
                  activeTab === tab.id
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-950">
                {activeTab === "attendance" &&
                  "Daily Attendance - May 27, 2026"}
                {activeTab === "files" && "Staff Files & License Management"}
                {activeTab === "salary" &&
                  "Salary Tracking - Week of May 19-25, 2026"}
                {activeTab === "contracts" && "Employment Contracts"}
              </h3>
            </div>
            {activeTab === "attendance" ? (
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>
                  Present:
                  <span className="text-emerald-600 ml-1">4</span>
                </span>
                <span>
                  Absent:
                  <span className="text-rose-600 ml-1">1</span>
                </span>
              </div>
            ) : null}
          </div>

          {renderMobileCards()}

          <div className="hidden lg:block overflow-x-auto">
            {activeTab === "attendance" && (
              <table className="w-full min-w-full table-auto">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-sm text-slate-700">
                    <th className="py-4 px-4">Staff Member</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4 text-center">Attendance</th>
                    <th className="py-4 px-4 text-center">Dress Code</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData.map((staff) => (
                    <tr key={staff.id} className="border-b border-slate-100">
                      <td className="py-4 px-4 text-slate-900">{staff.name}</td>
                      <td className="py-4 px-4 text-slate-600">{staff.role}</td>
                      <td className="py-4 px-4 text-center">
                        {staff.attendance === "present" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                            <Check size={16} />
                            Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-rose-700">
                            <X size={16} />
                            Absent
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {staff.dressCode === "compliant" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-sky-700">
                            <Check size={16} />
                            Compliant
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                            <X size={16} />
                            Non-Compliant
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "files" && (
              <table className="w-full min-w-full table-auto">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-sm text-slate-700">
                    <th className="py-4 px-4">Staff Member</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">License Expiry</th>
                    <th className="py-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData.map((staff) => {
                    const expired = isLicenseExpired(staff.licenseExpiry);
                    const expiringSoon = isLicenseExpiringSoon(
                      staff.licenseExpiry,
                    );

                    return (
                      <tr key={staff.id} className="border-b border-slate-100">
                        <td className="py-4 px-4 text-slate-900">
                          {staff.name}
                        </td>
                        <td className="py-4 px-4 text-slate-600">
                          {staff.role}
                        </td>
                        <td className="py-4 px-4 text-slate-900">
                          {staff.licenseExpiry}
                        </td>
                        <td className="py-4 px-4 text-slate-900">
                          {expired ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-rose-700">
                              <AlertTriangle size={16} />
                              Expired
                            </span>
                          ) : expiringSoon ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                              <AlertTriangle size={16} />
                              Expires Soon
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                              <Check size={16} />
                              Valid
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {activeTab === "salary" && (
              <table className="w-full min-w-full table-auto">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-sm text-slate-700">
                    <th className="py-4 px-4">Staff Member</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4 text-center">Salary</th>
                    <th className="py-4 px-4">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData.map((staff) => (
                    <tr key={staff.id} className="border-b border-slate-100">
                      <td className="py-4 px-4 text-slate-900">{staff.name}</td>
                      <td className="py-4 px-4 text-slate-600">{staff.role}</td>
                      <td className="py-4 px-4 text-center text-slate-900">
                        <span className="inline-flex items-center gap-1">
                          <DollarSign size={16} />${getSalaryValue(staff)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-900">
                        {staff.salaryPaid ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                            <Check size={16} />
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-rose-700">
                            <AlertTriangle size={16} />
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "contracts" && (
              <table className="w-full min-w-full table-auto">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-sm text-slate-700">
                    <th className="py-4 px-4">Staff Member</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">Start Date</th>
                    <th className="py-4 px-4">End Date</th>
                    <th className="py-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData.map((staff) => {
                    const contractStatus = getContractStatus(staff);

                    return (
                      <tr key={staff.id} className="border-b border-slate-100">
                        <td className="py-4 px-4 text-slate-900">
                          {staff.name}
                        </td>
                        <td className="py-4 px-4 text-slate-600">
                          {staff.role}
                        </td>
                        <td className="py-4 px-4 text-slate-900">
                          {staff.contractStart}
                        </td>
                        <td className="py-4 px-4 text-slate-900">
                          {staff.contractEnd}
                        </td>
                        <td className="py-4 px-4 text-slate-900">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${contractStatus.classes}`}
                          >
                            {contractStatus.icon}
                            {contractStatus.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
