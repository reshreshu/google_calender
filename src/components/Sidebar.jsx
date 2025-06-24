import React from "react";
import dayjs from "dayjs";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function Sidebar({
  dark,
  setDark,
  currentDate,
  setCurrentDate,
  viewMode,
  setViewMode,
  selectedType,
  setSelectedType,
  showEventDaysOnly,
  setShowEventDaysOnly,
  setAddEventOpen,
  onCloseMobile,
  isMobileOpen,
}) {
  const today = dayjs();
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = [];

  for (let i = 1; i <= endOfMonth.date(); i++) {
    daysInMonth.push(startOfMonth.date(i));
  }

  return (
    <aside
      className={`w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex flex-col gap-8
        fixed sm:static top-0 left-0 h-full z-50 shadow-lg transition-transform
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:block`}
    >
      {/* 🛑 Close icon only on mobile */}
      <div className="flex justify-end sm:hidden mb-2">
        <button
          onClick={onCloseMobile}
          className="text-gray-700 dark:text-gray-200 text-lg"
        >
          <FiX />
        </button>
      </div>

      {/* 🗓️ Mini Calendar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
            className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <FiChevronLeft />
          </button>
          <h2 className="font-semibold text-center text-gray-700 dark:text-gray-200">
            {currentDate.format("MMMM YYYY")}
          </h2>
          <button
            onClick={() => setCurrentDate(currentDate.add(1, "month"))}
            className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={`${d}-${i}`}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs text-center">
          {Array(startOfMonth.day())
            .fill("")
            .map((_, i) => (
              <div key={`empty-${i}`}></div>
            ))}
          {daysInMonth.map((day) => (
            <div
              key={day.format("YYYY-MM-DD")}
              onClick={() => setCurrentDate(day)}
              className={`p-2 rounded-full cursor-pointer transition-colors ${
                day.isSame(today, "day")
                  ? "bg-blue-600 text-white font-bold"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
              }`}
            >
              {day.date()}
            </div>
          ))}
        </div>
      </div>

      {/* 🎛️ Controls */}
      <div className="flex flex-col gap-4 text-sm">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Types</option>
          <option value="meeting">Meetings</option>
          <option value="personal">Personal</option>
          <option value="task">Tasks</option>
        </select>

        <button
          onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        >
          Switch to {viewMode === "month" ? "Week" : "Month"} View
        </button>

        <button
          onClick={() => setShowEventDaysOnly(!showEventDaysOnly)}
          className="px-3 py-2 bg-purple-100 dark:bg-purple-700 text-purple-900 dark:text-white hover:bg-purple-200 dark:hover:bg-purple-600 rounded"
        >
          {showEventDaysOnly ? "Show All Days" : "Show Event Days Only"}
        </button>

        <button
          onClick={() => setAddEventOpen(true)}
          className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          ➕ Add Event
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded"
        >
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </aside>
  );
}
