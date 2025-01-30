"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from "@/common/WithAuth";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${baseURL}/api/admins/admin/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPatient(response.data);
        // console.log(response.data._id);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the patient details!",
          error
        );
      });
  }, [id]);

  interface Patient {
    _id: string;
    patient_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    profile_picture: string;
    blood_group: string;
    height: { feet: number; inches: number };
    weight: { value: number; unit: string };
    address: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    medical_history: string;
    current_medications: string;
    allergies: string;
    chronic_conditions: string;
    family_medical_history: string;
    emergency_contact: {
      name: string;
      relationship: string;
      phone_number: string;
    };
    status: string;
    appointments: {
      appointment_id: string;
      doctor_id: string;
      date: string;
      status: string;
      prescription_url: string;
      notes: string;
    }[];
    verification_status: string;
    terms_accepted: boolean;
    identity_verified: boolean;
    consent_form_signed: boolean;
    approval: {
      status: string;
      reason: string;
    };
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl text-red-800 text-center">Loading...</div>
      </div>
    );
  }

  const handleBlockUnblock = () => {
    const token = Cookies.get("token");
    const action = patient?.status === "blocked" ? "unblock" : "block";
    axios
      .put(
        `${baseURL}/api/admins/admin/patients/${patient?._id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPatient((prevPatient) => {
          if (prevPatient) {
            return {
              ...prevPatient,
              status: action === "block" ? "blocked" : "active",
            };
          }
          return prevPatient;
        });
      })
      .catch((error) => {
        console.error(`There was an error ${action}ing the patient!`, error);
      });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 mb-4">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Go Back
          </button>
            <div>
            <button
              onClick={handleBlockUnblock}
              className={`${
              patient.status === "blocked"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
              } text-white px-4 py-2 rounded-md`}
            >
              {patient.status === "blocked" ? "Unblock Patient" : "Block Patient"}
            </button>
            </div>
        </div>

        
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
            Patient Details
          </h1>

          {/* Profile Section */}
          <div className="bg-white p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Image, ID, and Status Section */}
              <div className="flex items-center justify-around">
                {patient.profile_picture ? (
                  <img
                    src={patient.profile_picture}
                    alt="Profile"
                    className="w-32 h-32 mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-xl">
                      {patient.full_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    {patient.full_name}
                  </h2>
                  <p className="text-gray-600">ID: {patient.patient_id}</p>
                  <p className=" text-gray-600">Status: {patient.status}</p>
                </div>
              </div>
              {/* Age, Blood Group, Height, and Weight Section */}
              <div className="bg-white p-6 border-x-4">
                <h3 className="mb-4 text-gray-800">Physical Information</h3>
                <p>
                  <span className=" text-gray-600">Age:</span>{" "}
                  {new Date().getFullYear() -
                    new Date(patient.date_of_birth).getFullYear()}{" "}
                  years
                </p>
                <p>
                  <span className=" text-gray-600">Weight:</span>{" "}
                  {patient.weight.value} {patient.weight.unit}
                </p>
                <p>
                  <span className=" text-gray-600">Blood Group:</span>{" "}
                  {patient.blood_group}
                </p>
                <p>
                  <span className=" text-gray-600">Height:</span>{" "}
                  {patient.height.feet} feet {patient.height.inches} inches
                </p>
              </div>
              {/* Remaining Fields Section */}
              <div className="bg-white p-6">
                <h3 className=" mb-4 text-gray-800">Personal Information</h3>
                <p>
                  <span className="text-gray-600">Gender:</span>{" "}
                  {patient.gender}
                </p>
                {patient.address && (
                  <p>
                    <span className=" text-gray-600">Address:</span>{" "}
                    {`${patient.address.street}, ${patient.address.city}`}
                  </p>
                )}
                <p>
                  <span className=" text-gray-600">Phone Number:</span>{" "}
                  {patient.phone_number}
                </p>
                <p>
                  <span className=" text-gray-600">Patient Email:</span>{" "}
                  {patient.email}
                </p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            {/* Appointments Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Appointments
              </h3>
              <ul className="space-y-4">
                {patient.appointments.length > 0 ? (
                  patient.appointments.map((appointment) => (
                    <li
                      key={appointment.appointment_id}
                      className="p-4 bg-gray-50 rounded-md shadow-sm"
                    >
                      <p>
                        <span className="font-semibold text-gray-600">
                          Appointment ID:
                        </span>{" "}
                        {appointment.appointment_id}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-600">
                          Doctor ID:
                        </span>{" "}
                        {appointment.doctor_id}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-600">
                          Date:
                        </span>{" "}
                        {formatDate(appointment.date)}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-600">
                          Status:
                        </span>{" "}
                        {appointment.status}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-600">
                          Prescription URL:
                        </span>{" "}
                        <a
                          href={appointment.prescription_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {appointment.prescription_url}
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold text-gray-600">
                          Notes:
                        </span>{" "}
                        {appointment.notes}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No appointments available.</p>
                )}
              </ul>
            </div>
            {/* Right Column */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Health Information
              </h3>
              <p>
                <span className="font-semibold text-gray-600">
                  Medical History:
                </span>{" "}
                {patient.medical_history}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Current Medications:
                </span>{" "}
                {patient.current_medications}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Allergies:</span>{" "}
                {patient.allergies}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Chronic Conditions:
                </span>{" "}
                {patient.chronic_conditions}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Family Medical History:
                </span>{" "}
                {patient.family_medical_history}
              </p>
              {patient.emergency_contact && (
                <p>
                  <span className="font-semibold text-gray-600">
                    Emergency Contact:
                  </span>{" "}
                  {`${patient.emergency_contact.name}, ${patient.emergency_contact.relationship}, ${patient.emergency_contact.phone_number}`}
                </p>
              )}
            </div>
            {/* Verification Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Other Information
              </h3>
              <p>
                <span className="font-semibold text-gray-600">
                  Verification Status:
                </span>{" "}
                {patient.verification_status}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Terms Accepted:
                </span>{" "}
                {patient.terms_accepted ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Identity Verified:
                </span>{" "}
                {patient.identity_verified ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Consent Form Signed:
                </span>{" "}
                {patient.consent_form_signed ? "Yes" : "No"}
              </p>
              {patient.approval && (
                <div>
                  <p>
                    <span className="font-semibold text-gray-600">
                      Approval Status:
                    </span>{" "}
                    {patient.approval.status}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-600">
                      Approval Reason:
                    </span>{" "}
                    {patient.approval.reason}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(PatientDetails,['admin']);
