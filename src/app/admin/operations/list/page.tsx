'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from '@/common/WithAuth';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const AdminsList = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get(`${baseURL}/api/admins/admin/get_all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the admins!', error);
      });
  }, []);

  interface Admin {
    admin_id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    _id: string;
  }

  const viewAdmin = (id: string) => {
    router.push(`/admin/operations/list/${id}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admins List</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Admin ID</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Role</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.admin_id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                <td className="py-2 px-4 border border-gray-300">{admin.admin_id}</td>
                <td className="py-2 px-4 border border-gray-300">{admin.name}</td>
                <td className="py-2 px-4 border border-gray-300">{admin.email}</td>
                <td className="py-2 px-4 border border-gray-300">{admin.role}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button 
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => viewAdmin(admin._id)}
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

export default withAuth(AdminsList,['admin']);
