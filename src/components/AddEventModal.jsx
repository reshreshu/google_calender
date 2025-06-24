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

  useEffect(() => {
    if (isEdit) setForm(eventToEdit);
  }, [eventToEdit]);

  const handleSubmit = () => {
    if (!form.title) return;
    onSave({ ...form, id: isEdit ? form.id : Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-4">{isEdit ? "Edit Event" : "Add Event"}</h2>
        <div className="space-y-3 text-sm">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <div className="flex gap-2">
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className="w-full p-2 rounded border dark:bg-gray-700"
            />
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="w-full p-2 rounded border dark:bg-gray-700"
            />
          </div>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-2 rounded border dark:bg-gray-700"
          >
            <option value="meeting">Meeting</option>
            <option value="personal">Personal</option>
            <option value="task">Task</option>
          </select>
          <input
            type="color"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            className="w-full h-10"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={onClose} className="px-3 py-1 bg-gray-400 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-500 text-white rounded">
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
