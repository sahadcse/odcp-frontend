"use client";
import React, { useState, useEffect } from 'react';
import DoctorLayout from '@/components/DoctorLayout';
import DashboardHeroNav from '@/components/DoctorHero/DashboardHeroNav';
import { fetchProfileData } from '@/data/profileData';

interface ProfileData {
    role: string;
    // Add other properties if needed
}

const PatientRecordsPage = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const data = await fetchProfileData();
                setProfileData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        getProfileData();
    }, []);

    const patientRecords = [
        { id: 1, name: 'John Doe', age: 30, condition: 'Flu' },
        { id: 2, name: 'Jane Smith', age: 25, condition: 'Cold' },
        { id: 3, name: 'Sam Johnson', age: 40, condition: 'Diabetes' },
    ];

    if (error) {
        return <p className="text-red-500 text-center mt-4">{error}</p>;
    }

    if (!profileData) {
        return <p className="text-center mt-4">Loading...</p>;
    }

    return (
        <DoctorLayout>
            {/* Hero Card Section */}
            <DashboardHeroNav headName={`Dashboard ${profileData.role}`} />
            <div>
                <h1>Patient Records</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientRecords.map(record => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.name}</td>
                                <td>{record.age}</td>
                                <td>{record.condition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DoctorLayout>
    );
};

export default PatientRecordsPage;