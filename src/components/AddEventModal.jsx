import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function AddEventModal({ onClose, onSave, eventToEdit }) {
  const isEdit = Boolean(eventToEdit);

  const [form, setForm] = useState({
    id: null,
    title: "",
    date: dayjs().format("YYYY-MM-DD"),
    startTime: "09:00",
    endTime: "10:00",
    type: "meeting",
    color: "#3b82f6",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) setForm(eventToEdit);
  }, [eventToEdit]);

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    onSave({ ...form, id: isEdit ? form.id : Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md transition-all scale-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {isEdit ? "✏️ Edit Event" : "➕ Add New Event"}
        </h2>

        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-100">
          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />

          <div className="flex gap-2">
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            />
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="meeting">📅 Meeting</option>
            <option value="personal">🏠 Personal</option>
            <option value="task">✅ Task</option>
          </select>

          <div className="flex items-center gap-2">
            <span>Pick Color:</span>
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="w-10 h-8 border-none bg-transparent cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
