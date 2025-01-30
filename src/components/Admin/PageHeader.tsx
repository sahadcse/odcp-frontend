'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice'; // Adjust the import path as necessary
import Cookies from 'js-cookie';

const PageHeader = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove('token'); // Remove the token cookie
        Cookies.remove('admin'); // Remove the admin cookie
        window.location.href = '/loginAD'; // Redirect to login page
    };

    return (
        <div className="w-full ps-8 py-1 border-b bg-gray-100">
            {/* Top menu for child page */}
            <div className="flex justify-center">
                <div className=" w-3/4">
                    <div className="flex justify-between w-full max-w-7xl items-center">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold capitalize">{(pathname ?? '').split('/').pop()?.replace(/-/g, ' ')}</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </div>
                            <Link href="/admin/notifications" passHref>
                                <BellIcon className="h-6 w-6 cursor-pointer" />
                            </Link>
                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
