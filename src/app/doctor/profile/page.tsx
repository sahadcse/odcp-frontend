"use client";

import { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaUserEdit,
  FaRegIdCard,
  FaAward,
} from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { BiCalendar, BiTimeFive } from "react-icons/bi";
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import { DoctorProfileData } from "@/data/doctorProfileData";
import useUserData from "@/hooks/useUserData";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { update } from "@/redux/slices/userSlice";
import Swal from "sweetalert2";
import withAuth from "@/common/WithAuth";

interface ProfileData {
  _id: string;
  full_name: string; // Renamed from "name" to "full_name"
  email: string;
  phone_number: string;
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  age: number; // Calculated from the "date_of_birth"
  gender: string; // Renamed from "gender" to "sex"
  role: string;
  specialization: string;
  qualifications: string[]; // Added qualification array
  experience_years: number; // Added years of experience
  license_number: string;
  bio: string;
  consultation_fee: number;
  availability: {
    day: string;
    time_slots: string[]; // Added time slots for availability
  }[];
  languages_spoken: string[];
  hospital_affiliations: {
    address: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    name: string;
  }[];
  awards_and_recognitions: string[];
  status: string; // Added doctor status (e.g., "active")
  ratings: {
    average_rating: number;
    total_reviews: number;
  };
  created_at: string;
  updated_at: string;
  verification_status: boolean; // Added verification status
  identity_verified: boolean;
  two_factor_enabled: boolean;
  consent_form_signed: boolean;
  terms_accepted: boolean;
  date_of_birth: string;
  social_links: {
    linkedin: string;
    twitter: string;
  };
  chat_enabled: boolean;
  calendar_sync_enabled: boolean;
  video_call_link: object;
  documents: string[]; // Added documents array
  notifications_enabled: boolean;
  profile_picture_url: "";
}

const DoctorProfilePage = () => {
  const user = useUserData();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await DoctorProfileData(user?._id);
        setProfileData(data);
        console.log("Profile Data:", data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    getProfileData();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!profileData) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  // handleProfilePictureChange Function
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files?.[0];
    if (files) {
      const formData = new FormData();
      formData.append("profile_picture_url", files);

      const token = Cookies.get("token");
      axios
        .put(`${baseURL}/api/users/doctor/update`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Profile picture uploaded successfully!", response);
          setProfileData({
            ...profileData,
            profile_picture_url: response.data.profile_picture_url,
          });
          const updatedData = {
            ...profileData,
            role: "doctor",
            profile_picture_url: response.data.profile_picture_url,
          };
          dispatch(update(updatedData));
        })
        .catch((error) => {
          console.error(
            "There was an error uploading the profile picture!",
            error
          );
        });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]); // Store selected file
    }
  };

  const handleUpload = async () => {
    if (!selectedFile)
      return Swal.fire("Error", "Please select a file first!", "error");

    const formData = new FormData();
    formData.append("documents", selectedFile);

    const token = Cookies.get("token");
    try {
      setUploading(true);
      const response = await axios.put(
        `${baseURL}/api/users/doctor/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfileData({ ...profileData, documents: response.data.documents });
      const updatedData = {
        ...profileData,
        role: "doctor",
        documents: response.data.documents,
      };
      dispatch(update(updatedData));
      Swal.fire("Success", "Document uploaded successfully!", "success");
      setSelectedFile(null); // Reset file after upload
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Error", "Failed to upload document!", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <DoctorLayout>
      <DashboardHeroNav headName={`Dashboard ${profileData.role}`} />
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen py-10 mt-6">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Profile Image and Basic Info */}
              <div className="w-full md:w-1/3 p-6 bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center">
                <img
                  src={profileData?.profile_picture_url}
                  alt="Doctor Profile"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                />
                <h1 className="text-2xl font-bold mt-4 text-gray-800">
                  {profileData.full_name}
                </h1>
                <p className="text-gray-600">{profileData.specialization}</p>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
                  onClick={() =>
                    document.getElementById("profile_picture")?.click()
                  }
                >
                  <FaUserEdit className="mr-2" /> Change Image
                </button>
                <input
                  type="file"
                  id="profile_picture"
                  name="profile_picture"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>

              {/* Profile Details */}
              <div className="w-full md:w-2/3 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  About Me
                </h2>
                <p className="text-gray-700 mb-6">
                  {profileData.bio ||
                    "A dedicated medical professional with years of experience in providing high-quality healthcare. Passionate about helping patients achieve their health goals."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <FaEnvelope className="inline mr-2" />{" "}
                        {profileData.email}
                      </p>
                      <p className="text-gray-700">
                        <FaPhoneAlt className="inline mr-2" />{" "}
                        {profileData?.phone_number}
                      </p>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Professional Details
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <FaAward className="inline mr-2" /> Experience:{" "}
                        {profileData.experience_years || "Not Available"} years
                      </p>
                      <p className="text-gray-700">
                        <FaRegIdCard className="inline mr-2" /> License:{" "}
                        {profileData.license_number || "Not Available"}
                      </p>
                      <p className="text-gray-700">
                        <MdLanguage className="inline mr-2" /> Languages:{" "}
                        {profileData.languages_spoken.join(", ") ||
                          "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications and Availability */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Qualifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Qualifications
              </h3>
              <ul className="space-y-2">
                {profileData.qualifications.map((qualification, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <FaAward className="text-yellow-500 mr-2" /> {qualification}
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Availability
              </h3>
              {profileData.availability.length > 0 ? (
                profileData.availability.map((slot, index) => (
                  <div
                    key={index}
                    className="text-gray-700 flex items-center mb-2"
                  >
                    <BiCalendar className="mr-2" />
                    <span>
                      {slot.day}: {slot.time_slots.join(", ")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Not Available</p>
              )}
            </div>
          </div>

          {/* Documents Section */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.documents.length > 0 ? (
                profileData.documents.map((document, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row justify-between items-center py-2 px-1"
                  >
                    <div className="flex items-center justify-center mb-4 md:mb-0">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                          Document {index + 1}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Uploaded on {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <span>View</span>
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 bg-gray-50 rounded-xl p-8 text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-4 text-lg font-medium text-gray-600">
                    No documents uploaded yet
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Upload your documents using the form below
                  </p>
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Upload Documents
              </h3>
              <div className="flex gap-4 items-center">
                <label
                  htmlFor="documents"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="documents"
                  name="documents"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={handleUpload}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>

          {/* Account & Security */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Account & Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700">
                  Verification Status:{" "}
                  <span className="font-semibold">
                    {profileData.verification_status
                      ? "Verified"
                      : "Not Verified"}
                  </span>
                </p>
                <p className="text-gray-700">
                  Identity Verified:{" "}
                  <span className="font-semibold">
                    {profileData.identity_verified ? "Yes" : "No"}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  Two-Factor Authentication:{" "}
                  <span className="font-semibold">
                    {profileData.two_factor_enabled ? "Enabled" : "Disabled"}
                  </span>
                </p>
                <p className="text-gray-700">
                  Notifications:{" "}
                  <span className="font-semibold">
                    {profileData.notifications_enabled ? "Enabled" : "Disabled"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Delete Profile Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Profile Delete Request
            </button>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default withAuth(DoctorProfilePage, ["doctor"]);
