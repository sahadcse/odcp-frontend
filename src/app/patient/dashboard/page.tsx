"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PatientLayout from "@/components/Patient/PatientLayout";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        const appointmentsResponse = await axios.get(
          `${baseURL}/api/users/patient/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(appointmentsResponse.data);

        const consultationsResponse = await axios.get(
          `${baseURL}/api/users/patient/consultations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (consultationsResponse.data.length > 0) {
          setConsultations(consultationsResponse.data);
        }

        const doctorsResponse = await axios.get(
          `${baseURL}/api/users/patient/doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PatientLayout>
        <h2 className="text-2xl font-semibold mb-5">
          Welcome to the Patient Dashboard
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Appointments</h3>
            <p className="text-2xl">{appointments.length}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Consultations</h3>
            <p className="text-2xl">{consultations.length}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Doctors</h3>
            <p className="text-2xl">{doctors.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold mb-3">Health Tips</h3>
            <ul className="space-y-2">
              <li className="border-b pb-2">Stay hydrated - Drink 8 glasses of water daily</li>
              <li className="border-b pb-2">Get 7-8 hours of sleep for better health</li>
              <li className="border-b pb-2">Exercise at least 30 minutes daily</li>
              <li className="border-b pb-2">Maintain a balanced diet with fruits and vegetables</li>
              <li className="border-b pb-2">Take regular health check-ups</li>
            </ul>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold mb-3">COVID-19 Precautions</h3>
            <ul className="space-y-2">
              <li className="border-b pb-2">Wear masks in crowded places</li>
              <li className="border-b pb-2">Maintain social distancing</li>
              <li className="border-b pb-2">Wash hands frequently</li>
              <li className="border-b pb-2">Get vaccinated and boosted</li>
              <li className="border-b pb-2">Stay home if feeling unwell</li>
            </ul>
          </div>
        <div className="p-4 bg-white shadow rounded mt-4 md:col-span-2">
        <h3 className="text-xl font-semibold mb-3">Mental Health Awareness</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2">
          <li className="border-b pb-2">Practice mindfulness and meditation</li>
          <li className="border-b pb-2">Maintain work-life balance</li>
          <li className="border-b pb-2">Stay connected with loved ones</li>
          </ul>
          <ul className="space-y-2">
          <li className="border-b pb-2">Take regular breaks during work</li>
          <li className="border-b pb-2">Seek professional help when needed</li>
          <li className="border-b pb-2">Exercise regularly to boost mood</li>
          </ul>
        </div>
        </div>
      </div>
      </PatientLayout>
    </>
  );
};

export default PatientDashboard;
