import { useEffect, useState } from "react";

import { Clock, CheckCircle, AlertCircle, Calendar, X } from "lucide-react";

const ReportSubmission = () => {
  const [absentStaff, setAbsentStaff] = useState([]);

  const [dressCodeViolations, setDressCodeViolations] = useState([]);

  const [expiredLicenses, setExpiredLicenses] = useState([]);

  const [unpaidSalaries, setUnpaidSalaries] = useState([]);

  const [expiredContracts, setExpiredContracts] = useState([]);

  const [additionalNotes, setAdditionalNotes] = useState("");

  const [submissionStatus, setSubmissionStatus] = useState("idle");

  const [submissionTimestamp, setSubmissionTimestamp] = useState("");

  // REAL TIME CLOCK
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ALL WEEK DAYS
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const allStaff = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
    },

    {
      id: 2,
      name: "Nurse Michael Chen",
      role: "Registered Nurse",
    },

    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Pediatrician",
    },

    {
      id: 4,
      name: "Nurse David Kim",
      role: "ICU Nurse",
    },

    {
      id: 5,
      name: "Dr. James Wilson",
      role: "Surgeon",
    },

    {
      id: 6,
      name: "Nurse Lisa Martinez",
      role: "Emergency Nurse",
    },

    {
      id: 7,
      name: "Dr. Robert Taylor",
      role: "Anesthesiologist",
    },

    {
      id: 8,
      name: "Nurse Amanda White",
      role: "OR Nurse",
    },

    {
      id: 9,
      name: "Dr. Patricia Brown",
      role: "Neurologist",
    },

    {
      id: 10,
      name: "Nurse Kevin Lee",
      role: "Pediatric Nurse",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    setSubmissionTimestamp(timestamp);

    setSubmissionStatus("success");

    setTimeout(() => {
      setAbsentStaff([]);
      setDressCodeViolations([]);
      setExpiredLicenses([]);
      setUnpaidSalaries([]);
      setExpiredContracts([]);
      setAdditionalNotes("");
      setSubmissionStatus("idle");
      setSubmissionTimestamp("");
    }, 7000);
  };

  // TOGGLE STAFF
  const toggleStaffSelection = (staffId, list, setList) => {
    if (list.includes(staffId)) {
      setList(list.filter((id) => id !== staffId));
    } else {
      setList([...list, staffId]);
    }
  };

  // TOGGLE STAFF WITH DAYS
  const toggleStaffWithDays = (staffId, list, setList) => {
    const existing = list.find((item) => item.staffId === staffId);

    if (existing) {
      setList(list.filter((item) => item.staffId !== staffId));
    } else {
      setList([
        ...list,
        {
          staffId,
          days: [],
        },
      ]);
    }
  };

  // TOGGLE DAY
  const toggleDay = (staffId, day, list, setList) => {
    const updatedList = list.map((item) => {
      if (item.staffId === staffId) {
        const days = item.days.includes(day)
          ? item.days.filter((d) => d !== day)
          : [...item.days, day];

        return {
          ...item,
          days,
        };
      }

      return item;
    });

    setList(updatedList);
  };

  // GET STAFF NAMES
  const getSelectedStaffNames = (selectedIds) => {
    return allStaff.filter((staff) => selectedIds.includes(staff.id));
  };

  // GET STAFF WITH DAYS
  const getSelectedStaffWithDays = (list) => {
    return list.map((item) => ({
      ...allStaff.find((staff) => staff.id === item.staffId),
      days: item.days,
    }));
  };

  // MULTI SELECT WITH DAYS
  const renderMultiSelectWithDays = (
    label,
    selectedList,
    setSelectedList,
    color,
  ) => {
    return (
      <div>
        <label className="block text-gray-700 font-medium mb-2">{label}</label>

        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const value = parseInt(e.target.value);

            if (value && !selectedList.find((item) => item.staffId === value)) {
              toggleStaffWithDays(value, selectedList, setSelectedList);
            }

            e.target.value = "";
          }}
        >
          <option value="">Select staff member...</option>

          {allStaff
            .filter(
              (staff) =>
                !selectedList.find((item) => item.staffId === staff.id),
            )
            .map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name} - {staff.role}
              </option>
            ))}
        </select>

        {selectedList.length > 0 && (
          <div className="mt-4 space-y-4">
            {getSelectedStaffWithDays(selectedList).map((staff) => (
              <div key={staff.id} className={`p-4 rounded-2xl border ${color}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm">
                    {staff.name} - {staff.role}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      toggleStaffWithDays(
                        staff.id,
                        selectedList,
                        setSelectedList,
                      )
                    }
                    className="text-red-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {allDays.map((day) => {
                    const isSelected = staff.days.includes(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() =>
                          toggleDay(
                            staff.id,
                            day,
                            selectedList,
                            setSelectedList,
                          )
                        }
                        className={`px-3 py-1 rounded-lg text-xs transition-all
                        
                        ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // NORMAL MULTI SELECT
  const renderMultiSelect = (label, selectedIds, setSelectedIds, color) => {
    return (
      <div>
        <label className="block text-gray-700 font-medium mb-2">{label}</label>

        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const value = parseInt(e.target.value);

            if (value && !selectedIds.includes(value)) {
              setSelectedIds([...selectedIds, value]);
            }

            e.target.value = "";
          }}
        >
          <option value="">Select staff member...</option>

          {allStaff
            .filter((staff) => !selectedIds.includes(staff.id))
            .map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name} - {staff.role}
              </option>
            ))}
        </select>

        {selectedIds.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {getSelectedStaffNames(selectedIds).map((staff) => (
              <div
                key={staff.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${color}`}
              >
                <span className="text-sm">{staff.name}</span>

                <button
                  type="button"
                  onClick={() =>
                    toggleStaffSelection(staff.id, selectedIds, setSelectedIds)
                  }
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const totalIssues =
    absentStaff.length +
    dressCodeViolations.length +
    expiredLicenses.length +
    unpaidSalaries.length +
    expiredContracts.length;

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          HR Report Submission
        </h2>

        <p className="text-gray-600 text-lg">
          Submit HR compliance and staff reports
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* CLOCK */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-blue-600" />

            <h3 className="text-lg font-semibold">Current Time</h3>
          </div>

          <p className="text-2xl font-bold text-gray-900">
            {currentDate.toLocaleTimeString()}
          </p>

          <p className="text-gray-500 mt-2">{currentDate.toDateString()}</p>
        </div>

        {/* REPORT STATUS */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="text-purple-600" />

            <h3 className="text-lg font-semibold">Report Status</h3>
          </div>

          <p className="text-2xl font-bold text-gray-900">Open</p>

          <p className="text-gray-500 mt-2">
            Reports can be submitted any day and any time
          </p>
        </div>

        {/* TOTAL ISSUES */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="text-red-600" />

            <h3 className="text-lg font-semibold">Total Issues</h3>
          </div>

          <p className="text-3xl font-bold text-red-700">{totalIssues}</p>

          <p className="text-red-500 mt-2">Current report findings</p>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {submissionStatus === "success" && (
        <div className="mb-6 p-5 bg-green-50 border border-green-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />

            <div>
              <p className="text-green-700 font-medium">
                Report submitted successfully
              </p>

              <p className="text-green-600 text-sm mt-1">
                Submitted at {submissionTimestamp}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MAIN FORM */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderMultiSelectWithDays(
            "Absent Staff",
            absentStaff,
            setAbsentStaff,
            "border-red-200 bg-red-50",
          )}

          {renderMultiSelectWithDays(
            "Dress Code Violations",
            dressCodeViolations,
            setDressCodeViolations,
            "border-yellow-200 bg-yellow-50",
          )}

          {renderMultiSelect(
            "Expired Licenses",
            expiredLicenses,
            setExpiredLicenses,
            "bg-orange-100 text-orange-700",
          )}

          {renderMultiSelect(
            "Unpaid Salaries",
            unpaidSalaries,
            setUnpaidSalaries,
            "bg-purple-100 text-purple-700",
          )}

          {renderMultiSelect(
            "Expired Contracts",
            expiredContracts,
            setExpiredContracts,
            "bg-pink-100 text-pink-700",
          )}

          {/* NOTES */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Additional Notes
            </label>

            <textarea
              rows={5}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Add extra report notes..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>

      {/* GUIDELINES */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-3xl p-6">
        <h4 className="text-blue-900 font-semibold mb-4">Report Guidelines</h4>

        <ul className="space-y-2 text-blue-700 text-sm">
          <li>• Report submission has only 3 attempts</li>

          <li>• Staff members can appear in multiple categories</li>

          <li>• Reports automatically include current timestamp</li>

          <li>• Click the X button to remove a staff member</li>

          <li>• Reports are submitted only on sunday</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportSubmission;
