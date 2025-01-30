"use client"
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface PrescriptionFormProps {
  id: string;
}

interface Medicine {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface PrescriptionData {
  patient: {
    weight: string;
  };
  vitals: {
    bp: string;
    temp: string;
    heartRate: number;
  };
  consultation_id: string;
  symptoms: string[];
  diagnosis: string;
  allergies: string;
  prescription: Medicine[];
  lifestyleRecommendations: string[];
  recommendedTests: string[];
  followUp: string;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ id }) => {
  const [formData, setFormData] = useState<PrescriptionData>({
    patient: { weight: "" },
    vitals: { bp: "", temp: "", heartRate: 0 },
    consultation_id: id, // This will now be set correctly from props
    symptoms: [""],
    diagnosis: "",
    allergies: "",
    prescription: [
      {
        medicine: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ],
    lifestyleRecommendations: [""],
    recommendedTests: [""],
    followUp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");

      // Clean and structure the data according to the required format
      const cleanedData = {
        patient: formData.patient,
        symptoms: formData.symptoms.filter((s) => s.trim() !== ""),
        vitals: formData.vitals,
        diagnosis: formData.diagnosis,
        allergies: formData.allergies,
        prescription: formData.prescription.filter(
          (p) => p.medicine.trim() !== ""
        ),
        lifestyleRecommendations: formData.lifestyleRecommendations.filter(
          (r) => r.trim() !== ""
        ),
        recommendedTests: formData.recommendedTests.filter(
          (t) => t.trim() !== ""
        ),
        followUp: formData.followUp,
      };

      await axios.post(
        `${baseURL}/api/users/doctor/consultations/${id}/prescription`,
        cleanedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Prescription saved successfully");
      setFormData({
        patient: { weight: "" },
        vitals: { bp: "", temp: "", heartRate: 0 },
        consultation_id: id,
        symptoms: [""],
        diagnosis: "",
        allergies: "",
        prescription: [
          {
            medicine: "",
            dosage: "",
            frequency: "",
            duration: "",
            instructions: "",
          },
        ],
        lifestyleRecommendations: [""],
        recommendedTests: [""],
        followUp: "",
      });
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Failed to save prescription");
    }
  };

  const handleArrayFieldChange = (
    field: keyof Pick<
      PrescriptionData,
      "symptoms" | "lifestyleRecommendations" | "recommendedTests"
    >,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (
    field: keyof Pick<
      PrescriptionData,
      "symptoms" | "lifestyleRecommendations" | "recommendedTests"
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleMedicineChange = (
    index: number,
    field: keyof Medicine,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      prescription: prev.prescription.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      ),
    }));
  };

  const addMedicine = () => {
    setFormData((prev) => ({
      ...prev,
      prescription: [
        ...prev.prescription,
        {
          medicine: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow"
    >
      {/* Patient Vitals */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight
          </label>
          <input
            type="text"
            value={formData.patient.weight}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                patient: { weight: e.target.value },
              }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Pressure
          </label>
          <input
            type="text"
            value={formData.vitals.bp}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                vitals: { ...prev.vitals, bp: e.target.value },
              }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperature
          </label>
          <input
            type="text"
            value={formData.vitals.temp}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                vitals: { ...prev.vitals, temp: e.target.value },
              }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heart Rate
          </label>
          <input
            type="number"
            value={formData.vitals.heartRate}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                vitals: { ...prev.vitals, heartRate: parseInt(e.target.value) },
              }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Symptoms
        </label>
        {formData.symptoms.map((symptom, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={symptom}
              onChange={(e) =>
                handleArrayFieldChange("symptoms", index, e.target.value)
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField("symptoms")}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Add Symptom
        </button>
      </div>

      {/* Diagnosis and Allergies */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Diagnosis
          </label>
          <input
            type="text"
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, diagnosis: e.target.value }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Allergies
          </label>
          <input
            type="text"
            value={formData.allergies}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, allergies: e.target.value }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Medicines */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medicines
        </label>
        {formData.prescription.map((med, index) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <input
              placeholder="Medicine"
              value={med.medicine}
              onChange={(e) =>
                handleMedicineChange(index, "medicine", e.target.value)
              }
              className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              placeholder="Dosage"
              value={med.dosage}
              onChange={(e) =>
                handleMedicineChange(index, "dosage", e.target.value)
              }
              className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              placeholder="Frequency"
              value={med.frequency}
              onChange={(e) =>
                handleMedicineChange(index, "frequency", e.target.value)
              }
              className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              placeholder="Duration"
              value={med.duration}
              onChange={(e) =>
                handleMedicineChange(index, "duration", e.target.value)
              }
              className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              placeholder="Instructions"
              value={med.instructions}
              onChange={(e) =>
                handleMedicineChange(index, "instructions", e.target.value)
              }
              className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addMedicine}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Add Medicine
        </button>
      </div>

      {/* Lifestyle Recommendations */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Lifestyle Recommendations
        </label>
        {formData.lifestyleRecommendations.map((rec, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={rec}
              onChange={(e) =>
                handleArrayFieldChange(
                  "lifestyleRecommendations",
                  index,
                  e.target.value
                )
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField("lifestyleRecommendations")}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Add Recommendation
        </button>
      </div>

      {/* Recommended Tests */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Recommended Tests
        </label>
        {formData.recommendedTests.map((test, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={test}
              onChange={(e) =>
                handleArrayFieldChange(
                  "recommendedTests",
                  index,
                  e.target.value
                )
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField("recommendedTests")}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Add Test
        </button>
      </div>

      {/* Follow Up */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Follow Up
        </label>
        <input
          type="text"
          value={formData.followUp}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, followUp: e.target.value }))
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Prescription
        </button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
