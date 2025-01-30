"use client";
import React, { useEffect, useState } from "react";
import PatientLayout from "@/components/Patient/PatientLayout";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Appointment {
  appointment_date: string;
  time_slot: string;
  doctor_id: string;
  status: string;
  reason_for_visit: string;
  booking_fee: number;
  payment_status: string;
  created_at: string;
}

const AppointmentPage = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [doctor, setDoctor] = useState<{
    full_name: string;
    specialization: string;
    profile_picture_url?: string;
    availability: {
      day:
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday";
      time_slots: string[];
    }[];
  }>({ full_name: "", specialization: "", availability: [] });
  const router = useRouter();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseURL}/api/users/patient/appointments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointment(response.data);
        // Fetch doctor availability
        const doctorResponse = await axios.get(
          `${baseURL}/api/users/patient/appointments/${id}/doctor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctor(doctorResponse.data);
        console.log(doctorResponse.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  // Map days to their numeric values
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Get available day numbers from doctor availability
  const availableDays: number[] = doctor.availability.map(
    (slot: { day: keyof typeof dayMap; time_slots: string[] }) =>
      dayMap[slot.day]
  );

  const isDateAvailable = (date: Date): boolean => {
    const day: number = date.getDay(); // Get numeric day (0-6)
    return availableDays.includes(day); // Return true if the day is available
  };

  const cancelAppointment = async () => {
    try {
      const token = Cookies.get("token");
      await axios.put(
        `${baseURL}/api/users/patient/appointments/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/patient/appointments/view");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const rescheduleAppointment = async () => {
    try {
      const token = Cookies.get("token");
      await axios.patch(
        `${baseURL}/api/users/patient/appointments/${id}/reschedule`,
        {
          appointment_date: selectedDate
            ? selectedDate.toISOString().split("T")[0]
            : "",
          time_slot: newTimeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/patient/appointments/view");
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "time_slot") {
      setNewTimeSlot(value);
    }
  };

  if (!appointment) return <div>Loading...</div>;

  return (
    <PatientLayout>
      <div className=" mx-auto p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Appointment Details
        </h1>

        {/* Actions */}
        <div className="flex justify-between mb-6">
          {/* Go Back */}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => router.push("/patient/appointments/view")}
          >
            Go Back
          </button>

          {/* Cancel Appointment */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={cancelAppointment}
          >
            Cancel Appointment
          </button>
        </div>

        {/* Appointment Card */}
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded shadow-lg border border-gray-200 w-[75%]">
            <div className="flex">
              {/* Appointment Information */}
              <div className="space-y-2 text-gray-800 w-1/2">
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(appointment.appointment_date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Time Slot:</span>{" "}
                  {appointment.time_slot}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {appointment.status}
                </p>
                <p>
                  <span className="font-medium">Reason for Visit:</span>{" "}
                  {appointment.reason_for_visit}
                </p>
                <p>
                  <span className="font-medium">Booking Fee:</span>{" "}
                  {appointment.booking_fee}
                </p>
                <p>
                  <span className="font-medium">Payment Status:</span>{" "}
                  {appointment.payment_status}
                </p>
              </div>

              {/* Doctor Information */}
              <div className="">
                <h2 className="text-lg font-bold text-gray-900">
                  Doctor Details
                </h2>
                {doctor?.profile_picture_url ? (
                  <img
                    src={doctor.profile_picture_url}
                    alt="Doctor"
                    className="w-24 h-24 rounded-lg mt-2 mb-1"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 mt-2 mb-1 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <p className="text-gray-800 font-bold">
                  Name: {doctor?.full_name || "N/A"}
                </p>
                <p className="text-gray-800">
                  Specialization: {doctor?.specialization || "N/A"}
                </p>
              </div>
            </div>

            {/* Reschedule Section */}
            {appointment.status === "Pending" && (
              <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  {/* Appointment Date */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        handleInputChange({
                          target: {
                            name: "appointment_date",
                            value: date ? date.toISOString().split("T")[0] : "",
                          },
                        } as React.ChangeEvent<HTMLInputElement>);
                      }}
                      filterDate={isDateAvailable}
                      minDate={new Date()}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500"
                      placeholderText="Select a date"
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Slot
                    </label>
                    <select
                      name="time_slot"
                      value={newTimeSlot}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500"
                    >
                      {doctor.availability.map(
                        (slot: { day: string; time_slots: string[] }) => (
                          <optgroup key={slot.day} label={slot.day}>
                            {slot.time_slots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </optgroup>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* Reschedule Button */}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
                  onClick={rescheduleAppointment}
                >
                  Reschedule Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default AppointmentPage;
