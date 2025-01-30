"use client";

import Link from "next/link";

const AppointmentsCard = ({ appointments }) => {
    console.log(appointments)
    const appointmentsData = appointments.map((item, index) => ({
        'id': index,
        'name': item.
            appointment.patient_id
            .full_name,
        'diagnosis': item.appointment.reason_for_visit
        ,
        'time': item.appointment.time_slot,
        'image': "/images/patient1.jpg",
        'statusColor': "bg-blue-500",
    }),
    )


    return (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm h-full items-start">
            <h2 className="text-color-secondary font-semibold mb-4">Today Appointment</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="flex justify-between text-gray-500 text-sm font-semibold">
                    {/* <p>Patient</p> */}
                    <p>Patient</p>
                    <p>Time</p>
                </div>
                {appointmentsData.slice(0, 5).map((appointment, index) => (
                    <div key={appointment.id} className="flex items-center gap-4">
                        {/* <img
                            src={appointment.image}
                            alt={appointment.name}
                            className="w-10 h-10 rounded-full object-cover"
                        /> */}
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                                {appointment.name}
                            </h3>
                            <p className="text-sm text-gray-500">{appointment.diagnosis}</p>
                        </div>
                        <span
                            className={`text-white text-xs font-medium px-3 py-1 rounded-full bg-color-primary`}
                        >
                            {appointment.time}
                        </span>
                    </div>
                ))}
                {appointments.length > 5 && (
                    <Link href="/doctor/appointments" className="text-color-primary text-sm font-medium cursor-pointer hover:underline">
                        See All
                    </Link>
                )}
            </div>
        </div>
    );
};

export default AppointmentsCard;
