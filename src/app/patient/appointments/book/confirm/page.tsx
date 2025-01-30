"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
import PatientLayout from "@/components/Patient/PatientLayout";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Availability {
  [day: string]: { time_slots: string[] } | string[];
}

const DoctorBookingPage = () => {
  const router = useRouter();
  const doctorData =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedDoctor")
      : null;
  const doctor = doctorData ? JSON.parse(doctorData) : null;

  // -------------------------------------------------------------Date---------------------------------
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // Map days to their numeric values
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Get available day numbers from doctor availability
  const availableDays: number[] = doctor.availability.map(
    (slot: { day: keyof typeof dayMap; time_slots: string[] }) =>
      dayMap[slot.day]
  );

  const isDateAvailable = (date: Date): boolean => {
    const day: number = date.getDay(); // Get numeric day (0-6)
    return availableDays.includes(day); // Return true if the day is available
  };
  // -------------------------------------------------------------Date---------------------------------

  console.log("doctor: ", doctor);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    consultation_type: "Video",
    appointment_date: "",
    start_time: "",
    reason_for_visit: "",
    filesData: [] as File[],
  });

  useEffect(() => {
    if (!doctor) {
      console.error("Doctor details are not available.");
    }
  }, [doctor]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAppointmentDetails((prevDetails) => ({
        ...prevDetails,
        filesData: Array.from(files),
      }));
    }
  };

  const handleSubmit = () => {
    if (!doctor) {
      console.error("Doctor details are not available.");
      return;
    }

    const formData = new FormData();
    formData.append("consultation_type", appointmentDetails.consultation_type);
    formData.append("appointment_date", appointmentDetails.appointment_date);
    formData.append("start_time", appointmentDetails.start_time);
    formData.append("reason_for_visit", appointmentDetails.reason_for_visit);
    formData.append("doctor_id", doctor._id);
    formData.append("status", "Pending");
    formData.append("booking_fee", doctor.consultation_fee);
    formData.append("payment_status", "Paid");
    formData.append("time_slot", appointmentDetails.start_time);

    appointmentDetails.filesData.forEach((file) => {
      formData.append("filesData", file);
    });

    const token = Cookies.get("token");
    axios
      .post(
        `${baseURL}/api/users/patient/appointments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
        localStorage.removeItem("selectedDoctor");
        // Handle successful booking (e.g., redirect to confirmation page)
        router.push("/patient/appointments/view");
      })
      .catch((error) => console.error("Error booking appointment:", error));
  };

  if (!doctor) return <div>Loading...</div>;

  return (
    <PatientLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-8">
          {/* Going Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 bg-gray-200 rounded-lg border border-black hover:text-white hover:bg-gray-700 transition-colors"
          >
            ← Back
          </button>
          {/* Booking Section */}
          <div className="p-8">
            <button
              onClick={() => setShowBookingForm(true)}
              className="py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Book Appointment
            </button>

            {showBookingForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg relative w-2/4">
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                  <h2 className="text-2xl font-semibold mb-6">
                    Appointment Details
                  </h2>
                  <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-4">
                      <div className="flex gap-4 justify-between items-center">
                        {/* Consultation Type */}
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Consultation Type
                          </label>
                          <select
                            name="consultation_type"
                            value={appointmentDetails.consultation_type}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500"
                          >
                            <option value="Video">Video</option>
                            <option value="Audio" disabled>
                              Audio
                            </option>
                            <option value="Chat" disabled>
                              Chat
                            </option>
                          </select>
                        </div>
                        {/* Files Upload */}
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Files Upload
                          </label>
                          <input
                            type="file"
                            name="filesData"
                            onChange={handleFileChange}
                            multiple
                            className="block w-full border border-gray-300 rounded-md px-3 py-1 shadow-sm text-sm focus:ring-gray-500 focus:border-gray-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-4">
                        {/* Appointment Date */}
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Appointment Date
                          </label>
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                              setSelectedDate(date);
                              handleInputChange({
                                target: {
                                  name: "appointment_date",
                                  value: date
                                    ? date.toISOString().split("T")[0]
                                    : "",
                                },
                              } as React.ChangeEvent<HTMLInputElement>);
                            }}
                            filterDate={isDateAvailable} // Disable unavailable days
                            minDate={new Date()} // Prevent selecting past dates
                            className=" w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500"
                            placeholderText="Select a date"
                            wrapperClassName="block"
                          />
                        </div>

                        {/* Time Slot */}
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time Slot
                          </label>
                          <select
                            name="start_time"
                            value={appointmentDetails.start_time}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500"
                          >
                            {doctor.availability.map(
                              (slot: { day: string; time_slots: string[] }) => (
                                <optgroup key={slot.day} label={slot.day}>
                                  {slot.time_slots.map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}
                                </optgroup>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      {/* Reason for Visit */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reason for Visit
                        </label>
                        <textarea
                          name="reason_for_visit"
                          value={appointmentDetails.reason_for_visit}
                          onChange={handleInputChange}
                          rows={4}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start gap-8">
              <img
                src={doctor.profile_picture_url}
                alt={`${doctor.full_name}'s profile`}
                className="w-48 h-48 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {doctor.full_name}
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  <span className="font-semibold">Specialization:</span>{" "}
                  {doctor.specialization}
                </p>
                <p className="text-gray-600 mb-4">{doctor.bio}</p>
                <div className="flex gap-6">
                  <p className="text-gray-800">
                    <span className="font-semibold">Consultation Fee:</span>{" "}
                    <span className="text-gray-900">
                      ${doctor.consultation_fee}
                    </span>
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">Experience:</span>{" "}
                    <span className="text-gray-900">
                      {doctor.experience_years} years
                    </span>
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">Rating:</span>{" "}
                    <span className="text-gray-900">
                      {doctor.ratings.average_rating} (
                      {doctor.ratings.total_reviews} reviews)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Professional Details
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-medium">Qualifications:</span>{" "}
                  {doctor.qualifications}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Languages:</span>{" "}
                  {doctor.languages_spoken.join(", ")}
                </p>
                {doctor.awards_and_recognitions && (
                  <p className="text-gray-700">
                    <span className="font-medium">Awards:</span>{" "}
                    {doctor.awards_and_recognitions}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <div className="grid grid-cols-1 gap-2">
                {doctor.availability.map(
                  (slot: {
                    _id: string;
                    day: string;
                    time_slots: string[];
                  }) => (
                    <div
                      key={slot._id}
                      className="bg-gray-50 p-3 rounded-lg flex justify-between"
                    >
                      <span className="font-medium text-gray-900">
                        {slot.day}:
                      </span>
                      <span className="text-gray-600">
                        {slot.time_slots.join(", ")}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {doctor.hospital_affiliations &&
              doctor.hospital_affiliations.length > 0 && (
                <div className="col-span-2">
                  <h2 className="text-xl font-semibold mb-4">
                    Hospital Affiliations
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {doctor.hospital_affiliations.map((hospital: any) => (
                      <div
                        key={hospital._id}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <p className="text-gray-900">{hospital.name}</p>
                        <p className="text-gray-600">
                          {hospital.address.city}, {hospital.address.state}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default DoctorBookingPage;
