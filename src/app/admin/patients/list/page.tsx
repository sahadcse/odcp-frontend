'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from '@/common/WithAuth';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const PatientsList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get(`${baseURL}/api/admins/admin/patients/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patients!', error);
      });
  }, []);

  interface Patient {
    patient_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    status: string; // New property
    _id: string;
  }

  const viewPatient = (id: string) => {
    router.push(`/admin/patients/list/${id}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Patients List</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Patient ID</th>
              <th className="py-2 px-4 border border-gray-300">Full Name</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Phone Number</th>
              <th className="py-2 px-4 border border-gray-300">Date of Birth</th>
              <th className="py-2 px-4 border border-gray-300">Gender</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr 
                key={patient.patient_id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} ${patient.status === 'blocked' ? 'bg-red-500' : ''}`}
              >
                <td className="py-2 px-4 border border-gray-300">{patient.patient_id}</td>
                <td className="py-2 px-4 border border-gray-300">{patient.full_name}</td>
                <td className="py-2 px-4 border border-gray-300">{patient.email}</td>
                <td className="py-2 px-4 border border-gray-300">{patient.phone_number}</td>
                <td className="py-2 px-4 border border-gray-300">{formatDate(patient.date_of_birth)}</td>
                <td className="py-2 px-4 border border-gray-300">{patient.gender}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button 
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => viewPatient(patient._id)}
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

export default withAuth(PatientsList,['admin']);
