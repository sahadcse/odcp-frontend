'use client';
import { useMemo } from 'react';

const NextPatientDetails = () => {
  const patient = useMemo(() => ({
    image: '/images/patient2.jpg',
    name: 'Sanath Deo',
    diagnosis: 'Health Checkup',
    patientID: '0220092020005',
    dob: '15 Jan 1989',
    sex: 'Male',
    weight: '59 Kg',
    lastAppointment: '15 Dec 2021',
    height: '5.6 ft',
    regDate: '10 Dec 2021',
    history: ['Asthma', 'Hypertension', 'Fever', 'cold', 'cancer'],
    phone: '01746669174',
  }), []);

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl h-full">
      <h2 className="text-blue-600 font-semibold mb-4">Next Patient Details</h2>

      {/* Patient Image, Name, Id */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={patient.image}
            className="w-12 h-12 rounded-full object-cover bg-red-300"/>
        </div>
        <div className=" ">
            <h3 className="text-sm font-semibold">{patient.name}</h3>
            <p className="text-xs text-gray-500">{patient.diagnosis}</p>
        </div>
        <div className="text-right">
          <h3 className="text-sm text-blue-600">Patient ID</h3>
          <p className="text-gray-500 text-xs">{patient.patientID.length > 8 ? `${patient.patientID.slice(0, 8)}...` : patient.patientID}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold text-xs">D. O.B</p>
          <p className='text-xs'>{patient.dob}</p>
        </div>
        <div>
          <p className="font-semibold text-xs">Sex</p>
          <p className='text-xs'>{patient.sex}</p>
        </div>
        <div>
          <p className="font-semibold text-xs">Weight/Height</p>
          <p className='text-xs'>{patient.weight} / {patient.height}</p>
        </div>
        <div className='col-span-2'>
          <p className="font-semibold text-xs">Last Appointment</p>
          <p className='text-xs'>{patient.lastAppointment}</p>
        </div>
        <div className="">
            <p className="font-semibold text-xs">Age</p>
            <p className='text-xs'>{new Date().getFullYear() - new Date(patient.dob).getFullYear()} years</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-blue-600 font-semibold mb-2">Patient History</h4>
        <div className="flex flex-wrap gap-2">
          {patient.history.length > 0 ? (
            patient.history.map((item, index) => (
              <span
            key={index}
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
            } break-words inline-block`}
              >
            {item}
              </span>
            ))
          ) : (
            <p className="text-xs text-gray-500">No history available</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <a
          href={`tel:${patient.phone}`}
          className="flex items-center text-xs rounded-lg shadow hover:bg-blue-700 px-2 py-1"
        >
          📞 {patient.phone}
        </a>
        <button className="flex items-center text-xs text-gray-700 rounded-lg shadow hover:bg-gray-200 px-2">
          📄 Document
        </button>
        <button className="flex items-center text-xs border text-gray-700 rounded-lg shadow hover:bg-gray-200 px-1">
          💬 Chat
        </button>
      </div>

      <h4 className="mt-6 text-blue-600 font-semibold">Last Prescriptions</h4>
    </div>
  );
};

export default NextPatientDetails;
