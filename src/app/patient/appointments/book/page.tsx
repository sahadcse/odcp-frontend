"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

import PatientLayout from "@/components/Patient/PatientLayout";

const AppointmentBooking = () => {
  // Define the Doctor interface
  interface Doctor {
    doctor_id: string;
    full_name: string;
    specialization: string;
    consultation_fee: number;
    profile_picture_url: string;
    languages_spoken: string[];
    _id: string;
    approval: {
      status: string;
    };
  }

  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string>("");

  // Fetch doctors data on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseURL}/api/users/patient/doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const approvedDoctors = response.data.filter(
          (doctor: Doctor) => doctor.approval.status === "Approved"
        );
        setDoctors(approvedDoctors);
        setFilteredDoctors(approvedDoctors);
        const specs: string[] = Array.from(
          new Set(
            approvedDoctors.map((doctor: Doctor) => doctor.specialization)
          )
        );
        setSpecializations(specs);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterDoctors(value, selectedSpecialization);
  };

  // Handle specialization filter change
  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value = e.target.value;
    setSelectedSpecialization(value);
    filterDoctors(searchTerm, value);
  };

  // Filter doctors based on search term and specialization
  const filterDoctors = (searchTerm: string, specialization: string) => {
    const filtered = doctors.filter(
      (doctor) =>
        (doctor.full_name.toLowerCase().includes(searchTerm) ||
          doctor.specialization.toLowerCase().includes(searchTerm) ||
          doctor.consultation_fee.toString().includes(searchTerm)) &&
        (specialization === "" || doctor.specialization === specialization)
    );
    setFilteredDoctors(filtered);
  };

  // Handle image error (display placeholder if image not found)
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
    e.currentTarget.className = "doctor-image rounded-full";
  };

  return (
    <PatientLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Appointment Booking</h1>
        <div className="flex flex-col sm:flex-row mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by name, specialization, or fee"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-[60%] p-2 border border-gray-300 rounded"
          />
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
            <div className="whitespace-nowrap">
              <span className="mr-2">Filter:</span>
            </div>
            <select
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
              className="w-full sm:w-auto p-2 border border-gray-300 rounded"
            >
              <option value="">All Specializations</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.doctor_id}
                className="doctor-card p-3 sm:p-4 border border-red-200 rounded shadow flex flex-col justify-between"
              >
                <img
                  src={doctor.profile_picture_url}
                  alt={doctor.full_name}
                  className="doctor-image w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mx-auto mb-3 sm:mb-4 bg-gray-500"
                  onError={handleImageError}
                />
                <div className="space-y-1 sm:space-y-2">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {doctor.full_name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700">
                    Specialization: {doctor.specialization}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700">
                    Consultation Fee: ${doctor.consultation_fee}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700">
                    Languages: {doctor.languages_spoken.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => {
                    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
                    router.push(`/patient/appointments/book/confirm`);
                  }}
                  className="mt-3 sm:mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-center text-red-500 text-lg sm:text-xl">
              Sorry! No Doctors Available.
            </p>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default AppointmentBooking;
