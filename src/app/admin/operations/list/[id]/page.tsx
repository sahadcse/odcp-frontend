"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from "@/common/WithAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const AdminDetails = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${baseURL}/api/admins/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the admin details!", error);
      });
  }, [id]);

  interface Admin {
    _id: string;
    admin_id: string;
    name: string;
    email: string;
    password: string;
    profile_picture: string;
    role: string;
    isActive: boolean;
    permissions: {
      manageDoctors: boolean;
      managePatients: boolean;
      manageAppointments: boolean;
      managePrescriptions: boolean;
      managePayments: boolean;
      manageNotifications: boolean;
      manageReports: boolean;
      manageSettings: boolean;
      viewLogs: boolean;
      manageAccountDeletionRequests: boolean;
    };
    logs: any[];
    createdAt: string;
    updatedAt: string;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl text-red-800 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 mb-4">
        {/* Back Button */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition"
          >
            <span>🔙</span> Go Back
          </button>
          <button
            onClick={async () => {
              const token = Cookies.get("token");
              try {
                await axios.delete(`${baseURL}/api/admins/admin/delete/${id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                router.push("/admin/operations/list");
              } catch (error) {
                console.error("There was an error deleting the admin!", error);
              }
            }}
            className="flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
          >
            <span>🗑️</span> Delete Admin
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          { admin.profile_picture ? (
            <img
            src={admin.profile_picture}
            alt={`${admin.name}'s profile`}
            className="w-32 h-32 rounded-full shadow-md"
          />) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
              {admin.name[0]}
            </div>
          )}
        </div>

        {/* Main Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Admin Details
          </h1>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Left Section */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-gray-700">
                Personal Information
              </h2>
              <div className="space-y-3">
                <p className="flex justify-between text-gray-600">
                  <span className="font-medium">Name:</span>
                  <span>{admin.name}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span className="font-medium">Admin ID:</span>
                  <span>{admin.admin_id}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span className="font-medium">Email:</span>
                  <span>{admin.email}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span className="font-medium">Role:</span>
                  <span>{admin.role}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span className="font-medium">Status:</span>
                  <span>{admin.isActive ? "Active" : "Inactive"}</span>
                </p>
                <p className="flex justify-between text-gray-600">
                  <span className="font-medium">Admin ID:</span>
                  <span>{admin._id}</span>
                </p>
              </div>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block w-px bg-gray-300 self-stretch"></div>

            {/* Right Section */}
            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Permissions
              </h3>
              <ul className="grid grid-cols-2 gap-4">
                {Object.entries(admin.permissions).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex justify-between text-gray-600 border p-2 rounded"
                  >
                    <span className="font-medium">{key}:</span>
                    <span>{value ? "Yes" : "No"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Logs</h3>
          {admin.logs.length > 0 ? (
            <ul className="space-y-2">
              {admin.logs.map((log, index) => (
                <li key={index} className="text-gray-600">
                  {log}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No logs available.</p>
          )}
        </div>

        {/* Timestamps Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Timestamps</h3>
          <p className="text-gray-600">
            <span className="font-medium">Created At:</span>{" "}
            {formatDate(admin.createdAt)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Updated At:</span>{" "}
            {formatDate(admin.updatedAt)}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdminDetails,['admin']);
