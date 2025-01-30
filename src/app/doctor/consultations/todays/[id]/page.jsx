"use client";

import { useEffect, useState } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import { authHeader } from "@/utils";
import withAuth from "@/common/WithAuth";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

const ConsultationsDetails = () => {
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [prescription, setPrescription] = useState({
    medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
    advice: "",
    created_at: new Date().toISOString(),
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const params = useParams();

  const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await fetch(
          `${BACKEND_API_URL}/api/users/doctor/consultations/${params?.id}`,
          {
            headers: authHeader(),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch consultation details");
        }
        const data = await response.json();
        console.log("Consultation Details: ", data);
        setConsultation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultation();
  }, [params?.id]);

  const handleStart = async () => {
    try {
      window.location.href = `/doctor/consultations/todays/joinmetting?id=${params?.id}`;
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <DoctorLayout>
        <DashboardHeroNav headName="Consultation Details" />
        <div className="p-6 flex justify-center items-center">
          Loading consultation details...
        </div>
      </DoctorLayout>
    );
  }

  if (error) {
    return (
      <DoctorLayout>
        <DashboardHeroNav headName="Consultation Details" />
        <div className="p-6 text-red-500">Error: {error}</div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <DashboardHeroNav headName="Consultation Details" />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Consultation Details
          </h2>
          <div className="space-y-4">
            <div>
              <strong className="block text-gray-600">Patient ID:</strong>
              <p className="text-gray-800">{consultation.patient_id}</p>
            </div>
            <div>
              <strong className="block text-gray-600">Appointment ID:</strong>
              <p className="text-gray-800">{consultation.appointment_id}</p>
            </div>
          </div>
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start
          </button>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default withAuth(ConsultationsDetails, ["doctor"]);
