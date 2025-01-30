"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

const PatientLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    const isActive = (path: string): boolean => pathname === path;

    return (
        <>
            <div className="drawer lg:drawer-open font-work-sans">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-start justify-start ps-8 pt-8 bg-slate-100">
                    {children}
                </div>
                {/* Left Navigation */}
                <div className="drawer-side z-10">
                    {/* <label htmlFor="my-drawer-2" className="drawer-overlay">oifuo</label> */}
                    <ul className="menu p-4 w-60  h-full bg-white text-base-content font-medium text-base">
                        <div className="">
                            <li className={isActive('/patient/appointment/pending') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/patient/appointment/pending" passHref>
                                    Up-coming Appoinment
                                </Link>
                            </li>
                            <li className={isActive('/patient/appointment/previous') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/patient/appointment/previous" passHref>
                                    Previous Appoinment
                                </Link>
                            </li>
                            <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/patient/MedicalHistory" passHref>
                                    Medical History
                                </Link>
                            </li>
                            <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/patient/Billing" passHref>
                                    Billing & Payment
                                </Link>
                            </li>
                            <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/patient/Notifications" passHref>
                                    Notifications
                                </Link>
                            </li>
                            <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/patient/profile" passHref>
                                    Profile Info
                                </Link>
                            </li>
                        </div>
                        <div className="logout">
                            <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/login" passHref>
                                    Logout
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PatientLayout;
