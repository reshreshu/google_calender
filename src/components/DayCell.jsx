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
      className={`border rounded-lg p-2 h-36 flex flex-col justify-start overflow-hidden hover:ring-2 hover:ring-blue-400 cursor-pointer transition-all shadow-sm ${
        isToday ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="text-sm font-semibold text-right text-gray-500 dark:text-gray-300">
        {date ? date.date() : ""}
      </div>

      <div className="mt-1 space-y-1 text-[11px] overflow-y-auto scrollbar-thin pr-1">
        {events.slice(0, 3).map((event, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: event.color }}
            className="text-white px-1 py-[1px] rounded shadow-sm"
          >
            {event.title} ({event.startTime}-{event.endTime})
          </div>
        ))}
      </div>

      {conflict && (
        <div className="text-[10px] text-red-500 mt-auto">⚠ Overlapping</div>
      )}

      {events.length > 3 && (
        <div className="text-[10px] text-blue-500 text-right mt-auto">
          +{events.length - 3} more
        </div>
      )}
    </div>
  );
}
