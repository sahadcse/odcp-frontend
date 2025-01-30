"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/components/Admin/AdminLayout";
import Cookies from "js-cookie";
import withAuth from "@/common/WithAuth";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Doctor {
  userId: string;
  userName: string;
  createdAt: string;
  reason: string;
  status: string;
  updatedAt: string;
  userTypeId: string;
}

interface DeletionRequest {
  userModel: string;
  createdAt: string;
  reason: string;
  status: string;
  updatedAt: string;
  userTypeId: string;
  // other fields if necessary
}

const DeleteDoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const token = Cookies.get('token');
    // Fetch delete requests for doctors
    axios
      .get(`${baseURL}/api/admins/admin/getaccount/deletion`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const doctorRequests: Doctor[] = response.data.filter(
          (request: DeletionRequest) => request.userModel === "Doctor"
        );
        setDoctors(doctorRequests);
      })
      .catch((error) => {
        console.error("Error fetching doctor delete requests:", error);
      });
  }, []);

  const handleDelete = (userId: string, status: string): void => {
    const token = Cookies.get('token');
    axios
      .delete(`${baseURL}/api/admins/admin/doctors/${userId}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { status }
      })
      .then((response) => {
        setDoctors(doctors.filter((doctor) => doctor.userId !== userId));
      })
      .catch((error) => {
        console.error("Error deleting doctor:", error);
      });
  };

  return (
    <AdminLayout>
      <div className="p-5">
        <h1 className="text-2xl mb-5">Delete Doctor Requests</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="py-2 px-4 border border-gray-300">User Type ID</th>
              <th className="py-2 px-4 border border-gray-300">Status</th>
              <th className="py-2 px-4 border border-gray-300">Reason</th>
              <th className="py-2 px-4 border border-gray-300">Created At</th>
              <th className="py-2 px-4 border border-gray-300">Doctor ID</th>
              <th className="py-2 px-4 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.userId} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-4 border border-gray-300">{doctor.userTypeId}</td>
                <td className="py-2 px-4 border border-gray-300">{doctor.status}</td>
                <td className="py-2 px-4 border border-gray-300">{doctor.reason}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {new Date(doctor.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/ /g, '-')}
                </td>
                <td className="py-2 px-4 border border-gray-300">{doctor.userId}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {doctor.status === 'pending' ? (
                    <>
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700 mr-2"
                        onClick={() => handleDelete(doctor.userId, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                        onClick={() => handleDelete(doctor.userId, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-primary">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default withAuth(DeleteDoctorPage, ['admin']);
