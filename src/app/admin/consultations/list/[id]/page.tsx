"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from "@/common/WithAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const ConsultationDetails = () => {
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${baseURL}/api/admins/admin/consultations/${id}/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setConsultation(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the consultation details!", error);
      });
  }, [id]);

  interface Consultation {
    _id: string;
    appointment_id: string;
    patient_id: string;
    doctor_id: string;
    consultation_date: string;
    start_time: string;
    end_time: string;
    status: string;
    issues: string;
    consultation_fee: number;
    payment_status: string;
    medical_reports: string[];
    created_at: string;
    __v: number;
    prescription: string;
    medications: string;
    advice: string;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getValue = (value: any) => {
    return value ? value : "N/A";
  };

  if (!consultation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl text-red-800 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 mb-4">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition"
          >
            <span>🔙</span> Go Back
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
            Consultation Details
          </h1>

          <div className="bg-white p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p>
                  <span className="text-gray-600">ID:</span> {getValue(consultation._id)}
                </p>
                <p>
                  <span className="text-gray-600">Appointment ID:</span> {getValue(consultation.appointment_id)}
                </p>
                <p>
                  <span className="text-gray-600">Patient ID:</span> {getValue(consultation.patient_id)}
                </p>
                <p>
                  <span className="text-gray-600">Doctor ID:</span> {getValue(consultation.doctor_id)}
                </p>
                <p>
                  <span className="text-gray-600">Consultation Date:</span> {getValue(formatDate(consultation.consultation_date))}
                </p>
                <p>
                  <span className="text-gray-600">Start Time:</span> {getValue(consultation.start_time)}
                </p>
                <p>
                  <span className="text-gray-600">End Time:</span> {getValue(consultation.end_time)}
                </p>
                <p>
                  <span className="text-gray-600">Status:</span> {getValue(consultation.status)}
                </p>
                <p>
                  <span className="text-gray-600">Issues:</span> {getValue(consultation.issues)}
                </p>
              </div>
              <div>
                <p>
                  <span className="text-gray-600">Consultation Fee:</span> ${getValue(consultation.consultation_fee)}
                </p>
                <p>
                  <span className="text-gray-600">Payment Status:</span> {getValue(consultation.payment_status)}
                </p>
                <p>
                  <span className="text-gray-600">Medical Reports:</span> {getValue(consultation.medical_reports.join(", "))}
                </p>
                <p>
                  <span className="text-gray-600">Prescription:</span> {getValue(consultation.prescription)}
                </p>
                <p>
                  <span className="text-gray-600">Medications:</span> {getValue(consultation.medications)}
                </p>
                <p>
                  <span className="text-gray-600">Advice:</span> {getValue(consultation.advice)}
                </p>
                <p>
                  <span className="text-gray-600">Created At:</span> {getValue(formatDate(consultation.created_at))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(ConsultationDetails,['admin']);
