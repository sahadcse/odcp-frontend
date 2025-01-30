"use client";

import React, { useState, useEffect } from 'react';
import DoctorLayout from '@/components/DoctorLayout';
import DashboardHeroNav from '@/components/DoctorHero/DashboardHeroNav';
import { fetchProfileData } from '@/data/profileData';

interface ProfileData {
    role: string;
    // Add other properties if needed
}

const ConsultHistoryPage: React.FC = () => {
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

    const consultHistory = [
        { id: 1, patientName: 'John Doe', date: '2023-01-01', notes: 'Follow-up in 2 weeks' },
        { id: 2, patientName: 'Jane Smith', date: '2023-01-05', notes: 'Prescribed medication' },
        { id: 3, patientName: 'Sam Johnson', date: '2023-01-10', notes: 'Referred to specialist' },
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
                <h1>Consult History</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient Name</th>
                            <th>Date</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultHistory.map(record => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.patientName}</td>
                                <td>{record.date}</td>
                                <td>{record.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DoctorLayout>
    );
};

export default ConsultHistoryPage;
