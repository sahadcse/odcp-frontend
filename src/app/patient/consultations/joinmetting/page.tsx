"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PatientLayout from "@/components/Patient/PatientLayout";
import VideoCall from "@/components/VideoCall";
import Cookies from "js-cookie";
import axios from "axios";

export default function PatientDashboard() {
  const [room_name, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false); // Add this state
  const [files, setFiles] = useState<File[]>([]);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const idFromQuery = query.get("id");
    if (idFromQuery) {
      setId(idFromQuery);
      fetchRoomName(idFromQuery);
    }
  }, []);

  const fetchRoomName = async (id: string) => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await axios.get(
        `${baseURL}/api/users/patient/consultations/join/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.room_name) {
        setRoomId(response.data.room_name);
        setIsActive(response.data.isActive); // Add this line to get isActive status
      } else {
        setError("No room name received from server");
      }
    } catch (error) {
      console.error("Error fetching room name:", error);
      setError("Failed to fetch room details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = () => {
    if (room_name) {
      setJoined(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => formData.append("medical_reports", file));

      try {
        const token = Cookies.get("token");
        await axios.post(
          `${baseURL}/api/users/patient/consultations/${id}/files`, // Ensure id is used here
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Files uploaded successfully");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  return (
    <PatientLayout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Consultation Room</h2>
        <div className="flex gap-3">
          {/* Video Call Section */}
          <div className="w-[65%]">
            {isLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2">Loading consultation room...</p>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : !joined ? (
              <div className="text-center">
                <button
                  onClick={handleJoin}
                  disabled={!room_name}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Join Meeting
                </button>
                {!isActive && room_name && (
                  <p className="mt-3 text-yellow-600 bg-yellow-100 p-2 rounded">
                    Please wait. The doctor hasn't joined the consultation yet.
                  </p>
                )}
              </div>
            ) : room_name ? (
              <VideoCall room_name={room_name} role="patient" />
            ) : (
              <p>No room available</p>
            )}
          </div>

          {/* File Upload */}
          <div className="mt-4">
            <div className="">
              {/* <label className=" text-sm font-medium text-gray-700 mb-2">
                    Upload Medical Reports
                  </label> */}
              <input
                type="file"
                multiple
                className="w-52 text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                onChange={handleFileChange}
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-4 transition"
              onClick={handleUpload}
            >
              Upload Medical Reports
            </button>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
