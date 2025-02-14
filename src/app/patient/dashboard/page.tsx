"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PatientLayout from "@/components/Patient/PatientLayout";
import {
  FaCalendarCheck,
  FaUserMd,
  FaComment,
  FaPlusCircle,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [healthStats, setHealthStats] = useState({
    bloodPressure: "120/80",
    heartRate: "72",
    weight: "70",
    lastCheckup: "2024-01-15",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");

        const appointmentsResponse = await axios.get(
          `${baseURL}/api/users/patient/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(appointmentsResponse.data);

        const consultationsResponse = await axios.get(
          `${baseURL}/api/users/patient/consultations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (consultationsResponse.data.length > 0) {
          setConsultations(consultationsResponse.data);
        }

        const doctorsResponse = await axios.get(
          `${baseURL}/api/users/patient/doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(doctorsResponse.data);

        // Get recent appointments
        const recentAppsResponse = await axios.get(
          `${baseURL}/api/users/patient/appointments/recent`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecentAppointments(recentAppsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const QuickActions = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
      <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
        <FaPlusCircle className="text-blue-500 text-2xl mb-2" />
        <span className="text-sm font-medium">New Appointment</span>
      </button>
      <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
        <FaFileAlt className="text-green-500 text-2xl mb-2" />
        <span className="text-sm font-medium">View Reports</span>
      </button>
      <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
        <FaComment className="text-purple-500 text-2xl mb-2" />
        <span className="text-sm font-medium">Message Doctor</span>
      </button>
    </div>
  );

  return (
    <PatientLayout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6">Welcome back!</h2>

          <QuickActions />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white shadow rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Upcoming Appointments</p>
                  <h3 className="text-2xl font-bold">{appointments.length}</h3>
                </div>
                <FaCalendarCheck className="text-blue-500 text-3xl" />
              </div>
            </div>
            <div className="p-4 bg-white shadow rounded flex justify-between items-center">
              <h3 className="text-xl font-semibold">Consultations</h3>
              <p className="text-2xl">{consultations.length}</p>
            </div>
            <div className="p-4 bg-white shadow rounded flex justify-between items-center">
              <h3 className="text-xl font-semibold">Doctors</h3>
              <p className="text-2xl">{doctors.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">
                Recent Appointments
              </h3>
              <div className="space-y-4">
                {recentAppointments.slice(0, 3).map((apt: any) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div className="flex items-center">
                      <FaClock className="text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium">{apt.doctorName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(apt.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        apt.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : apt.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Health Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Blood Pressure</p>
                  <p className="text-lg font-semibold">
                    {healthStats.bloodPressure}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Heart Rate</p>
                  <p className="text-lg font-semibold">
                    {healthStats.heartRate} bpm
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="text-lg font-semibold">
                    {healthStats.weight} kg
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Last Checkup</p>
                  <p className="text-lg font-semibold">
                    {new Date(healthStats.lastCheckup).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PatientLayout>
  );
};

export default PatientDashboard;
