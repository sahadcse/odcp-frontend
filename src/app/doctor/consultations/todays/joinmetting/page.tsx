"use client";

import { useState, useEffect } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import VideoCall from "@/components/VideoCall";
import Cookies from "js-cookie";
import axios from "axios";
import PrescriptionForm from "@/components/DoctorHero/PrescriptionForm";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function DoctorDashboard() {
  const [room_name, setRoomName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isJoining, setIsJoining] = useState(false);
  const [consultationId, setConsultationId] = useState(""); // Add this line
  const [patientData, setPatientData] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchRoomId = async (id: string): Promise<void> => {
      setIsLoading(true); // Start loading
      try {
        const token = Cookies.get("token");
        const response = await axios.get<{ room_name: string }>(
          `${baseURL}/api/users/doctor/consultations/room/collect/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.room_name) {
          setRoomName(response.data.room_name);
        } else {
          setError("No room name received from server");
        }
      } catch (error) {
        console.error("Error fetching room ID:", error);
        setError("Failed to fetch room ID. Please try again later.");
      } finally {
        setIsLoading(false); // End loading
      }
    };

    const fetchPatientData = async (id: string): Promise<void> => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseURL}/api/users/doctor/consultations/patient/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatientData(response.data);
        console.log("Patient data:", response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError("Failed to fetch patient data. Please try again later.");
      }
    };

    const query = new URLSearchParams(window.location.search);
    const idFromQuery = query.get("id");
    if (idFromQuery) {
      setConsultationId(idFromQuery); // Add this line
      fetchRoomId(idFromQuery);
      fetchPatientData(idFromQuery);
    } else {
      setError("No consultation ID provided");
      setIsLoading(false);
    }
  }, []);

  interface Patient {
    patient_id: string;
    full_name: string;
    date_of_birth: string;
    gender: string;
    blood_group: string;
    height: { feet: number; inches: number };
    medical_history: string[];
    current_medications: string[];
    allergies: string[];
    chronic_conditions: string[];
    family_medical_history: string[];
    emergency_contact: {
      name: string;
      relationship: string;
      phone_number: string;
    };
  }

  return (
    <DoctorLayout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Consultation Room</h2>
        <div className="flex h-full relative">
          <div className="w-[60%] flex-shrink-0">
            {/* Video Call Section */}
            <div className="sticky top-0">
              {isLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2">Loading consultation room...</p>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : room_name ? (
                <VideoCall room_name={room_name} role="doctor" />
              ) : (
                <p>No room available</p>
              )}
            </div>

            {/* Patient Information Section */}
            {patientData && (
              <div className="bg-white rounded-lg shadow-lg p-6 mt-2">
                <h3 className="text-xl font-bold mb-2">Patient Information</h3>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <p className="font-semibold">Full Name:</p>
                    <p>{patientData.full_name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Age:</p>
                    <p>
                      {new Date().getFullYear() -
                        new Date(patientData.date_of_birth).getFullYear()}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Gender:</p>
                    <p>{patientData.gender}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Blood Group:</p>
                    <p>{patientData.blood_group}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 mt-2">
                  <div className="">
                    <h4 className="font-semibold mb-2">Medical History:</h4>
                    <ul className="list-disc pl-5">
                      {patientData.medical_history.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="">
                    <h4 className="font-semibold">Current Medications:</h4>
                    <ul className="list-disc pl-5">
                      {patientData.current_medications.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="">
                    <h4 className="font-semibold">Allergies:</h4>
                    <ul className="list-disc pl-5">
                      {patientData.allergies.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prescription Section */}
          <div className="w-[40%] ml-4">
            <h3 className="text-lg font-bold mb-2">Prescription</h3>
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <PrescriptionForm id={consultationId} />
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}
