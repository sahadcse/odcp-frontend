'use client';
import Link from "next/link";
import Image from "next/image";
import styles from "./doctor.module.css"; // Importing CSS module
import ImgFile from "../../images/breadcrumb_bg.jpg";
import service1 from "../../images/team-2.jpg";
import service2 from "../../images/team-3.jpg";
import service3 from "../../images/team-4.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { authHeader } from "@/utils";
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const DoctorsPage = () => {

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
        <>
            <Navbar />
            <div className={`${styles.ourTeamTopContainer} relative`}>
                <Image
                    src={ImgFile}
                    alt="Breadcrumb background"
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                    className="absolute z-[-1]"
                />
                <div className={`${styles.containerEffect} absolute inset-0`} />
                <div className="absolute inset-0 flex flex-col justify-center items-center h-full">
                    <ul className="flex items-center space-x-4 text-black">
                        <li>
                            <Link href="/about">Doctors</Link>
                        </li>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <Link href="">Our Doctors</Link>
                        </li>
                    </ul>
                    <h1 className="text-4xl font-bold text-black mt-4">Our Doctors</h1>
                </div>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6'>
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
                                className=""
                                width={120} // Increased image size
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
                            <button className="btn bg-color-primary text-white w-full rounded-lg py-2 hover:opacity-90">
                                Book Appointment
                            </button>
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

            <Footer />
        </>

    );
};


export default DoctorsPage;