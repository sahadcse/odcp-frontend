'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdCalendarMonth, MdOutlineFiberSmartRecord, MdHistory, MdOutlinePayment, MdOutlineSettings, MdLogout } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { ReactNode } from 'react';
import { logout } from '@/redux/slices/userSlice';
import useUserData from '@/hooks/useUserData';


const DoctorLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const user = useUserData();
    const { full_name, bio } = user;
    const isActive = (path: string): boolean => pathname === path;


    return (
        <>
            <div className="drawer lg:drawer-open font-work-sans">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col px-4 pt-4">
                    {children}
                </div>
                {/* Left Navigation */}
                <div className="drawer-side z-10 bg-gray-100">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="p-4 w-60  h-full  text-base-content font-medium text-base">
                        {/* Doctor Info */}
                        <div className="  rounded-lg p-4">
                            <img src={user?.profile_picture_url ? user?.profile_picture_url : `/images/user.png`} alt="Patient" className="rounded-full m-auto" />
                            <div className="text-center">
                                <h1 className="text-lg font-semibold">{full_name}</h1>
                                <p className="text-xs text-gray-500">{bio}</p>
                            </div>
                        </div>

                        <div className="gap-3 flex flex-col menu">
                            <li className={isActive('/doctor/dashboard') ? 'bg-color-primary text-white rounded' : ''}>
                                <Link href="/doctor/dashboard" passHref className=''>
                                    <MdDashboard /> Dashboard
                                </Link>
                            </li>


                            {/* <li className={isActive('/doctor/patientRecords') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/doctor/patientRecords" passHref>
                                    <MdOutlineFiberSmartRecord /> Patient Records
                                </Link>
                            </li> */}

                            {user?.documents?.length > 0 && <> <li >
                                <Link href="" passHref>
                                    <MdCalendarMonth /> Appointments
                                </Link>
                                {/* Child links */}
                                <ul className="ml-4 mt-2">
                                    <li className={isActive('/doctor/appointments') ? 'bg-color-primary text-white rounded' : ''}>
                                        <Link href="/doctor/appointments" passHref className=''>
                                            Today's Appointments
                                        </Link>
                                    </li>
                                    <li className={isActive('/doctor/appointments/upcoming') ? 'bg-color-primary text-white rounded' : ''}>
                                        <Link href="/doctor/appointments/upcoming" passHref className=''>
                                            Upcoming Appointments
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                                <li className={isActive('/doctor/consultHistory') ? 'bg-color-primary text-white rounded' : ''}>
                                    <Link href="/doctor/consultHistory" passHref className=''>
                                        <MdHistory /> Consultations
                                    </Link>

                                    {/* Child links */}
                                    <ul className="ml-4 mt-2">
                                        <li className={isActive('/doctor/consultations/todays') ? 'bg-color-primary text-white rounded' : ''}>
                                            <Link href="/doctor/consultations/todays" passHref className=''>
                                                Today's Consultations
                                            </Link>
                                        </li>
                                        <li className={isActive('/doctor/consultations/upComing') ? 'bg-color-primary text-white rounded' : ''}>
                                            <Link href="/doctor/consultations/upComing" passHref className=''>
                                                Upcoming Consultations
                                            </Link>
                                        </li>

                                    </ul>
                                </li>
                                <li className={isActive('/doctor/avilability') ? 'bg-color-primary text-white rounded' : ''}>
                                    <Link href="/doctor/avilability" passHref className=''>
                                        <MdOutlinePayment /> Availability Management
                                    </Link>
                                </li></>}


                            <li className={isActive('/doctor/profile') ? 'bg-color-primary text-white rounded' : ''}>
                                <Link href="/doctor/profile" passHref className=''>
                                    <MdOutlineSettings /> Profile
                                </Link>
                            </li>
                            <li className={isActive('/doctor/login') ? 'bg-color-primary text-white rounded' : ''}>
                                <Link href="" passHref className='' onClick={() => dispatch(logout())}>
                                    <MdLogout /> Logout
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default DoctorLayout;