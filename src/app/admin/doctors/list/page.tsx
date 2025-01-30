'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from '@/common/WithAuth';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const DoctorsList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get(`${baseURL}/api/admins/admin/doctors/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the doctors!', error);
      });
  }, []);

  interface Doctor {
    doctor_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    specialization: string;
    status: string; // New property
    _id: string;
  }

  const viewDoctor = (id: string) => {
    router.push(`/admin/doctors/list/${id}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Doctors List</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Doctor ID</th>
              <th className="py-2 px-4 border border-gray-300">Full Name</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Phone Number</th>
              <th className="py-2 px-4 border border-gray-300">Specialization</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr 
                key={doctor.doctor_id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} ${doctor.status === 'blocked' ? 'bg-red-500' : ''}`}
              >
                <td className="py-2 px-4 border border-gray-300">{doctor.doctor_id}</td>
                <td className="py-2 px-4 border border-gray-300">{doctor.full_name}</td>
                <td className="py-2 px-4 border border-gray-300">{doctor.email}</td>
                <td className="py-2 px-4 border border-gray-300">{doctor.phone_number}</td>
                <td className="py-2 px-4 border border-gray-300">{doctor.specialization}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button 
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => viewDoctor(doctor._id)}
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

export default withAuth(DoctorsList,['admin']);
