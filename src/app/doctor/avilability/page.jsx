"use client";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import DoctorLayout from "@/components/DoctorLayout";
import { AvilabilityData } from "@/data/avilabilityData";
import { useEffect, useState } from "react";
import axios from "axios";
import { authHeader } from "@/utils";
import withAuth from "@/common/WithAuth";

const AvailabilityTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startTimeInput, setStartTimeInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");
  const [timeInput, setTimeInput] = useState("");

  const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const getAvilabilityData = async () => {
      try {
        const data = await AvilabilityData();
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    getAvilabilityData();
  }, []);

  const handleDelete = async (availabilityId) => {
    try {
      await axios.delete(
        `${BACKEND_API_URL}/api/users/doctor/availability/${availabilityId}/delete`,
        {
          headers: authHeader(),
        }
      );
      setData(data.filter((item) => item._id !== availabilityId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleEdit = (id) => {
    const item = data.find((item) => item._id === id);
    setCurrentItem({
      ...item,
      time_slots: item.time_slots, // Keep as array
    });
    setStartTimeInput("");
    setEndTimeInput("");
    setShowModal(true);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
    setCurrentItem(null); // Reset for new item
    setStartTimeInput("");
    setEndTimeInput("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === "time_slots" ? value : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentItem._id) {
        // Update existing item with correct format
        const response = await axios.put(
          `${BACKEND_API_URL}/api/users/doctor/availability/${currentItem._id}/update`,
          {
            day: currentItem.day,
            time_slots: Array.isArray(currentItem.time_slots)
              ? currentItem.time_slots
              : currentItem.time_slots.split(",").map((slot) => slot.trim()),
          },
          {
            headers: authHeader(),
          }
        );
        // Update local state with the response data
        setData(response.data);
      } else {
        // Create new item
        const response = await axios.post(
          `${BACKEND_API_URL}/api/users/doctor/availability/create`,
          {
            availability: [
              {
                day: currentItem.day,
                time_slots: currentItem.time_slots
                  .split(",")
                  .map((slot) => slot.trim()),
              },
            ],
          },
          {
            headers: authHeader(),
          }
        );
        // Update local state with the response data
        setData(response.data);
      }
      handleModalToggle();
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleAddTimeSlot = () => {
    if (!startTimeInput || !endTimeInput) return;

    const formattedStartTime = formatTime(startTimeInput);
    const formattedEndTime = formatTime(endTimeInput);
    const timeSlot = `${formattedStartTime} - ${formattedEndTime}`;

    const updatedSlots = currentItem?.time_slots
      ? `${currentItem.time_slots}, ${timeSlot}`
      : timeSlot;

    setCurrentItem((prev) => ({
      ...prev,
      time_slots: updatedSlots,
    }));

    // Clear inputs
    setStartTimeInput("");
    setEndTimeInput("");
  };

  return (
    <DoctorLayout>
      <DashboardHeroNav headName={`Dashboard`} />
      <div className="container mx-auto py-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
          onClick={handleModalToggle}
        >
          Add New
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-1/2 lg:w-1/3">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {currentItem?._id ? "Edit Schedule" : "Add New Schedule"}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Day */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Select Day
                  </label>
                  <select
                    name="day"
                    value={currentItem?.day || ""}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a day</option>
                    {[
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Time Slots */}
                <div className="space-y-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Time Slots
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(Array.isArray(currentItem?.time_slots)
                      ? currentItem?.time_slots
                      : currentItem?.time_slots?.split(",")
                    )?.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-100 px-3 py-1 rounded-full"
                      >
                        <span className="mr-2">{slot.trim()}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newSlots = Array.isArray(
                              currentItem.time_slots
                            )
                              ? currentItem.time_slots.filter(
                                  (_, i) => i !== index
                                )
                              : currentItem.time_slots
                                  .split(",")
                                  .filter((_, i) => i !== index)
                                  .join(", ");
                            setCurrentItem((prev) => ({
                              ...prev,
                              time_slots: newSlots,
                            }));
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={startTimeInput}
                        onChange={(e) => setStartTimeInput(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={endTimeInput}
                        onChange={(e) => setEndTimeInput(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddTimeSlot}
                      disabled={!startTimeInput || !endTimeInput}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md mt-6 disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Enter time and click Add to create a slot. Click on a slot
                    to remove it.
                  </p>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={handleModalToggle}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
                    disabled={
                      loading || !currentItem?.day || !currentItem?.time_slots
                    }
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Schedule"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Till now all okay */}

        {/* Table */}
        {/* Table for Large Screens */}
        <div className="hidden sm:block overflow-x-auto shadow rounded-lg bg-white p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2 text-left">Sl</th>
                <th className="border px-4 py-2 text-left">Day</th>
                <th className="border px-4 py-2 text-left">Time Slots</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.day}</td>
                  <td className="border px-4 py-2">
                    {item.time_slots?.join(", ")}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Layout for Small Screens */}
        <div className="sm:hidden space-y-4">
          {data.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white shadow rounded-lg p-4"
            >
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Sl:</span> {index + 1}
                </div>
                <div>
                  <span className="font-semibold">Day:</span> {item.day}
                </div>
                <div>
                  <span className="font-semibold">Time Slots:</span>{" "}
                  {item.time_slots?.join(", ")}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded flex-1"
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded flex-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default withAuth(AvailabilityTable, ["doctor"]);
