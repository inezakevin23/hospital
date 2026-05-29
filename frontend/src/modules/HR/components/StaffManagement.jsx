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

  const isLicenseExpiringSoon = (expiryDate) => {
    const today = new Date("2026-05-27");
    const expiry = new Date(expiryDate);

    const daysUntilExpiry = Math.floor(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    return daysUntilExpiry <= 30;
  };

  const isLicenseExpired = (expiryDate) => {
    const today = new Date("2026-05-27");
    const expiry = new Date(expiryDate);

    return expiry < today;
  };

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Staff Management
        </h2>

        <p className="text-gray-600 text-lg">
          Manage daily operations and staff records
        </p>
      </div>

      {/* CONTAINER */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
        {/* TABS */}
        <div className="border-b border-gray-200">
          <div className="flex gap-2 p-3 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl transition-all text-sm md:text-base
                  
                  ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* ATTENDANCE */}
          {activeTab === "attendance" && (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Daily Attendance - May 27, 2026
                </h3>

                <div className="flex gap-4 text-sm">
                  <span className="text-gray-600">
                    Present:
                    <span className="text-green-600 ml-1">4</span>
                  </span>

                  <span className="text-gray-600">
                    Absent:
                    <span className="text-red-600 ml-1">1</span>
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-gray-700">
                        Staff Member
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        Role
                      </th>

                      <th className="text-center py-4 px-4 text-gray-700">
                        Attendance
                      </th>

                      <th className="text-center py-4 px-4 text-gray-700">
                        Dress Code
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffData.map((staff) => (
                      <tr key={staff.id} className="border-b border-gray-100">
                        <td className="py-4 px-4 text-gray-900">
                          {staff.name}
                        </td>

                        <td className="py-4 px-4 text-gray-600">
                          {staff.role}
                        </td>

                        <td className="py-4 px-4 text-center">
                          {staff.attendance === "present" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700">
                              <Check size={16} />
                              Present
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700">
                              <X size={16} />
                              Absent
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-center">
                          {staff.dressCode === "compliant" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                              <Check size={16} />
                              Compliant
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                              <X size={16} />
                              Non-Compliant
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FILES */}
          {activeTab === "files" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Staff Files & License Management
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-gray-700">
                        Staff Member
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        Role
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        License Expiry
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffData.map((staff) => {
                      const expired = isLicenseExpired(staff.licenseExpiry);

                      const expiringSoon = isLicenseExpiringSoon(
                        staff.licenseExpiry,
                      );

                      return (
                        <tr key={staff.id} className="border-b border-gray-100">
                          <td className="py-4 px-4 text-gray-900">
                            {staff.name}
                          </td>

                          <td className="py-4 px-4 text-gray-600">
                            {staff.role}
                          </td>

                          <td className="py-4 px-4 text-gray-900">
                            {staff.licenseExpiry}
                          </td>

                          <td className="py-4 px-4">
                            {expired ? (
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700">
                                <AlertTriangle size={16} />
                                Expired
                              </span>
                            ) : expiringSoon ? (
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                <AlertTriangle size={16} />
                                Expires Soon
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
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
              </div>
            </div>
          )}

          {/* SALARY */}
          {activeTab === "salary" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Salary Tracking - Week of May 19-25, 2026
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-gray-700">
                        Staff Member
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        Role
                      </th>

                      <th className="text-center py-4 px-4 text-gray-700">
                        Salary
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        Payment Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffData.map((staff) => (
                      <tr key={staff.id} className="border-b border-gray-100">
                        <td className="py-4 px-4 text-gray-900">
                          {staff.name}
                        </td>

                        <td className="py-4 px-4 text-gray-600">
                          {staff.role}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1">
                            <DollarSign size={16} />
                            {staff.role.includes("Dr") ? "3,500" : "2,200"}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          {staff.salaryPaid ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
                              <Check size={16} />
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700">
                              <AlertTriangle size={16} />
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CONTRACTS */}
          {activeTab === "contracts" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Employment Contracts
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-gray-700">
                        Staff Member
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        Role
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        Start Date
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        End Date
                      </th>

                      <th className="text-left py-4 px-4 text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffData.map((staff) => {
                      const today = new Date("2026-05-27");

                      const contractEnd = new Date(staff.contractEnd);

                      const daysUntilEnd = Math.floor(
                        (contractEnd.getTime() - today.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );

                      const isNewHire =
                        new Date(staff.contractStart).getTime() >
                        new Date("2026-01-01").getTime();

                      return (
                        <tr key={staff.id} className="border-b border-gray-100">
                          <td className="py-4 px-4 text-gray-900">
                            {staff.name}
                          </td>

                          <td className="py-4 px-4 text-gray-600">
                            {staff.role}
                          </td>

                          <td className="py-4 px-4 text-gray-900">
                            {staff.contractStart}
                          </td>

                          <td className="py-4 px-4 text-gray-900">
                            {staff.contractEnd}
                          </td>

                          <td className="py-4 px-4">
                            {isNewHire ? (
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                <Calendar size={16} />
                                New Hire
                              </span>
                            ) : daysUntilEnd < 180 ? (
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                <AlertTriangle size={16} />
                                Expiring Soon
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
                                <Check size={16} />
                                Active
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
