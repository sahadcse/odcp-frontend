"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";


interface Doctor {
    _id: string;
    doctor_id: string;
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    profile_picture_url: string;
    bio: string;
    specialization: string;
    experience_years: number;
    qualifications: string;
    license_number: string;
    consultation_fee: number;
    availability: {
        day: string;
        time_slots: string[];
    }[];
    languages_spoken: string[];
    hospital_affiliations: {
        name: string;
        address: {
            street: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
        };
    }[];
    awards_and_recognitions: string[];
    address: {
        street: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    role: string;
    status: string;
    verification_status: string;
    identity_verified: boolean;
    terms_accepted: boolean;
    consent_form_signed: boolean;
    notifications_enabled: boolean;
    documents: {
        type: string;
        url: string;
    }[];
    approval: {
        status: string;
        reason?: string;
        reviewed_by: string;
        reviewed_at: string;
    };
    created_at: string;
    updated_at: string;
    appointments: {
        appointment_id: string;
        patient_id: string;
        date: string;
        status: string;
        prescription_url: string;
        notes: string;
    }[];
}

interface DoctorProps {
    doctor: Doctor;
}
const DoctorDetails = () => {
    const router = useRouter();
    const doctor = useSelector((state) => state.doctor.selected);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!doctor) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-3xl text-red-800 text-center">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 mb-4">
                <div className="flex justify-end my-6 ">
                    <Link href="/appointment">
                        <button className="btn bg-color-primary text-white w-full rounded-lg py-2 hover:opacity-90">
                            Book Appointment
                        </button>
                    </Link>

                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
                        Doctor Details
                    </h1>

