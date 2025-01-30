"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from "@/common/WithAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type Doctor = {
  _id: number;
  full_name: string;
  email: string;
  specialization: string;
  qualifications: string[];
  license_number: string;
  approval: {
    status: string;
  };
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  ratings?: {
    average_rating?: number;
    total_reviews?: number;
  };
  social_links?: {
    linkedin?: string;
    twitter?: string;
  };
  phone_number?: string;
  date_of_birth?: string;
  gender?: string;
  bio?: string;
  experience_years?: number;
  consultation_fee?: number;
  availability?: { day: string; time_slots: string[] }[];
  languages_spoken?: string[];
  hospital_affiliations?: { name: string; address: { city: string; state: string } }[];
  awards_and_recognitions?: string[];
  role?: string;
  status?: string;
  verification_status?: string;
  notifications_enabled?: boolean;
  identity_verified?: boolean;
  two_factor_enabled?: boolean;
  consent_form_signed?: boolean;
  terms_accepted?: boolean;
  chat_enabled?: boolean;
  created_at?: string;
  updated_at?: string;
  documents?: { type: string; url: string }[];
  profile_picture_url?: string;
};

const ApproveRejectDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    // Fetch all doctors
    axios
      .get(`${baseURL}/api/admins/admin/doctors/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Doctors fetched successfully!", response.data);
        // Filter doctors with approval.status:Pending
        const pendingDoctors: Doctor[] = response.data.filter(
          (doctor: Doctor) => doctor.approval.status === "Pending"
        );
        setDoctors(pendingDoctors);
      })
      .catch((error) => {
        console.error("There was an error fetching the doctors!", error);
      });
  }, [token]);

  const handleApprove = (_id: number) => {
    axios
      .put(
        `${baseURL}/api/admins/admin/doctors/${_id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Update the doctors list after approval
        setDoctors(doctors.filter((doctor) => doctor._id !== _id));
        setSelectedDoctor(null);
      })
      .catch((error) => {
        console.error("There was an error approving the doctor!", error);
      });
  };

  const handleReject = (_id: number) => {
    axios
      .put(
        `${baseURL}/api/admins/admin/doctors/${_id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Update the doctors list after rejection
        setDoctors(doctors.filter((doctor) => doctor._id !== _id));
        setSelectedDoctor(null);
      })
      .catch((error) => {
        console.error("There was an error rejecting the doctor!", error);
      });
  };

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseDetails = () => {
    setSelectedDoctor(null);
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Pending Doctor Approvals</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Specialization</th>
              <th className="py-2 px-4 border-b">Qualifications</th>
              <th className="py-2 px-4 border-b">License Number</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{doctor.full_name}</td>
                <td className="py-2 px-4 border-b">{doctor.email}</td>
                <td className="py-2 px-4 border-b">{doctor.specialization}</td>
                <td className="py-2 px-4 border-b">
                  {doctor.qualifications.join(", ")}
                </td>
                <td className="py-2 px-4 border-b">{doctor.license_number}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                    onClick={() => handleViewDetails(doctor)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {selectedDoctor && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 relative">
              <button className="absolute top-4 right-4 text-gray-500" onClick={handleCloseDetails}>X</button>
              <h2 className="text-xl font-bold mb-4">Doctor Details</h2>
              <p><strong>Full Name:</strong> {selectedDoctor.full_name || "N/A"}</p>
              <p><strong>Email:</strong> {selectedDoctor.email || "N/A"}</p>
              <p><strong>Specialization:</strong> {selectedDoctor.specialization || "N/A"}</p>
              <p><strong>Qualifications:</strong> {selectedDoctor.qualifications.join(', ') || "N/A"}</p>
              <p><strong>License Number:</strong> {selectedDoctor.license_number || "N/A"}</p>
              <p><strong>Phone Number:</strong> {selectedDoctor.phone_number || "N/A"}</p>
              <p><strong>Date of Birth:</strong> {selectedDoctor.date_of_birth || "N/A"}</p>
              <p><strong>Gender:</strong> {selectedDoctor.gender || "N/A"}</p>
              <p><strong>Bio:</strong> {selectedDoctor.bio || "N/A"}</p>
              <p><strong>Experience Years:</strong> {selectedDoctor.experience_years || "N/A"}</p>
              <p><strong>Consultation Fee:</strong> {selectedDoctor.consultation_fee || "N/A"}</p>
              <p><strong>Availability:</strong> {selectedDoctor.availability?.map((slot, index) => (
                <div key={index}>
                  {slot.day}: {slot.time_slots.join(', ')}
                </div>
              )) || "N/A"}</p>
              <p><strong>Languages Spoken:</strong> {selectedDoctor.languages_spoken?.join(', ') || "N/A"}</p>
              <p><strong>Hospital Affiliations:</strong> {selectedDoctor.hospital_affiliations?.map((affiliation, index) => (
                <div key={index}>
                  {affiliation.name}, {affiliation.address}
                </div>
              )) || "N/A"}</p>
              <p><strong>Address:</strong> {selectedDoctor.address ? (
                <>
                  {selectedDoctor.address.street || "N/A"}, {selectedDoctor.address.city || "N/A"}, {selectedDoctor.address.state || "N/A"}, {selectedDoctor.address.postal_code || "N/A"}, {selectedDoctor.address.country || "N/A"}
                </>
              ) : "N/A"}</p>
              <p><strong>Ratings:</strong> {selectedDoctor.ratings ? (
                <>
                  Average Rating: {selectedDoctor.ratings.average_rating || "N/A"}, Total Reviews: {selectedDoctor.ratings.total_reviews || "N/A"}
                </>
              ) : "N/A"}</p>
              <p><strong>Social Links:</strong> {selectedDoctor.social_links ? (
                <>
                  LinkedIn: {selectedDoctor.social_links.linkedin || "N/A"}, Twitter: {selectedDoctor.social_links.twitter || "N/A"}
                </>
              ) : "N/A"}</p>
              <p><strong>Role:</strong> {selectedDoctor.role || "N/A"}</p>
              <p><strong>Status:</strong> {selectedDoctor.status || "N/A"}</p>
              <p><strong>Verification Status:</strong> {selectedDoctor.verification_status || "N/A"}</p>
              <p><strong>Notifications Enabled:</strong> {selectedDoctor.notifications_enabled ? "Yes" : "No"}</p>
              <p><strong>Identity Verified:</strong> {selectedDoctor.identity_verified ? "Yes" : "No"}</p>
              <p><strong>Two Factor Enabled:</strong> {selectedDoctor.two_factor_enabled ? "Yes" : "No"}</p>
              <p><strong>Consent Form Signed:</strong> {selectedDoctor.consent_form_signed ? "Yes" : "No"}</p>
              <p><strong>Terms Accepted:</strong> {selectedDoctor.terms_accepted ? "Yes" : "No"}</p>
              <p><strong>Chat Enabled:</strong> {selectedDoctor.chat_enabled ? "Yes" : "No"}</p>
              <p><strong>Created At:</strong> {selectedDoctor.created_at ? new Date(selectedDoctor.created_at).toLocaleDateString() : "N/A"}</p>
              <p><strong>Updated At:</strong> {selectedDoctor.updated_at ? new Date(selectedDoctor.updated_at).toLocaleDateString() : "N/A"}</p>
              <p><strong>Documents:</strong> {selectedDoctor.documents?.map((doc, index) => (
                <div key={index}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.type}
                  </a>
                </div>
              )) || "N/A"}</p>
              <p><strong>Profile Picture URL:</strong> {selectedDoctor.profile_picture_url ? (
                <img src={selectedDoctor.profile_picture_url} alt="Profile" className="w-16 h-16 rounded-full" />
              ) : "N/A"}</p>
              <div className="mt-4">
                <button className="bg-green-500 text-white py-1 px-3 rounded mr-2" onClick={() => handleApprove(selectedDoctor._id)}>
                  Approve
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded" onClick={() => handleReject(selectedDoctor._id)}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        )} */}

        {selectedDoctor && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[90vh] relative scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={handleCloseDetails}
                aria-label="Close"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Doctor Details
                </h2>
                <p className="text-sm text-gray-500">
                  Review and manage doctor details below.
                </p>
              </div>

              {/* Doctor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Basic Information:</h3>
                  <p><strong>Full Name:</strong> {selectedDoctor.full_name || "N/A"}</p>
                  <p><strong>Email:</strong> {selectedDoctor.email || "N/A"}</p>
                  <p><strong>Phone Number:</strong> {selectedDoctor.phone_number || "N/A"}</p>
                    <p><strong>Date of Birth:</strong> {selectedDoctor.date_of_birth ? new Date(selectedDoctor.date_of_birth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}</p>
                  <p><strong>Gender:</strong> {selectedDoctor.gender || "N/A"}</p>
                  <p><strong>Bio:</strong> {selectedDoctor.bio || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Professional Information:</h3>
                  <p><strong>Specialization:</strong> {selectedDoctor.specialization || "N/A"}</p>
                  <p><strong>Qualifications:</strong> {selectedDoctor.qualifications?.join(", ") || "N/A"}</p>
                  <p><strong>Experience Years:</strong> {selectedDoctor.experience_years || "N/A"}</p>
                  <p><strong>License Number:</strong> {selectedDoctor.license_number || "N/A"}</p>
                  <p><strong>Consultation Fee:</strong> ${selectedDoctor.consultation_fee || "N/A"}</p>
                  <p><strong>Languages Spoken:</strong> {selectedDoctor.languages_spoken?.join(", ") || "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold">Additional Information:</h3>
                  <p><strong>Role:</strong> {selectedDoctor.role || "N/A"}</p>
                  <p><strong>Status:</strong> {selectedDoctor.status || "N/A"}</p>
                  <p><strong>Verification Status:</strong> {selectedDoctor.verification_status || "N/A"}</p>
                  <p><strong>Notifications Enabled:</strong> {selectedDoctor.notifications_enabled ? "Yes" : "No"}</p>
                  <p><strong>Identity Verified:</strong> {selectedDoctor.identity_verified ? "Yes" : "No"}</p>
                  <p><strong>Two Factor Enabled:</strong> {selectedDoctor.two_factor_enabled ? "Yes" : "No"}</p>
                  <p><strong>Consent Form Signed:</strong> {selectedDoctor.consent_form_signed ? "Yes" : "No"}</p>
                  <p><strong>Terms Accepted:</strong> {selectedDoctor.terms_accepted ? "Yes" : "No"}</p>
                  <p><strong>Chat Enabled:</strong> {selectedDoctor.chat_enabled ? "Yes" : "No"}</p>
                  <p><strong>Created At:</strong> {selectedDoctor.created_at ? new Date(selectedDoctor.created_at).toLocaleDateString() : "N/A"}</p>
                  <p><strong>Updated At:</strong> {selectedDoctor.updated_at ? new Date(selectedDoctor.updated_at).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Address:</h3>
                  <p>{selectedDoctor.address ? (
                    <>
                      {selectedDoctor.address.street || "N/A"}, {selectedDoctor.address.city || "N/A"}, {selectedDoctor.address.state || "N/A"}, {selectedDoctor.address.postal_code || "N/A"}, {selectedDoctor.address.country || "N/A"}
                    </>
                  ) : "N/A"}</p>
                  <h3 className="text-lg font-semibold mt-4">Ratings:</h3>
                  <p>{selectedDoctor.ratings ? (
                    <>
                      Average Rating: {selectedDoctor.ratings.average_rating || "N/A"}, Total Reviews: {selectedDoctor.ratings.total_reviews || "N/A"}
                    </>
                  ) : "N/A"}</p>
                  <h3 className="text-lg font-semibold mt-4">Social Links:</h3>
                  <p>{selectedDoctor.social_links ? (
                    <>
                      LinkedIn: {selectedDoctor.social_links.linkedin ? <a href={selectedDoctor.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a> : "N/A"}, 
                      Twitter: {selectedDoctor.social_links.twitter ? <a href={selectedDoctor.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Twitter</a> : "N/A"}
                    </>
                  ) : "N/A"}</p>
                  <h3 className="text-lg font-semibold mt-4">Approval Status:</h3>
                  <p>{selectedDoctor.approval?.status || "N/A"}</p>
                  <h3 className="text-lg font-semibold mt-4">Doctor ID:</h3>
                  <p>{selectedDoctor._id || "N/A"}</p>
                </div>
              </div>

              {/* Availability and Hospital Affiliations */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Availability:</h3>
                {selectedDoctor.availability?.length ?? 0 > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedDoctor.availability?.map((slot, index) => (
                      <li key={index}>
                        {slot.day}: {slot.time_slots.join(", ")}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  Hospital Affiliations:
                </h3>
                {selectedDoctor.hospital_affiliations?.length ?? 0 > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedDoctor.hospital_affiliations?.map(
                      (affiliation, index) => (
                        <li key={index}>
                          {affiliation.name} ({affiliation.address.city},{" "}
                          {affiliation.address.state})
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  "N/A"
                )}
              </div>

              {/* Awards and Recognitions */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Awards and Recognitions:</h3>
                {selectedDoctor.awards_and_recognitions?.length ?? 0 > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedDoctor.awards_and_recognitions?.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </div>

              {/* Documents */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Documents:</h3>
                {selectedDoctor.documents?.length ?? 0 > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedDoctor.documents?.map((doc, index) => (
                      <li key={index}>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {doc.type}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </div>

              {/* Profile Picture */}
              {selectedDoctor.profile_picture_url && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={selectedDoctor.profile_picture_url}
                    alt="Doctor Profile"
                    className="w-24 h-24 rounded-full shadow-lg"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => handleApprove(selectedDoctor._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  onClick={() => handleReject(selectedDoctor._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default withAuth(ApproveRejectDoctors,['admin']);
