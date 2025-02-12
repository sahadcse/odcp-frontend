"use client";

import Link from "next/link";

interface Appointment {
  appointment: {
    patient_id: {
      full_name: string;
    };
    reason_for_visit: string;
    time_slot: string;
  };
}

interface AppointmentsCardProps {
  appointments: Appointment[];
}

const AppointmentsCard = ({ appointments }: AppointmentsCardProps) => {
  console.log(appointments);
  const appointmentsData = appointments.map((item, index) => ({
    id: index,
    name: item.appointment.patient_id.full_name,
    diagnosis: item.appointment.reason_for_visit,
    time: item.appointment.time_slot,
    image: "/images/patient1.jpg",
    statusColor: "bg-blue-500",
  }));

  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-6 w-full max-w-full sm:max-w-sm h-full items-start">
      <h2 className="text-color-secondary font-semibold mb-2 sm:mb-4 text-sm sm:text-base">
        Today Appointment
      </h2>
      <div className="space-y-2 sm:space-y-4 max-h-[80vh] sm:max-h-96 overflow-y-auto">
        <div className="flex justify-between text-gray-500 text-xs sm:text-sm font-semibold">
          <p>Patient</p>
          <p>Time</p>
        </div>
        {appointmentsData.slice(0, 5).map((appointment, index) => (
          <div
            key={appointment.id}
            className="flex items-center gap-2 sm:gap-4"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">
                {appointment.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {appointment.diagnosis}
              </p>
            </div>
            <span className="text-white text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 rounded-full bg-color-primary whitespace-nowrap">
              {appointment.time}
            </span>
          </div>
        ))}
        {appointments.length > 5 && (
          <Link
            href="/doctor/appointments"
            className="text-color-primary text-xs sm:text-sm font-medium cursor-pointer hover:underline block mt-2"
          >
            See All
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppointmentsCard;
