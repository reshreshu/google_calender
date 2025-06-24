import React from "react";
import dayjs from "dayjs";

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
  setAddEventOpen
}) {
  const today = dayjs();
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = [];

  for (let i = 1; i <= endOfMonth.date(); i++) {
    daysInMonth.push(startOfMonth.date(i));
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex flex-col gap-6">
      {/* 🗓️ Mini Calendar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))} className="text-sm px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            Prev
          </button>
          <h2 className="font-semibold">{currentDate.format("MMMM YYYY")}</h2>
          <button onClick={() => setCurrentDate(currentDate.add(1, "month"))} className="text-sm px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            Next
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-500 dark:text-gray-300">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center text-xs mt-1 gap-1">
          {Array(startOfMonth.day()).fill("").map((_, i) => (
            <div key={i}></div>
          ))}
          {daysInMonth.map((day, i) => (
            <div
              key={i}
              className={`p-1 rounded-full cursor-pointer ${
                day.isSame(today, "day")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setCurrentDate(day)}
            >
              {day.date()}
            </div>
          ))}
        </div>
      </div>

      {/* 🎛️ Filters & Controls */}
      <div className="flex flex-col gap-3 text-sm">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All</option>
          <option value="meeting">Meetings</option>
          <option value="personal">Personal</option>
          <option value="task">Task</option>
        </select>

        <button
          onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          Switch to {viewMode === "month" ? "Week" : "Month"} View
        </button>

        <button
          onClick={() => setShowEventDaysOnly(!showEventDaysOnly)}
          className="px-3 py-2 bg-purple-200 dark:bg-purple-700 rounded"
        >
          {showEventDaysOnly ? "Show All Days" : "Show Event Days Only"}
        </button>

        <button
          onClick={() => setAddEventOpen(true)}
          className="px-3 py-2 bg-green-500 text-white rounded"
        >
          ➕ Add Event
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded"
        >
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </aside>
  );
}
