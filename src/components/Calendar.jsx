import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "./Header";
import DayCell from "./DayCell";
import eventsData from "../data/events.json";
import AddEventModal from "./AddEventModal";
import Sidebar from "./Sidebar";
import { FiSearch } from "react-icons/fi";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState("month");
  const [dark, setDark] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventDaysOnly, setShowEventDaysOnly] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const [customEvents, setCustomEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(customEvents));
  }, [customEvents]);

  const allEvents = [...eventsData, ...customEvents];

  const filteredEvents = (date) => {
    return allEvents.filter(
      (e) =>
        date &&
        e.date === date.format("YYYY-MM-DD") &&
        (selectedType === "all" || e.type === selectedType) &&
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const changeMonth = (amount) => {
    setCurrentDate(currentDate.add(amount, "month"));
  };

  const changeYear = (year) => {
    setCurrentDate(currentDate.year(year));
  };

  let displayedDays = [];
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  if (viewMode === "month") {
    for (let i = 0; i < startDay; i++) {
      if (!showEventDaysOnly) displayedDays.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      const day = dayjs(currentDate).date(i);
      const hasEvents = filteredEvents(day).length > 0;
      if (!showEventDaysOnly || hasEvents) {
        displayedDays.push(day);
      }
    }
  } else {
    const weekStart = currentDate.startOf("week");
    for (let i = 0; i < 7; i++) {
      const day = weekStart.add(i, "day");
      const hasEvents = filteredEvents(day).length > 0;
      if (!showEventDaysOnly || hasEvents) {
        displayedDays.push(day);
      }
    }
  }

  const deleteEvent = (id) => {
    setCustomEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const editEvent = (event) => {
    setEventToEdit(event);
    setAddEventOpen(true);
  };

  const handleSaveEvent = (newEvent) => {
    setCustomEvents((prev) => {
      const index = prev.findIndex((e) => e.id === newEvent.id);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = newEvent;
        return updated;
      }
      return [...prev, newEvent];
    });
  };

  return (
    <div className={`flex min-h-screen ${dark ? "dark" : ""}`}>
      {/* 📱 Mobile Hamburger */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setShowSidebar(true)}
          className="text-xl bg-gray-200 p-2 rounded dark:bg-gray-700"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        dark={dark}
        setDark={setDark}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        showEventDaysOnly={showEventDaysOnly}
        setShowEventDaysOnly={setShowEventDaysOnly}
        setAddEventOpen={setAddEventOpen}
        onCloseMobile={() => setShowSidebar(false)}
        isMobileOpen={showSidebar}
      />

      {/* Calendar */}
      <main className="flex-1 p-4 overflow-auto bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <div className="flex justify-center mb-4">
          <Header
            date={currentDate}
            onPrev={() => changeMonth(-1)}
            onNext={() => changeMonth(1)}
            onYearChange={changeYear}
          />
        </div>

        {/* 🔍 Search */}
        <div className="relative w-full max-w-md mx-auto mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title..."
            className="w-full pl-10 pr-4 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-2 mt-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          {displayedDays.map((day, index) => (
            <DayCell
              key={index}
              date={day}
              isToday={day?.isSame(dayjs(), "day")}
              events={filteredEvents(day)}
              onClick={(d) => {
                setSelectedDate(d);
                setModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* Event Details Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96">
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">
                  Events on {selectedDate?.format("DD MMM YYYY")}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>

              {filteredEvents(selectedDate).map((e) => (
                <div
                  key={e.id}
                  className="mb-2 text-sm p-2 rounded text-white flex justify-between items-center"
                  style={{ backgroundColor: e.color }}
                >
                  <div>
                    <strong>{e.title}</strong>
                    <br />
                    {e.startTime} – {e.endTime}
                  </div>
                  {customEvents.find((ce) => ce.id === e.id) && (
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={() => editEvent(e)}
                        className="text-xs px-2 py-1 bg-yellow-400 text-black rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEvent(e.id)}
                        className="text-xs px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {filteredEvents(selectedDate).length === 0 && (
                <p className="text-sm text-gray-500">No events.</p>
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {addEventOpen && (
          <AddEventModal
            onClose={() => {
              setAddEventOpen(false);
              setEventToEdit(null);
            }}
            onSave={handleSaveEvent}
            eventToEdit={eventToEdit}
          />
        )}
      </main>
    </div>
  );
}
