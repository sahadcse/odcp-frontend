"use client";

import { useEffect, useState } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import { authHeader } from "@/utils";
import withAuth from "@/common/WithAuth";
import { useParams } from "next/navigation";

const ConsultationsDetails = () => {
    const [consultation, setConsultation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [prescription, setPrescription] = useState({
        medications: [
            { name: "", dosage: "", frequency: "", duration: "" },
        ],
        advice: "",
        created_at: new Date().toISOString(),
    });
    const [submitStatus, setSubmitStatus] = useState(null);
    const params = useParams();

    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchConsultation = async () => {
            try {
                const response = await fetch(
                    `${BACKEND_API_URL}/api/users/doctor/consultations/${params?.id}`,
                    {
                        headers: authHeader(),
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch consultation details");
                }
                const data = await response.json();
                setConsultation(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConsultation();
    }, [params?.id]);

    const handleStart = async () => {
        try {
            const response = await fetch(
                `${BACKEND_API_URL}/api/users/doctor/consultations/${params?.id}/start`,
                {
                    method: "POST",
                    headers: authHeader(),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to start consultation");
            }
            setIsStarted(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleComplete = async () => {
        try {
            const response = await fetch(
                `${BACKEND_API_URL}/api/users/doctor/consultations/${params?.id}/complete`,
                {
                    method: "POST",
                    headers: authHeader(),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to complete consultation");
            }
            setIsComplete(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = async () => {
        try {
            const response = await fetch(
                `${BACKEND_API_URL}/api/users/doctor/consultations/${params?.id}/cancel`,
                {
                    method: "PUT",
                    headers: authHeader(),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to cancel consultation");
            }
            alert("Consultation canceled successfully!");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedMedications = [...prescription.medications];
        updatedMedications[index][field] = value;
        setPrescription({ ...prescription, medications: updatedMedications });
    };

    const handleAddMedication = () => {
        setPrescription({
            ...prescription,
            medications: [
                ...prescription.medications,
                { name: "", dosage: "", frequency: "", duration: "" },
            ],
        });
    };

    const handleRemoveMedication = (index) => {
        const updatedMedications = prescription.medications.filter((_, i) => i !== index);
        setPrescription({ ...prescription, medications: updatedMedications });
    };

    const handleSubmitPrescription = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${BACKEND_API_URL}/api/users/doctor/consultations/${params?.id}/prescription`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader(),
                    },
                    body: JSON.stringify({ prescription }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to submit prescription");
            }
            setSubmitStatus("Prescription submitted successfully!");
        } catch (err) {
            setSubmitStatus(`Error: ${err.message}`);
        }
    };

    if (loading) {
        return (
            <DoctorLayout>
                <DashboardHeroNav headName="Consultation Details" />
                <div className="p-6 flex justify-center items-center">Loading consultation details...</div>
            </DoctorLayout>
        );
    }

    if (error) {
        return (
            <DoctorLayout>
                <DashboardHeroNav headName="Consultation Details" />
                <div className="p-6 text-red-500">Error: {error}</div>
            </DoctorLayout>
        );
    }

    return (
        <DoctorLayout>
            <DashboardHeroNav headName="Consultation Details" />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">Consultation Details</h2>
                    <div className="space-y-4">
                        <div>
                            <strong className="block text-gray-600">Patient ID:</strong>
                            <p className="text-gray-800">{consultation.patient_id}</p>
                        </div>
                        <div>
                            <strong className="block text-gray-600">Appointment ID:</strong>
                            <p className="text-gray-800">{consultation.appointment_id}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex space-x-4">
                        {!isStarted  ? (
                            <button
                                onClick={handleStart}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Start
                            </button>
                        ) : !isComplete ? (
                            <>
                                <a
                                    href="https://meet.google.com/cve-rezn-ucr" // Replace with your dynamic Meet link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Join Google Meet
                                </a>
                                <button
                                    onClick={handleComplete}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Complete
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <form onSubmit={handleSubmitPrescription} className="mt-6 space-y-4">
                                <h3 className="text-lg font-bold text-gray-700">Prescription Form</h3>
                                {prescription.medications.map((medication, index) => (
                                    <div key={index} className="space-y-2">
                                        <input
                                            type="text"
                                            placeholder="Medication Name"
                                            value={medication.name}
                                            onChange={(e) =>
                                                handleInputChange(index, "name", e.target.value)
                                            }
                                            className="border p-2 w-full"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Dosage"
                                            value={medication.dosage}
                                            onChange={(e) =>
                                                handleInputChange(index, "dosage", e.target.value)
                                            }
                                            className="border p-2 w-full"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Frequency"
                                            value={medication.frequency}
                                            onChange={(e) =>
                                                handleInputChange(index, "frequency", e.target.value)
                                            }
                                            className="border p-2 w-full"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Duration"
                                            value={medication.duration}
                                            onChange={(e) =>
                                                handleInputChange(index, "duration", e.target.value)
                                            }
                                            className="border p-2 w-full"
                                        />
                                        {prescription.medications.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMedication(index)}
                                                className="text-red-500 text-sm"
                                            >
                                                Remove Medication
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddMedication}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add Medication
                                </button>
                                <textarea
                                    placeholder="Advice"
                                    value={prescription.advice}
                                    onChange={(e) =>
                                        setPrescription({ ...prescription, advice: e.target.value })
                                    }
                                    className="border p-2 w-full mt-4"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Submit Prescription
                                </button>
                                {submitStatus && <p className="mt-2 text-gray-700">{submitStatus}</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
};

export default withAuth(ConsultationsDetails, ["doctor"]);
