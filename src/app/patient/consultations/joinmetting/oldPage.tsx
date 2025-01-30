"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PatientLayout from "@/components/Patient/PatientLayout";
import JitsiMeet from "@/components/JitsiMeet";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get("token");

const JoinMeetingPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");
    const [showMetting, setShowMeeting] = useState(false);
    const { id } = React.use(params); // Unwrap params

    const jonConsultation = async () => {
        try {
            interface ConsultationResponse {
                room_name: string;
                user_name?: string;
            }

            const response = await axios.get<ConsultationResponse>(`http://192.168.0.106:8081/api/users/patient/consultations/join/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("joinMetting: ", response.data);
            if (response.data.room_name) {
                setRoomName(response.data.room_name);
                setUserName(response.data.user_name || 'Patient');
                setShowMeeting(true);
                setShowMeeting(true);
            } else {
                console.log("No Consultation found");
            }
        } catch (error) {
            console.error("Error Fatching room", error);
        }
    };

    return (
        <PatientLayout>
            <div className="">
                <h2 className="text-2xl font-bold">Patient Joining</h2>
                {!showMetting ? (
                    <div className="flex justify-center items-center h-96">
                        <button onClick={jonConsultation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Join Meeting
                        </button>
                    </div>
                ) : (
                    <JitsiMeet roomName={roomName} userName={userName} />
                )}
            </div>
        </PatientLayout>
    );
};

export default JoinMeetingPage;
