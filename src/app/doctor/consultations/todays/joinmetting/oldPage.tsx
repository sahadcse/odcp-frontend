"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DoctorLayout from "@/components/DoctorLayout";
import JitsiMeet from "@/components/JitsiMeet";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get("token");

const JoinMeetingPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [roomName, setRoomName] = useState("");
  const [showMetting, setShowMeeting] = useState(false);

  const jonConsultation = async () => {
    try {
      interface ConsultationResponse {
        consultation: {
          room_name: string;
        };
        user_name?: string;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      console.log("id: ", id);

      const response = await axios.patch<ConsultationResponse>(
        `http://192.168.0.106:8081/api/users/doctor/consultations/room/create`,
        {
          consultationId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("joinMetting: ", response?.data.consultation.room_name);
      if (response.data.consultation.room_name) {
        setRoomName(response.data.consultation.room_name);
        setShowMeeting(true);
      } else {
        console.log("Error creating room! joinconsultationFunction");
      }
    } catch (error) {
      console.error("Error creating room!", error);
    }
  };

  return (
    <DoctorLayout>
      <div className="">
        <h2 className="text-2xl font-bold">Doctor Joining</h2>
        {!showMetting ? (
          <div className="flex justify-center items-center h-96">
            <button
              onClick={jonConsultation}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Join Meeting
            </button>
          </div>
        ) : (
          <JitsiMeet roomName={roomName} userName="Doctor" />
        )}
      </div>
    </DoctorLayout>
  );
};

export default JoinMeetingPage;
