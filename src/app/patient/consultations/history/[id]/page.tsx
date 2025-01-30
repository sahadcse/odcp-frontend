"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PatientLayout from "@/components/Patient/PatientLayout";
import axios from "axios";
import Cookies from "js-cookie";
import generatePrescriptionPdf from "@/utils/prescriptionPdfGenerator";
import FileUpload from "@/components/Patient/FileUpload";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Consultation {
  id: number;
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

interface Doctor {
  full_name: string;
  specialization: string;
  email: string;
  profile_picture_url: string;
  // Add other relevant fields
}

interface Prescription {
  patient: {
    name: string;
    age: number;
    gender: string;
    weight: string;
  };
  vitals: {
    bp: string;
    temp: string;
    heartRate: number;
  };
  doctor: {
    name: string;
    registrationNo: string;
  };
  _id: string;
  consultation_id: string;
  symptoms: string[];
  diagnosis: string;
  allergies: string;
  prescription: {
    medicine: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    _id: string;
  }[];
  lifestyleRecommendations: string[];
  recommendedTests: string[];
  followUp: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ConsultationDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchConsultation = async () => {
      if (!id) return; // Ensure id is defined before making the request
      
        // Fetch doctor details using appointment id
        let appointmentId;
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseURL}/api/users/patient/consultations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.consultation && response.data.prescription) {
          setConsultation(response.data.consultation);
          setPrescription(response.data.prescription);
          appointmentId = response.data.consultation.appointment_id;
        } else {
          setConsultation(response.data);
          appointmentId = response.data.appointment_id;
        }
        console.log("Response data:", response.data);

        if (appointmentId) {
          const doctorResponse = await axios.get(
            `${baseURL}/api/users/patient/appointments/${appointmentId}/doctor`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDoctor(doctorResponse.data);
          // console.log("test: ", doctorResponse.data);
        }
      } catch (error) {
        console.error("Error fetching consultation or doctor details:", error);
      }
    };

    fetchConsultation();
  }, [id]);

  const handleDownloadPrescription = async () => {
    if (prescription) {
      generatePrescriptionPdf(prescription);
    } else {
      setMessage("No Prescription found");
    }
  };

  return (
    <PatientLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Go Back Button */}
        <div className="p-4 flex justify-between items-center">
          {/* Go Back Button */}
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            onClick={() => router.push("/patient/consultations/history")}
          >
            Go Back
          </button>

          {/* Start Consultation Button */}
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            onClick={() =>
              router.push(`/patient/consultations/joinmetting?id=${id}`)
            }
          >
            Start Consultation
          </button>

          {/* Action Buttons */}
          <div className="relative">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => {
                handleDownloadPrescription();
                setTimeout(() => {
                  setMessage(null);
                }, 2000);
              }}
            >
              Download Prescription
            </button>
            <span className="absolute left-7 top-12">{message && <p className="text-red-500">{message}</p>}</span>
          </div>
        </div>

        {/* Container */}
        <div className="container mx-auto p-6">
          {consultation ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex">
                {/* Consultation Details */}
                <div className="w-1/2">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Consultation Details
                  </h2>

                  <p className="mb-2">
                    <span className="font-semibold">Status:</span>{" "}
                    {consultation.status}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Consultation Fee:</span> $
                    {consultation.consultation_fee}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {consultation.payment_status}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Issues:</span>{" "}
                    {consultation.issues}
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold">Consultation Date:</span>{" "}
                    {new Date(
                      consultation.consultation_date
                    ).toLocaleDateString()}
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold">Start Time:</span>{" "}
                    {consultation.start_time}
                  </p>
                </div>

                <div className="">
                  {/* Doctor Details */}
                  {doctor && (
                    <div className="">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Doctor Details
                      </h3>
                      <img
                        src={doctor.profile_picture_url}
                        alt="Doctor's Photo"
                        className="w-32 h-32 rounded-full mb-4"
                      />
                      <p className="mb-2">
                        <span className="font-semibold">Name:</span>{" "}
                        {doctor.full_name}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Specialization:</span>{" "}
                        {doctor.specialization}
                      </p>
                      <p className="mb-4">
                        <span className="font-semibold">Contact:</span>{" "}
                        {doctor.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-4 max-w-72">
                <FileUpload consultationId={id} />
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg">Loading...</p>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default ConsultationDetailsPage;
