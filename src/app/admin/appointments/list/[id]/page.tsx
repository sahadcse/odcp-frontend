"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from "@/common/WithAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;


const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${baseURL}/api/admins/admin/appointments/${id}/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAppointment(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the appointment details!", error);
      });
  }, [id]);

  const handleDelete = () => {
    const token = Cookies.get("token");
    axios
      .delete(`${baseURL}/api/admins/admin/appointments/${id}/cancel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.error("There was an error deleting the appointment!", error);
      });
  };

  interface Appointment {
    _id: string;
    consultation_type: string;
    appointment_date: string;
    start_time: string;
    end_time: string;
    status: string;
    reason_for_visit: string;
    booking_fee: number;
    payment_status: string;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!appointment) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl text-red-800 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 mb-4">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition"
          >
            <span>🔙</span> Go Back
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
          >
            <span>🗑️</span> Delete Appointment
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
            Appointment Details
          </h1>

          <div className="bg-white p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p>
                  <span className="text-gray-600">ID:</span> {appointment._id}
                </p>
                <p>
                  <span className="text-gray-600">Consultation Type:</span> {appointment.consultation_type}
                </p>
                <p>
                  <span className="text-gray-600">Appointment Date:</span> {formatDate(appointment.appointment_date)}
                </p>
                <p>
                  <span className="text-gray-600">Start Time:</span> {appointment.start_time}
                </p>
                <p>
                  <span className="text-gray-600">End Time:</span> {appointment.end_time}
                </p>
                <p>
                  <span className="text-gray-600">Status:</span> {appointment.status}
                </p>
              </div>
              <div>
                <p>
                  <span className="text-gray-600">Reason for Visit:</span> {appointment.reason_for_visit}
                </p>
                <p>
                  <span className="text-gray-600">Booking Fee:</span> ${appointment.booking_fee}
                </p>
                <p>
                  <span className="text-gray-600">Payment Status:</span> {appointment.payment_status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AppointmentDetails,['admin']);