                    {/* Profile Section */}
                    <div className="bg-white p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Image, ID, and Status Section */}
                            <div>
                                <div className="flex items-center justify-around">
                                    {doctor.profile_picture_url ? (
                                        <img
                                            src={doctor.profile_picture_url}
                                            alt="Profile"
                                            className="w-32 h-32 mb-4"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-600 text-xl">
                                                {doctor.full_name}
                                            </span>
                                        </div>
                                    )}
                                    <div className="">
                                        <h2 className="text-2xl font-semibold text-gray-700">
                                            {doctor.full_name}
                                        </h2>
                                        <p className="text-gray-600">ID: {doctor.doctor_id}</p>
                                        <p className=" text-gray-600">Status: {doctor.status}</p>
                                    </div>
                                </div>
                                <p>
                                    <span className=" text-gray-600 text-justify">Bio:</span> {doctor.bio}
                                </p>
                            </div>
                            {/* Specialization, Experience, and Qualifications Section */}
                            <div className="bg-white p-6 border-x-4">
                                <h3 className="mb-4 text-gray-800">Professional Information</h3>
                                <p>
                                    <span className=" text-gray-600">Experience:</span>{" "}
                                    {doctor.experience_years} years
                                </p>
                                <p>
                                    <span className=" text-gray-600">Specialization:</span>{" "}
                                    {doctor.specialization}
                                </p>
                                <p>
                                    <span className=" text-gray-600">Qualifications:</span>{" "}
                                    {doctor.qualifications}
                                </p>
                                <p>
                                    <span className=" text-gray-600">License Number:</span>{" "}
                                    {doctor.license_number}
                                </p>
                                <p>
                                    <span className=" text-gray-600">Consultation Fee:</span> $
                                    {doctor.consultation_fee}
                                </p>
                            </div>
                            {/* Remaining Fields Section */}
                            <div className="bg-white p-6">
                                <h3 className=" mb-4 text-gray-800">Personal Information</h3>
                                <p>
                                    <span className="text-gray-600">Gender:</span> {doctor.gender}
                                </p>
                                {doctor.address && (
                                    <p>
                                        <span className=" text-gray-600">Address:</span>{" "}
                                        {`${doctor.address.street}, ${doctor.address.city}`}
                                    </p>
                                )}
                                <p>
                                    <span className=" text-gray-600">Phone Number:</span>{" "}
                                    {doctor.phone_number}
                                </p>
                                <p>
                                    <span className=" text-gray-600">Doctor Email:</span>{" "}
                                    {doctor.email}
                                </p>
                                <p>
                                    <span className=" text-gray-600">Languages Spoken:</span>{" "}
                                    {doctor.languages_spoken?.join(", ")}
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
                                {doctor.appointments && doctor.appointments.length > 0 ? (
                                    doctor.appointments.map((appointment) => (
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
                                                    Patient ID:
                                                </span>{" "}
                                                {appointment.patient_id}
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
                        {/* Middle Column */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Availability
                            </h3>
                            <ul className="space-y-4">
                                {doctor.availability.map((availability, index) => (
                                    <li
                                        key={index}
                                        className="p-4 bg-gray-50 rounded-md shadow-sm"
                                    >
                                        <p>
                                            <span className="font-semibold text-gray-600">Day:</span>{" "}
                                            {availability.day}
                                        </p>
                                        <p>
                                            <span className="font-semibold text-gray-600">
                                                Time Slots:
                                            </span>{" "}
                                            {availability.time_slots.join(", ")}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Hospital Affiliations Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Hospital Affiliations
                            </h3>
                            <ul className="space-y-4">
                                {doctor.hospital_affiliations.map((hospital, index) => (
                                    <li
                                        key={index}
                                        className="p-4 bg-gray-50 rounded-md shadow-sm"
                                    >
                                        <p>
                                            <span className="font-semibold text-gray-600">Name:</span>{" "}
                                            {hospital.name}
                                        </p>
                                        <p>
                                            <span className="font-semibold text-gray-600">
                                                Address:
                                            </span>{" "}
                                            {`${hospital.address.street}, ${hospital.address.city}, ${hospital.address.state}, ${hospital.address.postal_code}, ${hospital.address.country}`}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Right Column */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Awards and Recognitions
                            </h3>
                            <ul className="space-y-4">
                                {doctor.awards_and_recognitions.map((award, index) => (
                                    <li
                                        key={index}
                                        className="p-4 bg-gray-50 rounded-md shadow-sm"
                                    >
                                        <p>{award}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Account & Permissions
                            </h3>
                            <p>
                                <span className="font-semibold text-gray-600">Role:</span>{" "}
                                {doctor.role}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">
                                    Verification Status:
                                </span>{" "}
                                {doctor.verification_status}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">
                                    Identity Verified:
                                </span>{" "}
                                {doctor.identity_verified ? "Yes" : "No"}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">
                                    Terms Accepted:
                                </span>{" "}
                                {doctor.terms_accepted ? "Yes" : "No"}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">
                                    Consent Form Signed:
                                </span>{" "}
                                {doctor.consent_form_signed ? "Yes" : "No"}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">
                                    Notifications Enabled:
                                </span>{" "}
                                {doctor.notifications_enabled ? "Yes" : "No"}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Documents
                            </h3>
                            <ul className="space-y-4">
                                {doctor.documents && doctor.documents.length > 0 ? (
                                    doctor.documents.map((document, index) => (
                                        <li
                                            key={index}
                                            className="p-4 bg-gray-50 rounded-md shadow-sm"
                                        >
                                            <p>
                                                <span className="font-semibold text-gray-600">Type:</span>{" "}
                                                {document.type}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-gray-600">URL:</span>{" "}
                                                <a
                                                    href={document.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline break-all"
                                                >
                                                    Download Document
                                                </a>
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-600">No documents available.</p>
                                )}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Approval Information
                            </h3>
                            <p>
                                <span className="font-semibold text-gray-600">Status:</span>{" "}
                                {doctor.approval.status}
                            </p>
                            {doctor.approval.status === "Rejected" && (
                                <p>
                                    <span className="font-semibold text-gray-600">Reason:</span>{" "}
                                    {doctor.approval.reason}
                                </p>
                            )}
                            <p>
                                <span className="font-semibold text-gray-600">
                                    Reviewed By:
                                </span>{" "}
                                {doctor.approval.reviewed_by}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">
                                    Reviewed At:
                                </span>{" "}
                                {formatDate(doctor.approval.reviewed_at)}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Timestamps
                            </h3>
                            <p>
                                <span className="font-semibold text-gray-600">Created At:</span>{" "}
                                {formatDate(doctor.created_at)}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Updated At:</span>{" "}
                                {formatDate(doctor.updated_at)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DoctorDetails;
