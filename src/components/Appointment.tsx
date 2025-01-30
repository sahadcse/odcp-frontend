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

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
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
            } catch (err) {
                console.error("Error fetching doctors:", err);
            }
        };
        fetchDoctors();
    }, []);

    const validationSchema = Yup.object({
        doctor: Yup.string().required("Doctor is required"),
        day: Yup.string().required("Day is required"),
        timeSlot: Yup.string().required("Time slot is required"),
        consultation_type: Yup.string().required("Consultation type is required"),
        appointment_date: Yup.date().required("Consultation type is required"),
        reason: Yup.string().required("Reason is required"),
    });

    const FormFields = ({ doctors, availableTimeSlot }) => {

        const { values, setFieldValue } = useFormikContext();

        if (values.doctor && !isAuthenticated) {
            Swal.fire({
                title: "Please Login or SignUp!",
                text: "Please Login or SignUp then you can take Appointment !",
                icon: "info"
            });

            return;
        }



        useEffect(() => {
            const selectedDoctor = doctors.find(
                (doc) => doc._id === values.doctor
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

        console.log(values)

        return (
            <>
                <div>
                    <Field
                        as="select"
                        id="doctor"
                        name="doctor"
                        className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doc) => (
                            <option key={doc._id} value={doc._id}>
                                {doc.full_name}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name="doctor" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                    <Field
                        as="select"
                        id="day"
                        name="day"
                        className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                    >
                        {days.map((day) => (
                            <option key={day.id} value={day.value}>
                                {day.value}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name="day" component="div" className="text-red-500 text-sm" />
                </div>

                {values.availableTimeSlot?.length > 0 && (
                    <div>
                        <Field
                            as="select"
                            id="timeSlot"
                            name="timeSlot"
                            className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Time Slot</option>
                            {values.availableTimeSlot.map((slot) => (
                                <option key={slot.id} value={slot.value}>
                                    {slot.value}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="timeSlot" component="div" className="text-red-500 text-sm" />
                    </div>
                )}

                <div>
                    <Field
                        as="select"
                        id="consultation_type"
                        name="consultation_type"
                        className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                    >
                        {consultation_type.map((type) => (
                            <option key={type.id} value={type.value}>
                                {type.value}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name="consultation_type" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                    <Field
                        type="date"
                        id="appointment_date"
                        name="appointment_date"
                        className="block w-full rounded-full border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                    <ErrorMessage name="reason" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                    <Field
                        as="textarea"
                        id="reason"
                        name="reason"
                        placeholder="Reason for visit"
                        className="block w-full rounded-full border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                    <ErrorMessage name="reason" component="div" className="text-red-500 text-sm" />
                </div>
            </>
        );
    };

    return (
        <div className="relative my-5 lg:my-32 mx-auto max-w-7xl bg-[url('../images/appointment_bg.jpg')] bg-no-repeat">
            <div className="absolute inset-0 bg-[#08595a]/75 z-0"></div>
            <div className="relative flex flex-col items-center">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8 w-full lg:w-3/4">
                    <div className="w-full lg:w-1/2 py-24 p-10 flex flex-col items-center">
                        <div className="text-center mb-8">
                            <p className="text-white text-xl font-bold">| Appointment</p>
                            <h1 className="text-white text-3xl lg:text-4xl font-semibold">
                                Apply For Free Now
                            </h1>
                        </div>

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
                                        booking_fee: doctors.find(item => item._id === values.doctor).consultation_fee || 0
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
                                <Form className="space-y-4 w-full">
                                    <FormFields doctors={doctors} availableTimeSlot={values.availableTimeSlot} />
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="btn rounded-full bg-white text-black text-base mt-4 lg:w-72"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    <div className="hidden lg:block w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative">
                        <Image
                            src={DoctorImg}
                            alt="Doctor"
                            className="max-w-full h-auto"
                            style={{ position: "absolute", top: "-2", bottom: "0" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
