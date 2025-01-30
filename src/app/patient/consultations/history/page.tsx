"use client";
import React, { useEffect, useState } from "react";
import PatientLayout from "@/components/Patient/PatientLayout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Consultation {
  _id: number;
  title: string;
  date: string;
  description: string;
  status: string;
  consultation_fee: number;
  payment_status: string;
  issues: string;
  consultation_date: string;
  start_time: string;
}

const ConsultationsPage = () => {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseURL}/api/users/patient/consultations/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Consultations:", response.data);
        setConsultations(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError("Consultations not found.");
        } else {
          console.error("Error fetching consultations:", error);
          setError("An error occurred while fetching consultations.");
        }
      }
    };

    fetchConsultations();
  }, []);

  return (
    <PatientLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Consultations</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {error ? (
            <p>{error}</p>
          ) : consultations.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Status</th>

                  <th className="py-2 px-4 border-b text-left">
                    Payment
                  </th>
                  <th className="py-2 px-4 border-b text-left">Issues</th>
                  <th className="py-2 px-4 border-b text-left">
                    Date
                  </th>
                  <th className="py-2 px-4 border-b text-left">Time</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((consultation, index) => (
                  <tr key={`${consultation._id}-${index}`} className="border-b">
                    <td className="py-2 px-4">{consultation.status}</td>
                    <td className="py-2 px-4">{consultation.payment_status}</td>
                    <td className="py-2 px-4">{consultation.issues}</td>
                    <td className="py-2 px-4">
                      {new Date(consultation.consultation_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                      })}
                      <button className={`ml-2 px-2 py-1 rounded text-xs ${
                      new Date(consultation.consultation_date) < new Date() 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                      }`}>
                      {new Date(consultation.consultation_date) < new Date() 
                      ? 'Past' 
                      : 'Upcoming'}
                      </button>
                    </td>
                    <td className="py-2 px-4">{consultation.start_time}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => router.push(`/patient/consultations/history/${consultation._id}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No consultations found.</p>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default ConsultationsPage;
