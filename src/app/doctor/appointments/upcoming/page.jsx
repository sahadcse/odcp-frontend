"use client";
import { useEffect, useState } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import { authHeader } from "@/utils";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa"; // React Icons
import Swal from "sweetalert2"; // SweetAlert2
import withAuth from "@/common/WithAuth";
import { useRouter } from "next/navigation";

const AppointmentsDoc = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${BACKEND_API_URL}/api/users/doctor/appointments`, {
                    headers: authHeader(),
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch appointments");
                }
                const data = await response.json();
                const filterData = data.filter((appointment) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Set to midnight to ignore time

                    const appointmentDate = new Date(appointment.appointment.appointment_date);
                    appointmentDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time

                    console.log('Today:', today.toString());
                    console.log('Appointment Date:', appointmentDate.toString());

                    return today < appointmentDate; // Compare only the dates, ignoring time
                });

                console.log('Filtered Appointments:', filterData); // Debugging filtered data
                setAppointments(filterData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);



    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleViewPatientDetails = (appointment) => {
        router.push(`/doctor/appointments/patient/${appointment.appointment.patient_id._id}`)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    console.log("ap", appointments);
    console.log("app", selectedAppointment);
    const handleApprove = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to confirm this appointment!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#08595a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `${BACKEND_API_URL}/api/users/doctor/appointments/${selectedAppointment.appointment._id}/confirm`,
                        {
                            method: "PUT",
                            headers: {
                                ...authHeader(),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ status: "Confirmed" }),
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to approve the appointment");
                    }

                    const updatedAppointments = appointments.map((appointment) =>
                        appointment.appointment._id === selectedAppointment.appointment._id
                            ? { ...appointments.appointment, status: "Confirmed" }
                            : appointment
                    );
                    setAppointments(updatedAppointments);
                    setIsModalOpen(false);

                    Swal.fire({
                        title: "Confirmed!",
                        text: "Appointment has been confirmed.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } catch (err) {
                    setError(err.message);
                    Swal.fire({
                        title: "Error",
                        text: `Failed to confirm the appointment: ${err.message}`,
                        icon: "error",
                        confirmButtonText: "Try Again",
                    });
                }
            }
        });
    };

    const handleCancel = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#08595a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `${BACKEND_API_URL}/api/users/doctor/appointments/${selectedAppointment.appointment._id}/cancel`,
                        {
                            method: "PUT",
                            headers: {
                                ...authHeader(),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ status: "Cancelled" }),
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to cancel the appointment");
                    }

                    const updatedAppointments = appointments.map((appointment) =>
                        appointment.appointment._id === selectedAppointment.appointment._id
                            ? { ...appointments.appointment, status: "Cancelled" }
                            : appointment
                    );
                    setAppointments(updatedAppointments);
                    setIsModalOpen(false);

                    Swal.fire({
                        title: "Cancelled!",
                        text: "Appointment has been cancelled.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } catch (err) {
                    setError(err.message);
                    Swal.fire({
                        title: "Error",
                        text: `Failed to cancel the appointment: ${err.message}`,
                        icon: "error",
                        confirmButtonText: "Try Again",
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <DoctorLayout>
                <DashboardHeroNav headName="Appointments" />
                <div className="p-6 flex justify-center items-center">Loading appointments...</div>
            </DoctorLayout>
        );
    }

    if (error) {
        return (
            <DoctorLayout>
                <DashboardHeroNav headName="Appointments" />
                <div className="p-6 text-red-500">Error: {error}</div>
            </DoctorLayout>
        );
    }

    return (
        <DoctorLayout>
            <DashboardHeroNav headName="Appointments" />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="grid grid-cols-1 gap-6">
                    <section className="bg-white p-6 rounded-lg shadow w-full">
                        <h2 className="text-xl font-medium mb-4">
                            Upcoming Appointments ({appointments.length})
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse border border-gray-200">
                                <thead className="bg-color-primary text-white">
                                    <tr>
                                        <th className="px-4 py-2 border">Sl.</th>
                                        <th className="px-4 py-2 border">Patient</th>
                                        <th className="px-4 py-2 border">Resion</th>
                                        <th className="px-4 py-2 border">Time</th>
                                        <th className="px-4 py-2 border">Status</th>
                                        <th className="px-4 py-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment, index) => (
                                        <tr
                                            key={appointment.appointment?._id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-2 border">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                {appointment.appointment?.patient_id?.full_name}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                {appointment.appointment?.
                                                    reason_for_visit}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {appointment.appointment?.time_slot}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-sm ${appointment.appointment?.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : appointment.appointment?.status === "Confirmed"
                                                            ? "bg-green-200 text-green-800"
                                                            : "bg-red-200 text-gray-800"
                                                        }`}
                                                >
                                                    {appointment.appointment?.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 border">
                                                <div className="dropdown">
                                                    <div tabIndex={0} role="button" className="btn m-1 bg-color-primary text-white">Action</div>
                                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                        <li><a><button
                                                            onClick={() => handleViewDetails(appointment)}
                                                            className="text-blue-500 hover:underline flex items-center"
                                                        >
                                                            <FaEye className="mr-2" />Approve
                                                        </button></a></li>
                                                        <li><a><button
                                                            onClick={() => handleViewPatientDetails(appointment)}
                                                            className="text-blue-500 hover:underline flex items-center"
                                                        >
                                                            <FaEye className="mr-2" />view Patient
                                                        </button></a></li>
                                                    </ul>
                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-w-xl">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            Appointment Details
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex justify-between">
                                <span className="font-medium">Patient ID:</span>
                                <span>{selectedAppointment.appointment?.patient_id?._id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Patient Name:</span>
                                <span>{selectedAppointment.appointment?.patient_id?.full_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Date:</span>
                                <span>
                                    {new Date(
                                        selectedAppointment.appointment.appointment_date
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Time:</span>
                                <span>{selectedAppointment.appointment.time_slot}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Type:</span>
                                <span>{selectedAppointment.appointment.consultation_type}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            {selectedAppointment.appointment.status === "Pending" &&

                                <><button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                                >
                                    <FaCheckCircle className="inline mr-2" />
                                    Approve
                                </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                                    >
                                        <FaTimesCircle className="inline mr-2" />
                                        Cancel
                                    </button></>

                            }
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DoctorLayout>
    );
};

export default withAuth(AppointmentsDoc);
