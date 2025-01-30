'use client';

interface Appointment {
  image: string;
  name: string;
  issue: string;
}

interface AppointmentRequestProps {
  appointments: Appointment[];
}

const AppointmentRequest = ({ appointments }: AppointmentRequestProps) => {

  return (
    <div className="w-full max-w-md flex flex-col justify-center h-a">
      {/* <h2 className="text-blue-600 font-semibold mb-4">Appointment Request</h2> */}
      <div className="space-y-4">
        {appointments.slice(0, 2).map((appointment, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              src={appointment.image}
              alt={appointment.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-blue-600 font-semibold text-sm">
                {appointment.name}
              </h3>
              <p className="text-gray-500 text-sm">{appointment.issue}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-green-500 bg-white p-1 rounded-sm hover:bg-green-200 text-xs">
                ✔️
              </button>
              <button className="text-red-500 bg-red-100 p-1 rounded-sm hover:bg-red-200 text-xs">
                ❌
              </button>
              <button className="text-blue-500 bg-blue-100 p-1 rounded-sm hover:bg-blue-200 text-xs">
                💬
              </button>
            </div>
          </div>
        ))}
      </div>
      {appointments.length > 2 && (
        <div className="mt-4 text-blue-600 font-semibold text-sm hover:underline cursor-pointer">
          See All
        </div>
      )}
    </div>
  );
};

export default AppointmentRequest;
