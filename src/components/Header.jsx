import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsCalendar2Event } from "react-icons/bs";

export default function Header({ date, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <BsCalendar2Event className="text-2xl text-blue-600" />
      <h1 className="text-2xl font-bold">{date.format("MMMM YYYY")}</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={onNext}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
