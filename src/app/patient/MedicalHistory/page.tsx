import PatientLayout from "@/components/PatientLayout";

const MedicalHistory = () => {
    return (
        <PatientLayout>
            <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Medical History</h2>
            <div className="mt-4">
                <p><strong>Condition:</strong> Hypertension</p>
                <p><strong>Medication:</strong> Lisinopril 10mg</p>
                <p><strong>Allergies:</strong> Penicillin</p>
            </div>
            <button className="mt-4 text-blue-500 hover:underline">Add Medical History</button>
        </div>
        </PatientLayout>
    );
};

export default MedicalHistory;