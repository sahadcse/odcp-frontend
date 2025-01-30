"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AdminLayout from "@/components/Admin/AdminLayout";
import ToastMessage from "@/components/Admin/ToastMessage";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type Permissions = {
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

const RegisterAdminPage = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    permissions: {
      manageDoctors: false,
      managePatients: false,
      manageAppointments: false,
      managePrescriptions: false,
      managePayments: false,
      manageNotifications: false,
      manageReports: false,
      manageSettings: false,
      viewLogs: false,
      manageAccountDeletionRequests: false,
    },
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchAdminData = () => {
    const adminCookie = Cookies.get('admin');
    const adminGet = adminCookie ? JSON.parse(adminCookie) : null;

    if (!adminGet || !adminGet.admin) {
      console.error("Admin data is missing");
      return;
    }

    setIsSuperAdmin(adminGet.admin.role === "superadmin");
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        permissions: {
          ...formData.permissions,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");
    axios
      .post(`${baseURL}/api/admins/admin/register`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setToastMessage("Admin registered successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "admin",
          permissions: {
            manageDoctors: false,
            managePatients: false,
            manageAppointments: false,
            managePrescriptions: false,
            managePayments: false,
            manageNotifications: false,
            manageReports: false,
            manageSettings: false,
            viewLogs: false,
            manageAccountDeletionRequests: false,
          },
        });
      })
      .catch((error) => {
        console.error("Error registering admin:", error);
      });
  };

  return (
    <AdminLayout>
      {!isSuperAdmin ? (
        <p className="text-red-500">You're not eligible to register</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Permissions</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            {Object.keys(formData.permissions).map((permission) => (
              <label key={permission} className="block text-gray-700">
                <input
                  type="checkbox"
                  name={permission}
                  checked={formData.permissions[permission as keyof Permissions]}
                  onChange={handleChange}
                  className="mr-2"
                />
                {permission}
              </label>
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Register ADMIN
          </button>
        </form>
      )}
      {toastMessage && <ToastMessage message={toastMessage} onClose={() => setToastMessage(null)} />}
    </AdminLayout>
  );
};

export default RegisterAdminPage;
