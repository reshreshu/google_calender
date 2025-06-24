import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsCalendar2Event } from "react-icons/bs";

export default function Header({ date, onPrev, onNext, onYearChange }) {
  const currentYear = date.year();

  // Year dropdown range
  const years = [];
  for (let y = 2020; y <= 2030; y++) {
    years.push(y);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2 bg-white dark:bg-gray-800 shadow rounded-md w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <BsCalendar2Event className="text-2xl text-blue-600" />
        <h1 className="text-xl font-bold">{date.format("MMMM")}</h1>
        <select
          value={currentYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="p-1 px-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={onNext}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
