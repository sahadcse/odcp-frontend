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
    const [doctors, setDoctors] = useState<Doctor[]>([]);
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


    interface Doctor {
        _id: string;
        full_name: string;
        profile_picture_url: string;
        specialization: string;
        experience_years: number;
        bio: string;
        consultation_fee: number;
        social_links: {
            linkedin?: string;
            twitter?: string;
        };
        ratings: {
            average_rating: number;
            total_reviews: number;
        };
    }

    const handleViewDoctor = (doctor: Doctor) => {
        dispatch(selectedDoctor(doctor));
        router.push('/doctor/details');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {doctors.slice(0, 3).map((doctor: Doctor) => (
                    <div
                        key={doctor._id}
                        className="card bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl p-8 flex flex-col justify-between h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    >
                        {/* Doctor Profile Section */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-color-primary rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                <Image
                                    src={doctor.profile_picture_url || '/images/user.png'}
                                    alt={doctor.full_name}
                                    width={140}
                                    height={140}
                                    className="rounded-full border-4 border-white shadow-lg object-cover"
                                />
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-xl font-bold text-gray-800">{doctor.full_name}</h2>
                                <p className="text-color-primary font-semibold">{doctor.specialization}</p>
                                <div className="inline-block px-4 py-1 bg-gray-100 rounded-full">
                                    <p className="text-sm text-gray-600">{`${doctor.experience_years} years experience`}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bio and Fee Section */}
                        <div className="mt-6 flex-grow">
                            <p className="text-gray-600 leading-relaxed line-clamp-3">{doctor.bio}</p>
                            <div className="mt-4 inline-block px-4 py-2 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium">
                                    Consultation Fee: <span className="text-color-primary font-bold">${doctor.consultation_fee}</span>
                                </p>
                            </div>
                        </div>

                        {/* Social Links and Ratings Section */}
                        <div className="flex items-center justify-between mt-6 pb-6 border-b border-gray-100">
                            <div className="flex gap-4">
                                {doctor.social_links.linkedin && (
                                    <a
                                        href={doctor.social_links.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transform transition-transform hover:scale-110"
                                    >
                                        <FaLinkedin className="text-blue-600" size={24} />
                                    </a>
                                )}
                                {doctor.social_links.twitter && (
                                    <a
                                        href={doctor.social_links.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transform transition-transform hover:scale-110"
                                    >
                                        <FaTwitter className="text-blue-400" size={24} />
                                    </a>
                                )}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-600">
                                    {doctor.ratings.average_rating} ({doctor.ratings.total_reviews})
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons Section */}
                        <div className="mt-6 flex flex-col gap-3">
                            <Link href="/appointment" className="w-full">
                                <button className="btn w-full bg-color-primary text-white rounded-lg py-3 font-medium transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg">
                                    Book Appointment
                                </button>
                            </Link>
                            <button
                                className="btn w-full bg-gray-100 text-gray-800 rounded-lg py-3 font-medium transition-all duration-300 hover:bg-gray-200 hover:shadow-md"
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
