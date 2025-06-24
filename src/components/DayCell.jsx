import React from "react";
import dayjs from "dayjs";

export default function DayCell({ date, isToday, events, onClick }) {
  const hasConflict = () => {
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const a = events[i];
        const b = events[j];
        const aStart = dayjs(`${a.date} ${a.startTime}`);
        const aEnd = dayjs(`${a.date} ${a.endTime}`);
        const bStart = dayjs(`${b.date} ${b.startTime}`);
        const bEnd = dayjs(`${b.date} ${b.endTime}`);
        if (aStart.isBefore(bEnd) && bStart.isBefore(aEnd)) return true;
      }
    }
    return false;
  };

  const conflict = hasConflict();

  return (
    <div
      onClick={() => date && onClick(date)}
      className={`h-32 border p-1 rounded-md relative cursor-pointer transition-all
        ${isToday ? "bg-blue-200 border-2 border-blue-600 shadow-lg scale-[1.02]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}
      `}
      aria-label={date ? `Day ${date.format("DD MMM YYYY")}` : "Empty day"}
    >
      {/* Day Number */}
      <div className="text-sm font-semibold text-right text-gray-500 dark:text-gray-300">
        {date ? date.date() : ""}
      </div>

      {/* Event List */}
      <div className="mt-1 space-y-1 text-[11px] overflow-y-auto max-h-[70px] scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 pr-1">
        {events.slice(0, 3).map((event, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: event.color }}
            className="text-white px-1 py-[1px] rounded shadow-sm truncate"
          >
            {event.title} ({event.startTime}–{event.endTime})
          </div>
        ))}
      </div>

      {/* Conflict Warning */}
      {conflict && (
        <div className="text-[10px] text-red-500 mt-1 absolute bottom-4 left-1">
          ⚠ Overlapping
        </div>
      )}

      {/* "+x more" if overflow */}
      {events.length > 3 && (
        <div className="text-[10px] text-blue-500 text-right absolute bottom-1 right-1">
          +{events.length - 3} more
        </div>
      )}
    </div>
  );
}
