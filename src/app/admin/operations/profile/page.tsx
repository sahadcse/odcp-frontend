"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from "@/common/WithAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const ProfilePage = () => {
  const [adminData, setAdminData] = useState<any>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const fetchAdminData = async () => {
    const adminCookie = Cookies.get("admin");
    const adminGet = adminCookie ? JSON.parse(adminCookie) : null;

    if (!adminGet || !adminGet.admin) {
      console.error("Admin data is missing");
      return;
    }

    const token = Cookies.get("token"); // Assuming the token is stored in a cookie named "token"
    try {
      const response = await axios.get(`${baseURL}/api/admins/admin/${adminGet.admin._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
      setAdminData(response.data.admin);
      setIsSuperAdmin(response.data.admin && response.data.admin.role === "superadmin");
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    const adminCookie = Cookies.get("admin");
    const adminGet = adminCookie ? JSON.parse(adminCookie) : null;

    if (!adminGet || !adminGet.admin) {
      console.error("Admin data is missing");
      return;
    }

    const token = Cookies.get("token");
    axios
      .get(`${baseURL}/api/admins/admin/${adminGet.admin._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdminData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the admin details!", error);
      });
  }, []);

  if (!adminData) {
    return <p>Loading...</p>;
  }

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    const token = Cookies.get("token"); // Assuming the token is stored in a cookie named "token"

    try {
      const formData = new FormData();
      formData.append('profile_picture', file);

      const response = await fetch(`${baseURL}/api/admins/admin/update/${adminData._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      await fetchAdminData(); // Fetch the updated admin data after successful upload
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center mt-4">
        <img
          src={adminData.profile_picture}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border border-gray-300"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="ml-4"
        />
      </div>

      <div className="w-[80%] mx-auto p-4 bg-white shadow rounded-lg border border-red-500 mt-4">
        <h1 className="text-xl font-bold mb-4 border-b pb-2">
          Profile Details
        </h1>

        <div className="flex gap-4 justify-center items-start">
          {/* Personal Information Section */}
          <div className="w-1/3 gap-2 flex flex-col">
            <h2 className="text-sm font-bold">Personal Information</h2>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Name</label>
              <p className="px-3 py-1 border rounded w-48 text-sm text-end">
                {adminData.name}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Email</label>
              <p className="px-3 py-1 border rounded w-48 text-sm text-end">
                {adminData.email}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Role</label>
              <p className="px-3 py-1 border rounded w-48 text-sm text-end">
                {adminData.role}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Admin ID:</label>
              <p className="px-3 py-1 border rounded w-48 text-sm text-end">
                {adminData.admin_id}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Active</label>
              <p className="px-3 py-1 border rounded w-48 text-sm text-end">
                {adminData.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-px bg-red-300 self-stretch"></div>

          {/* Permissions Section */}
          <div className="w-2/3">
            <h2 className="text-sm font-bold">Permissions</h2>
            <ul className="grid grid-cols-2 gap-2 mt-2">
              {Object.keys(adminData.permissions).map((permission) => (
                <li
                  key={permission}
                  className="flex justify-between px-3 py-1 border rounded text-sm"
                >
                  <span>{permission}</span>
                  <span>
                    {adminData.permissions[permission] ? "Yes" : "No"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(ProfilePage,['admin']);
