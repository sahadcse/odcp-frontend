"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from "@/common/WithAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const ConsultationsList = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${baseURL}/api/admins/admin/consultations/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setConsultations(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the consultations!", error);
      });
  }, []);

  interface Consultation {
    _id: string;
    consultation_date: string;
    start_time: string;
    status: string;
    issues: string;
    consultation_fee: number;
    payment_status: string;
  }

  const viewConsultation = (id: string) => {
    router.push(`/admin/consultations/list/${id}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Consultations List</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">
                Consultation Date
              </th>
              <th className="py-2 px-4 border border-gray-300">Start Time</th>
              <th className="py-2 px-4 border border-gray-300">Status</th>
              <th className="py-2 px-4 border border-gray-300">Issues</th>
              <th className="py-2 px-4 border border-gray-300">
                Consultation Fee
              </th>
              <th className="py-2 px-4 border border-gray-300">
                Payment Status
              </th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
              <tbody>
              {consultations.map((consultation, index) => (
                <tr
                key={consultation._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                <td className="py-2 px-4 border border-gray-300">
                  {consultation._id}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {new Date(consultation.consultation_date)
                  .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  })
                  .replace(/ /g, "-")}
                </td>
                <td className="py-2 px-4 border border-gray-300 ">
                  {consultation.start_time}
                </td>
                <td className={`py-2 px-4 border border-gray-300 ${consultation?.status === "Cancelled" ? "text-red-500" : ""}`}>
                  {consultation.status}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {consultation.issues}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {consultation.consultation_fee}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {consultation.payment_status}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                  onClick={() => viewConsultation(consultation._id)}
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

export default withAuth(ConsultationsList,['admin']);
