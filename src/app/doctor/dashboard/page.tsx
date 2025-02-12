"use client";

import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import TotalCard from "@/components/DoctorHero/TotalCard";
import TotalPatient from "../../../images/totalPatient.png";
import TodayPatient from "../../../images/todayPatient.png";
import TodayAppointmentss from "../../../images/TodayAppintments.png";
import getTodaysDate from "@/utils/getTodaysDate";
import DonutChart from "@/components/DoctorHero/DonutChart";
import AppointmentsCard from "@/components/DoctorHero/AppointmentsCard";
import NextPatientDetails from "@/components/DoctorHero/NextPatientDetails";
import BarChart from "@/components/DoctorHero/BarChart";
import AppointmentRequest from "@/components/DoctorHero/AppointmentRequest";
import Calander from "@/components/DoctorHero/Calander";
import withAuth from "../../../common/WithAuth";
import { useEffect, useState } from "react";
import { authHeader } from "@/utils";

const chartData = [
  { label: 'Excellent', percentage: 80 },
  { label: 'Great', percentage: 60 },
  { label: 'Good', percentage: 40 },
  { label: 'Average', percentage: 20 },
];
const appointments = [
  {
    image: '/images/patient1.jpg',
    name: 'Maria Sarafat',
    issue: 'Cold',
  },
  {
    image: '/images/patient2.jpg',
    name: 'Jhon Deo',
    issue: 'Over swtting',
  },
  {
    image: '/images/patient3.jpg',
    name: 'Alice Johnson',
    issue: 'Headache',
  },
  {
    image: '/images/patient4.jpg',
    name: 'Bob Smith',
    issue: 'Fever',
  }
];

const DoctorDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [TodayAppointments, setTodayAppointments] = useState([]);
  const [patientsData, setPatientsData] = useState({ today: 0, total: 0 });
  const todayDate = getTodaysDate();
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        // Fetch appointments and consultations
        const appointmentsApi = await fetch(`${BACKEND_API_URL}/api/users/doctor/appointments`, {
          headers: authHeader(),
        });
        const consultationsApi = await fetch(`${BACKEND_API_URL}/api/users/doctor/consultations`, {
          headers: authHeader(),
        });

        console.log("a",appointmentsApi);
        console.log("b",consultationsApi);


        if (!appointmentsApi.ok || !consultationsApi.ok) {
          console.log("An error occurred while fetching appointments");
        }

        const appointmentsData = await appointmentsApi.json();
        const consultationsData = await consultationsApi.json() || [];

        // Filter today's appointments
        const todayDate = new Date().toDateString();
        interface Appointment {
          appointment: {
            appointment_date: string;
          };
        }

        const filterData = appointmentsData.filter((appointment: Appointment) => {
          const appointmentDate = new Date(appointment.appointment.appointment_date).toDateString();
          return todayDate === appointmentDate;
        });

        // Filter today's consultations
        const filterConsultations = Array.isArray(consultationsData) ? consultationsData.filter((consultation: { consultation_date: string }) => {
          const consultationDate = new Date(consultation.consultation_date).toDateString();
          return todayDate === consultationDate;
        }) : [];

        // Update state
        setTodayAppointments(filterData);
        setPatientsData({ total: consultationsData.length, today: filterConsultations.length });

      } catch (err) {
        if (err instanceof Error) {
          alert(err.message || "An error occurred while fetching appointments");
        } else {
          alert("An error occurred while fetching appointments");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [authHeader, BACKEND_API_URL]);


  return (
    <DoctorLayout>
      {/* Hero Card Section */}
      <DashboardHeroNav headName="Welcome To Your Dashboard" />

      {/* Card section of Tota Patient, Today Patient, Today Appintments */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TotalCard
            cardTitle="Total Patients"
            cardNumber={patientsData.total || 0}
            cardDate="Till Today"
            cardImgUrl={TotalPatient}
          />
          <TotalCard
            cardTitle="Today's Patients"
            cardNumber={patientsData.today}
            cardDate={todayDate}
            cardImgUrl={TodayPatient}
          />
          <TotalCard
            cardTitle="Today's Appointments"
            cardNumber={TodayAppointments?.length}
            cardDate={todayDate}
            cardImgUrl={TodayAppointmentss}
          />
        </div>
      </div>

      {/* Patients Summary This Month */}
      <div className="p-6 bg-gray-100">
        <h1 className="text-xl mb-3">Patients Summary This Month</h1>

        {/* Three child Section of [Circle Chart of New Patients, Old Patients, Total Patients], [Today Appoinment-Patient,Name/Diagonosis, Time], [Next Patient Details]  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-max">
          {/* Circle Chart of New Patients, Old Patients, Total Patients with different color for each */}
          <div className="flex flex-col h-full">
            <DonutChart />
          </div>

          {/* Today Appoinment-Patient,Name/Diagonosis, Time */}
          <div className="flex flex-col h-full">
            <AppointmentsCard appointments={TodayAppointments} />
          </div>

          {/* Next Patient Details */}
          <div className="flex flex-col h-full">
            {/* <NextPatientDetails /> */}
            {/* <h1 className="font-semibold">Patient Reviews</h1>
            <BarChart data={chartData} /> */}
          </div>





        </div>
      </div>

      {/* Patient Review, Appoinment Request, calender */}
      <div className="flex gap-6 justify-between my-6">

        {/* Patient Review */}
        {/* <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
          <h1 className="font-semibold">Patient Reviews</h1>
          <BarChart data={chartData} />
        </div> */}

        {/* Appoinment Request */}
        {/* <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
          <h1 className="font-semibold">Appoinment Request</h1>
          <AppointmentRequest appointments={appointments} />
        </div> */}

        {/* Calender */}
        {/* <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
          <h1 className="font-semibold">Calender</h1>
          <Calander />
        </div> */}

      </div>
    </DoctorLayout>
  );
};

export default withAuth(DoctorDashboard, ['doctor']);
