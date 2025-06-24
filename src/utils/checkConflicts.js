// src/utils/checkConflicts.js
import dayjs from "dayjs";

export function detectConflicts(events) {
  const conflicts = [];

  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const a = events[i];
      const b = events[j];

      // Only compare events on the same date
      if (a.date !== b.date) continue;

      const startA = dayjs(`${a.date} ${a.startTime}`, "YYYY-MM-DD HH:mm");
      const endA = dayjs(`${a.date} ${a.endTime}`, "YYYY-MM-DD HH:mm");
      const startB = dayjs(`${b.date} ${b.startTime}`, "YYYY-MM-DD HH:mm");
      const endB = dayjs(`${b.date} ${b.endTime}`, "YYYY-MM-DD HH:mm");

      if (startA.isBefore(endB) && startB.isBefore(endA)) {
        conflicts.push([a, b]);
      }
    }
  }

  return conflicts;
}
