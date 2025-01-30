'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeader } from '@/utils';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { selectedDoctor } from '@/redux/slices/doctorSlice';
import { useRouter } from 'next/navigation';

const DoctorsCardCarousel = () => {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/public/doctor/all`, {
                    headers: authHeader(),
                });
                setDoctors(response.data);
            } catch (err) {
                console.error('Error fetching doctors:', err);
            }
        };

        fetchDoctors();
    }, []);


    const handleViewDoctor = (doctor) => {
        dispatch(selectedDoctor(doctor));
        router.push('/doctor/details');
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                {doctors.map((doctor) => (
                    <div
                        key={doctor._id}
                        className="card bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full"
                    >
                        {/* Doctor Profile Section */}
                        <div className="flex flex-col items-center gap-4">
                            <Image
                                src={doctor.profile_picture_url || '/images/user.png'}
                                alt={doctor.full_name}
                                width={120}
                                height={120}
                            />
                            <div className="text-center">
                                <h2 className="text-lg font-semibold text-gray-800">{doctor.full_name}</h2>
                                <p className="text-sm text-gray-500">{doctor.specialization}</p>
                                <p className="text-sm text-gray-400">{`Experience: ${doctor.experience_years} years`}</p>
                            </div>
                        </div>

                        {/* Bio and Fee Section */}
                        <div className="mt-4 flex-grow">
                            <p className="text-sm text-gray-600">{doctor.bio}</p>
                            <p className="text-sm font-medium mt-3">
                                Consultation Fee: <span className="text-color-primary">${doctor.consultation_fee}</span>
                            </p>
                        </div>

                        {/* Social Links and Ratings Section */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-3">
                                {doctor.social_links.linkedin && (
                                    <a
                                        href={doctor.social_links.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-80"
                                    >
                                        <FaLinkedin className="text-blue-600" size={20} />
                                    </a>
                                )}
                                {doctor.social_links.twitter && (
                                    <a
                                        href={doctor.social_links.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-80"
                                    >
                                        <FaTwitter className="text-blue-400" size={20} />
                                    </a>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">
                                Rating: {doctor.ratings.average_rating} ({doctor.ratings.total_reviews} reviews)
                            </p>
                        </div>

                        {/* Action Buttons Section */}
                        <div className="mt-4 flex flex-col gap-3">
                            <Link href="/appointment">
                                <button className="btn bg-color-primary text-white w-full rounded-lg py-2 hover:opacity-90">
                                    Book Appointment
                                </button>
                            </Link>
                            <button
                                className="btn bg-gray-100 text-gray-800 w-full rounded-lg py-2 hover:bg-gray-200"
                                onClick={() => handleViewDoctor(doctor)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsCardCarousel;
