"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
import PdfViewer from "@/components/PdfViewer";

import PatientLayout from "@/components/Patient/PatientLayout";

const PatientProfile = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showDeleteReasonForm, setShowDeleteReasonForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // Fetch Patient Data
  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${baseURL}/api/users/patient/profile`, {
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

  // Patient Interface
  interface Patient {
    _id: string;
    patient_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    profile_picture: string;
    medical_reports: Array<{ type: string; url: string; _id: string }>;
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
    preferences: {
      language: string;
      notification_preferences: {
        email: boolean;
        sms: boolean;
      };
    };
    insurance_details: {
      provider_name: string;
      policy_number: string;
      coverage_details: string;
    };
  }

  // Format Date Function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading Screen
  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl text-red-800 text-center">Loading...</div>
      </div>
    );
  }

  // Delete Profile Function
  const handleDelete = () => {
    const reason = (document.getElementById("deleteReason") as HTMLInputElement)
      .value;
    if (reason) {
      const token = Cookies.get("token");
      axios
        .delete(`${baseURL}/api/users/patient/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { reason },
        })
        .then(() => {
          router.push("/register"); // Redirect to a different page after deletion
        })
        .catch((error) => {
          console.error("There was an error deleting the profile!", error);
        });
    }
  };

  // // Update Profile Function

  const handleUpdate = (updatedData: Partial<Patient>) => {
    const token = Cookies.get("token");

    axios
      .put(`${baseURL}/api/users/patient/update`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the content type to JSON
        },
      })
      .then((response) => {
        setPatient(
          (prevPatient) => ({ ...prevPatient, ...updatedData } as Patient)
        ); // Update state with new patient data
        router.push(`/patient/profile`); // Redirect to the updated profile page
        setShowUpdateForm(false);
      })
      .catch((error) => {
        console.error("There was an error updating the profile!", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        }
      });
  };

  // handleProfilePictureChange Function
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files?.[0];
    if (files) {
      const formData = new FormData();
      formData.append("profile_picture", files);

      const token = Cookies.get("token");
      axios
        .put(`${baseURL}/api/users/patient/update`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setPatient((prevPatient) => {
            if (prevPatient) {
              return {
                ...prevPatient,
                profile_picture: response.data.profile_picture,
              };
            }
            return prevPatient;
          });
        })
        .catch((error) => {
          console.error(
            "There was an error uploading the profile picture!",
            error
          );
        });
    }
  };

  // handle medical reports upload
  const handleMedicalReportsUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("medical_reports", file);
      });

      const token = Cookies.get("token");
      axios
        .post(
          `${baseURL}/api/users/patient/medical-reports`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setPatient(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error uploading the medical reports!",
            error
          );
        });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const updatedData: Partial<Patient> = {
      full_name: formData.get("full_name") as string,
      phone_number: formData.get("phone_number") as string,
      weight: {
        value: parseFloat(formData.get("weight_value") as string),
        unit: formData.get("weight_unit") as string,
      },
      medical_history:
        (formData.get("medical_history") as string)?.split(",") || [],
      current_medications:
        (formData.get("current_medications") as string)?.split(",") || [],
      allergies: (formData.get("allergies") as string)?.split(",") || [],
      chronic_conditions:
        (formData.get("chronic_conditions") as string)?.split(",") || [],
      family_medical_history:
        (formData.get("family_medical_history") as string)?.split(",") || [],
      address: {
        street: formData.get("address_street") as string,
        city: formData.get("address_city") as string,
        state: formData.get("address_state") as string,
        postal_code: formData.get("address_postal_code") as string,
        country: formData.get("address_country") as string,
      },
      emergency_contact: {
        name: formData.get("emergency_contact_name") as string,
        relationship: formData.get("emergency_contact_relationship") as string,
        phone_number: formData.get("emergency_contact_phone_number") as string,
      },
      preferences: {
        language: formData.get("preferences_language") as string,
        notification_preferences: {
          email: formData.has("preferences_notification_email"),
          sms: formData.has("preferences_notification_sms"),
        },
      },
      insurance_details: {
        provider_name: formData.get("insurance_provider_name") as string,
        policy_number: formData.get("insurance_policy_number") as string,
        coverage_details: formData.get("insurance_coverage_details") as string,
      },
    };

    handleUpdate(updatedData); // Call the update function with the JSON data
  };

  console.log("appointments: ", patient.medical_reports);

  return (
    <PatientLayout>
      <div className="container mx-auto px-4 mb-4">
        <div className="flex justify-between mb-6">
          {/* Going back Button */}
          <button
            onClick={() => router.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Go Back
          </button>

          {/* Profile Edit button */}
          <button
            onClick={() => setShowUpdateForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Update Profile
          </button>

          {/* Delete Profile */}
          <div className="">
            <button
              onClick={() => setShowDeleteReasonForm(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete Profile
            </button>
            {showDeleteReasonForm && (
              <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Delete Profile
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Please provide a reason for deleting the profile.
                  </p>
                  <input
                    type="text"
                    id="deleteReason"
                    className="input border border-gray-300 rounded-md p-2"
                    placeholder="Reason for deletion"
                  />
                  <p id="error-message" className="text-red-500 mt-2 hidden">
                    Reason is required.
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setShowDeleteReasonForm(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-4 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const reason = (
                          document.getElementById(
                            "deleteReason"
                          ) as HTMLInputElement
                        ).value;
                        if (!reason) {
                          document
                            .getElementById("error-message")!
                            .classList.remove("hidden");
                        } else {
                          handleDelete();
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Update Profile hidden div */}
        {showUpdateForm && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-[90%] md:w-[75%]">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Update Profile
              </h1>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Full Name */}
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="Full Name"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.full_name}
                  />
                  {/* Profile Picture */}
                  {/* <input
                    type="file"
                    id="profile_picture"
                    name="profile_picture"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                  /> */}
                  {/* Phone Number */}
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Phone Number"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.phone_number}
                  />
                  {/* Weight */}
                  <input
                    type="number"
                    id="weight_value"
                    name="weight_value"
                    placeholder="Weight Value"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.weight.value}
                  />
                  <input
                    type="text"
                    id="weight_unit"
                    name="weight_unit"
                    placeholder="Weight Unit"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.weight.unit}
                  />
                  {/* Address */}
                  <input
                    type="text"
                    id="address_street"
                    name="address_street"
                    placeholder="Street"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.address?.street}
                  />
                  <input
                    type="text"
                    id="address_city"
                    name="address_city"
                    placeholder="City"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.address?.city}
                  />
                  <input
                    type="text"
                    id="address_state"
                    name="address_state"
                    placeholder="State"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.address?.state}
                  />
                  <input
                    type="text"
                    id="address_postal_code"
                    name="address_postal_code"
                    placeholder="Postal Code"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.address?.postal_code}
                  />
                  <input
                    type="text"
                    id="address_country"
                    name="address_country"
                    placeholder="Country"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.address?.country}
                  />
                  {/* Emergency Contact */}
                  <input
                    type="text"
                    id="emergency_contact_name"
                    name="emergency_contact_name"
                    placeholder="Emergency Contact Name"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.emergency_contact.name}
                  />
                  <input
                    type="text"
                    id="emergency_contact_relationship"
                    name="emergency_contact_relationship"
                    placeholder="Emergency Contact Relationship"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.emergency_contact.relationship}
                  />
                  <input
                    type="text"
                    id="emergency_contact_phone_number"
                    name="emergency_contact_phone_number"
                    placeholder="Emergency Contact Phone Number"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.emergency_contact.phone_number}
                  />
                  {/* Preferences */}
                  <input
                    type="text"
                    id="preferences_language"
                    name="preferences_language"
                    placeholder="Preferred Language"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.preferences.language}
                  />
                  {/* Insurance Details */}
                  <input
                    type="text"
                    id="insurance_provider_name"
                    name="insurance_provider_name"
                    placeholder="Insurance Provider Name"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.insurance_details?.provider_name}
                  />
                  <input
                    type="text"
                    id="insurance_policy_number"
                    name="insurance_policy_number"
                    placeholder="Insurance Policy Number"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.insurance_details?.policy_number}
                  />
                  <input
                    type="text"
                    id="insurance_coverage_details"
                    name="insurance_coverage_details"
                    placeholder="Insurance Coverage Details"
                    className="border border-gray-300 rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12"
                    defaultValue={patient.insurance_details?.coverage_details}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="preferences_notification_email"
                      name="preferences_notification_email"
                      className="mr-2 h-12"
                      defaultChecked={
                        patient.preferences.notification_preferences.email
                      }
                    />
                    <label htmlFor="preferences_notification_email">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="preferences_notification_sms"
                      name="preferences_notification_sms"
                      className="mr-2 h-12"
                      defaultChecked={
                        patient.preferences.notification_preferences.sms
                      }
                    />
                    <label htmlFor="preferences_notification_sms">
                      SMS Notifications
                    </label>
                  </div>
                  {/* Medical History */}
                  <textarea
                    id="medical_history"
                    name="medical_history"
                    placeholder="Medical History (comma separated)"
                    className="border border-gray-300 rounded-md px-2 w-full shadow-sm focus:ring-2 focus:ring-green-500  h-26 overflow-y-hidden"
                    defaultValue={patient.medical_history.join(",")}
                  />
                  {/* Current Medications */}
                  <textarea
                    id="current_medications"
                    name="current_medications"
                    placeholder="Current Medications (comma separated)"
                    className="border border-gray-300 rounded-md px-2 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12 overflow-y-hidden"
                    defaultValue={patient.current_medications.join(",")}
                  />
                  {/* Allergies */}
                  <textarea
                    id="allergies"
                    name="allergies"
                    placeholder="Allergies (comma separated)"
                    className="border border-gray-300 rounded-md px-2 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12 overflow-y-hidden"
                    defaultValue={patient.allergies.join(",")}
                  />
                  {/* Chronic Conditions */}
                  <textarea
                    id="chronic_conditions"
                    name="chronic_conditions"
                    placeholder="Chronic Conditions (comma separated)"
                    className="border border-gray-300 rounded-md px-2 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12 overflow-y-hidden"
                    defaultValue={patient.chronic_conditions.join(",")}
                  />
                  {/* Family Medical History */}
                  <textarea
                    id="family_medical_history"
                    name="family_medical_history"
                    placeholder="Family Medical History (comma separated)"
                    className="border border-gray-300 rounded-md px-2 w-full shadow-sm focus:ring-2 focus:ring-green-500 h-12 overflow-y-hidden"
                    defaultValue={patient.family_medical_history.join(",")}
                  />
                  {/* medical reports upload */}
                  <input
                    type="file"
                    id="medical_reports"
                    name="medical_reports"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleMedicalReportsUpload}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateForm(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-4 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Profile Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
            Profile Details
          </h1>

          {/* Profile Section */}
          <div className="bg-white p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Image, ID, and Status Section */}
              <div className="flex items-center justify-around">
                <div className="relative group">
                  <div className="mb-3">
                    {patient.profile_picture ? (
                      <img
                        src={patient.profile_picture}
                        alt="Profile"
                        className="w-32 h-32 mb-4 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 text-xl">
                          {patient.full_name ? patient.full_name.charAt(0) : ""}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-opacity duration-300">
                      <button
                        type="button"
                        className="bg-black text-white px-1 rounded-md text-xs"
                        onClick={() =>
                          document.getElementById("profile_picture")?.click()
                        }
                      >
                        Change Image
                      </button>
                      <input
                        type="file"
                        id="profile_picture"
                        name="profile_picture"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                    </div>
                  </div>
                </div>

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
                  {patient?.height
                    ? `${patient.height.feet} feet ${patient.height.inches} inches`
                    : "N/A"}
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

            {/* Medical Reports Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Medical Reports
              </h3>
              <ul className="space-y-4">
                {patient.medical_reports &&
                patient.medical_reports.length > 0 ? (
                  patient.medical_reports.map((report) => (
                    <li
                      key={report._id}
                      className=" bg-gray-50 rounded-md shadow-sm flex justify-between items-center py-1 px-2"
                    >
                      <p className="font-semibold text-gray-600 mb-2">
                        Document {patient.medical_reports.indexOf(report) + 1}
                      </p>
                      <PdfViewer fileUrl={report.url} />
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No medical reports available.</p>
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
    </PatientLayout>
  );
};

export default PatientProfile;
