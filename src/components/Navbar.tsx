"use client"

import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Logo from '../images/Logo (2).png';
import useisAuthenticated from '../hooks/useIsAuthenticated';
import useUserData from '../hooks/useUserData';
import { logout } from '@/redux/slices/userSlice';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isAuth = useisAuthenticated();
    const userData = useUserData();
    const dispatch = useDispatch();

    const navigation = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT', href: '/about' },
        { name: 'SERVICES', href: '/services' },
        { name: 'DOCTORS', href: '/doctor' },
        { name: 'APPOINTMENT', href: '/appointment' },
        { name: 'CONTACT', href: '/contact' },
    ];

    if (isAuth) {
        navigation.push({
            name: 'DASHBOARD',
            href:
                userData?.role === 'doctor'
                    ? '/doctor/dashboard'
                    : userData?.role === 'patient'
                        ? '/patient/dashboard'
                        : '/admin/dashboard',
        });
    }

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/login';
    };

    const renderLinks = () =>
        navigation.map((item) => (
            <Link
                key={item.name}
                href={item.href}
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-600"
            >
                {item.name}
            </Link>
        ));

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md py-2">
            <nav className="flex items-center justify-between lg:px-48 text-xl">
                {/* Logo Section */}
                <div className="flex items-center flex-1 h-12 w-12 lg:h-16 lg:w-16 ps-16">
                    <Link href="/" >
                        <Image src={Logo} alt="Logo" height={50} width={172} priority />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-12">{renderLinks()}</div>

                {/* Authentication Buttons */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isAuth ? (
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center rounded-xl bg-color-primary py-3 px-6 font-dm text-base font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <div className="flex text-sm">
                            <Link href="/login">
                                <button className="inline-flex items-center justify-center rounded-xl bg-color-primary py-3 px-6 font-dm text-base font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                                    LOGIN
                                </button>

                            </Link>
                            {/* <Link href="/registration">
                                <button className="border border-sky-700 py-1 px-2 rounded-md">
                                    REGISTER
                                </button>
                            </Link> */}
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Menu Navigation */}
            {mobileMenuOpen && (
                <div className="lg:hidden p-4">
                    <div className="flex flex-col space-y-4">
                        {renderLinks()}
                        {isAuth ? (
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center rounded-xl bg-color-primary py-3 px-6 font-dm text-base font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                            >
                                LOGOUT
                            </button>
                        ) : (
                            <div className="flex flex-col space-y-2 text-sm">
                                <Link href="/login">
                                    <button className="inline-flex items-center justify-center rounded-xl bg-color-secondary py-3 px-6 font-dm text-base font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                                        LOGIN
                                    </button>
                                </Link>
                                <Link href="/registration">
                                    <button className="inline-flex items-center justify-center rounded-xl bg-color-primary py-3 px-6 font-dm text-base font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                                        REGISTER
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
