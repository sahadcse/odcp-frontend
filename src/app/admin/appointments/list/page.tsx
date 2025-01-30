'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from '@/common/WithAuth';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get(`${baseURL}/api/admins/admin/appointments/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the appointments!', error);
      });
  }, []);

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

  const viewAppointment = (id: string) => {
    router.push(`/admin/appointments/list/${id}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Appointments List</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">Consultation Type</th>
              <th className="py-2 px-4 border border-gray-300">Appointment Date</th>
              <th className="py-2 px-4 border border-gray-300">Status</th>
              <th className="py-2 px-4 border border-gray-300">Booking Fee</th>
              <th className="py-2 px-4 border border-gray-300">Payment Status</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr 
                key={appointment._id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} ${appointment.status === 'Cancelled' ? 'bg-red-500' : ''}`}
              >
                <td className="py-2 px-4 border border-gray-300">{appointment._id}</td>
                <td className="py-2 px-4 border border-gray-300">{appointment.consultation_type}</td>
                <td className="py-2 px-4 border border-gray-300">
                {new Date(appointment.appointment_date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }).replace(/ /g, '-')}</td>
                <td className="py-2 px-4 border border-gray-300">{appointment.status}</td>
                <td className="py-2 px-4 border border-gray-300">{appointment.booking_fee}</td>
                <td className="py-2 px-4 border border-gray-300">{appointment.payment_status}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button 
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => viewAppointment(appointment._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AppointmentsList,['admin']);
