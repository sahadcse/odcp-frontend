"use client";
import React, { useEffect, useState } from "react";
import PatientLayout from "@/components/Patient/PatientLayout";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Appointment {
  _id: string;
  appointment_date: string;
  time_slot: string;
  doctor_id: string;
  status: string;
}

interface Doctor {
  full_name: string;
  // ...other doctor details...
}

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<{ [key: string]: Doctor }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseURL}/api/users/patient/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);

        // Fetch doctor details for each appointment
        const doctorPromises = response.data.map((appointment: Appointment) =>
          axios.get(
            `${baseURL}/api/users/patient/appointments/${appointment._id}/doctor`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );
        const doctorResponses = await Promise.all(doctorPromises);
        const doctorData = doctorResponses.reduce((acc, res, index) => {
          acc[response.data[index]._id] = res.data;
          return acc;
        }, {});
        setDoctors(doctorData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const viewAppointment = (id: string) => {
    localStorage.setItem("doctor", JSON.stringify(doctors[id]));
    router.push(`/patient/appointments/view/${id}`);
  };

  return (
    <PatientLayout>
      <div className="container mx-auto p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          My Appointments
        </h1>

        {/* Table Container */}
        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Time Slot
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Doctor
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  {/* Date */}
                    <td className="py-3 px-6 text-sm text-gray-800">
                    <div className="flex items-center">
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                      {new Date(appointment.appointment_date).toDateString() === new Date().toDateString() ? (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Today
                      </span>
                      ) : new Date(appointment.appointment_date) < new Date() ? (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Past
                      </span>
                      ) : (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Incoming
                      </span>
                      )}
                    </div>
                    </td>

                  {/* Time Slot */}
                  <td className="py-3 px-6 text-sm text-gray-800">
                    {appointment.time_slot}
                  </td>

                  {/* Doctor */}
                  <td className="py-3 px-6 text-sm text-gray-800">
                    {doctors[appointment._id]?.full_name || "N/A"}
                  </td>

                  {/* Status */}
                  <td
                    className={`py-3 px-6 text-sm font-medium ${
                      appointment.status === "Pending"
                        ? "text-yellow-500"
                        : appointment.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {appointment.status}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-6">
                    <button
                      className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
                      onClick={() => viewAppointment(appointment._id)}
                    >
                      View Appointment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PatientLayout>
  );
};

export default AppointmentsPage;
