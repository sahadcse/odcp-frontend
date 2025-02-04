"use client";

import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import DoctorImg from "../images/appoinment_img.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { authHeader } from "@/utils";
import Swal from "sweetalert2";
import useisAuthenticated from "@/hooks/useIsAuthenticated";

const days = [
    { id: 0, value: "Select Day" },
    { id: 1, value: "Saturday" },
    { id: 2, value: "Sunday" },
    { id: 3, value: "Monday" },
    { id: 4, value: "Tuesday" },
    { id: 5, value: "Wednesday" },
    { id: 6, value: "Thursday" },
    { id: 7, value: "Friday" },
];

const consultation_type = [
    { id: "", value: "Select Type" },
    { id: "1", value: "Video" },
];

interface Doctor {
    _id: string;
    full_name: string;
    consultation_fee: number;
    specialization: string; // Add this field
    availability?: Array<{
        day: string;
        time_slots: string[];
    }>;
}

const Appointment = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
    const isAuthenticated = useisAuthenticated();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/public/doctor/all`,
                    {
                        headers: authHeader(),
                    }
                );
                setDoctors(response.data);
                // Extract unique specializations
                const uniqueSpecializations = [...new Set(response.data.map((doc: Doctor) => doc.specialization))] as string[];
                setSpecializations(uniqueSpecializations);
            } catch (err) {
                console.error("Error fetching doctors:", err);
            }
        };
        fetchDoctors();
    }, []);

    // Filter doctors based on specialization
    const filteredDoctors = selectedSpecialization
        ? doctors.filter(doc => doc.specialization === selectedSpecialization)
        : doctors;

    const validationSchema = Yup.object({
        doctor: Yup.string().required("Doctor is required"),
        day: Yup.string().required("Day is required"),
        timeSlot: Yup.string().required("Time slot is required"),
        consultation_type: Yup.string().required("Consultation type is required"),
        appointment_date: Yup.date().required("Consultation type is required"),
        reason: Yup.string().required("Reason is required"),
    });

    interface FormValues {
        doctor: string;
        day: string;
        timeSlot: string;
        consultation_type: string;
        reason: string;
        availableTimeSlot: Array<{ id: number; value: string }>;
        time_slot: string;
        appointment_date: string;
    }

    interface FormFieldsProps {
        doctors: Doctor[];
        availableTimeSlot: Array<{ id: number; value: string }>;
    }

    const FormFields = ({ doctors, availableTimeSlot }: FormFieldsProps) => {
        const { values, setFieldValue } = useFormikContext<FormValues>();

        if (values.doctor && !isAuthenticated) {
            Swal.fire({
                title: "Please Login or SignUp!",
                text: "Please Login or SignUp then you can take Appointment !",
                icon: "info"
            });

            return;
        }

        useEffect(() => {
            interface Doctor {
                _id: string;
                full_name: string;
                consultation_fee: number;
                availability?: Array<{
                    day: string;
                    time_slots: string[];
                }>;
            }

            const selectedDoctor: Doctor | undefined = doctors.find(
                (doc: Doctor) => doc._id === values.doctor
            );
            if (selectedDoctor?.availability) {
                const timeSlots = selectedDoctor.availability
                    .filter((item) => item.day === values.day)
                    .flatMap((item) =>
                        item.time_slots.map((slot, index) => ({
                            id: index,
                            value: slot,
                        }))
                    );
                setFieldValue("availableTimeSlot", timeSlots);
            } else {
                setFieldValue("availableTimeSlot", []);
            }
        }, [values.doctor, values.day, doctors, setFieldValue]);

        // console.log(values)

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Specialization Filter */}
                <div className="">
                    <label className="block text-white text-sm font-medium mb-2">
                        Filter by Specialization
                    </label>
                    <select
                        className="w-full outline-none px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md 
                        border border-white/20 text-white placeholder-white/60 focus:ring-2 
                        focus:ring-teal-500 focus:border-transparent transition duration-200"
                        value={selectedSpecialization}
                        onChange={(e) => setSelectedSpecialization(e.target.value)}
                    >
                        <option value="" className="text-black">All Specializations</option>
                        {specializations.map((spec) => (
                            <option key={spec} value={spec} className="text-black">
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="">
                    <label className="block text-white text-sm font-medium mb-2">Select Doctor</label>
                    <Field
                        as="select"
                        id="doctor"
                        name="doctor"
                        className="w-full outline-none px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md 
                        border border-white/20 text-white placeholder-white/60 focus:ring-2 
                        focus:ring-teal-500 focus:border-transparent transition duration-200"
                    >
                        <option value="">Select Doctor</option>
                        {filteredDoctors.map((doc) => (
                            <option key={doc._id} value={doc._id} className="text-black">
                                {doc.full_name} - {doc.specialization}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name="doctor" component="div" className="mt-1 text-red-400 text-sm" />
                </div>

                <div>
                    <label className="block text-white text-sm font-medium mb-2">Select Day</label>
                    <Field
                        as="select"
                        id="day"
                        name="day"
                        className="w-full outline-none px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md 
                        border border-white/20 text-white placeholder-white/60 focus:ring-2 
                        focus:ring-teal-500 focus:border-transparent transition duration-200"
                    >
                        {days.map((day) => (
                            <option key={day.id} value={day.value} className="text-black">
                                {day.value}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name="day" component="div" className="mt-1 text-red-400 text-sm" />
                </div>

                {values.availableTimeSlot?.length > 0 && (
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Select Time</label>
                        <Field
                            as="select"
                            id="timeSlot"
                            name="timeSlot"
                            className="w-full outline-none px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md 
                            border border-white/20 text-white placeholder-white/60 focus:ring-2 
                            focus:ring-teal-500 focus:border-transparent transition duration-200"
                        >
                            <option value="">Select Time Slot</option>
                            {values.availableTimeSlot.map((slot) => (
                                <option key={slot.id} value={slot.value} className="text-black">
                                    {slot.value}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="timeSlot" component="div" className="mt-1 text-red-400 text-sm" />
                    </div>
                )}

                <div className="">
                    <label className="block text-white text-sm font-medium mb-2">Appointment Date</label>
                    <Field
                        type="date"
                        id="appointment_date"
                        name="appointment_date"
                        className="w-full outline-none px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md 
                        border border-white/20 text-white placeholder-white/60 focus:ring-2 
                        focus:ring-teal-500 focus:border-transparent transition duration-200"
                    />
                    <ErrorMessage name="appointment_date" component="div" className="mt-1 text-red-400 text-sm" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-white text-sm font-medium mb-2">Reason for Visit</label>
                    <Field
                        as="textarea"
                        id="reason"
                        name="reason"
                        rows={4}
                        placeholder="Please describe your symptoms or reason for visit"
                        className="w-full outline-none px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md 
                        border border-white/20 text-white placeholder-white/60 focus:ring-2 
                        focus:ring-teal-500 focus:border-transparent transition duration-200 "
                    />
                    <ErrorMessage name="reason" component="div" className="mt-1 text-red-400 text-sm" />
                </div>
            </div>
        );
    };

    return (
        <div className="relative min-h-screen py-20 bg-gradient-to-br from-teal-900 to-slate-900">
            <div className="absolute inset-0 bg-[url('../images/appointment_bg.jpg')] bg-cover bg-center opacity-10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Book Your Appointment
                    </h2>
                    <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-8">
                        <Formik
                            initialValues={{
                                doctor: "",
                                day: "",
                                timeSlot: "",
                                consultation_type: "",
                                reason: "",
                                availableTimeSlot: [],
                                time_slot: "",
                                appointment_date: ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { resetForm, setSubmitting }) => {
                                try {
                                    setSubmitting(true);

                                    // Prepare the data to send
                                    const payload = {
                                        doctor_id: values.doctor,
                                        consultation_type: values.consultation_type,
                                        appointment_date: values.appointment_date,
                                        time_slot: values.timeSlot,
                                        status: "Pending",
                                        reason_for_visit: values.reason,
                                        booking_fee: doctors.find(item => item._id === values.doctor)?.consultation_fee || 0
                                        ,
                                        payment_status: "Paid"
                                    };

                                    // Make the POST API call
                                    const response = await axios.post(
                                        `${process.env.NEXT_PUBLIC_API_URL}/api/users/patient/appointments`,
                                        payload,
                                        { headers: authHeader() }
                                    );

                                    // Handle successful submission
                                    Swal.fire({
                                        title: "Thank You!",
                                        text: "Your Appointment booked successfully!",
                                        icon: "success"
                                    });
                                    resetForm();
                                } catch (error) {
                                    console.error("Error submitting appointment:", error);
                                    alert("There was an error booking the appointment. Please try again.");
                                } finally {
                                    setSubmitting(false); // Stop the form submission loading state
                                }
                            }}
                        >
                            {({ isSubmitting, values }) => (
                                <Form className="space-y-8">
                                    <FormFields doctors={doctors} availableTimeSlot={values.availableTimeSlot} />
                                    <div className="text-center pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center px-8 py-3 rounded-lg 
                                            bg-teal-500 hover:bg-teal-600 text-white font-semibold 
                                            transition duration-200 transform hover:scale-105 
                                            disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                'Book Appointment'
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
