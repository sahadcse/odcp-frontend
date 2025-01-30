"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { login } from '../../redux/slices/userSlice';
import Cookies from 'js-cookie';
import Navbar from "@/components/Navbar";
import Logo from "../../images/Logo (2).png";
import loginImage from "images/login.png";
import Image from 'next/image';


const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [userC, setUserC] = useState('');
    const [error, setError] = useState('');


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${BACKEND_API_URL}/api/users/${userC}/login`, {
                    email: values.email,
                    password: values.password
                });
                dispatch(login({ data: res.data, role: userC }));
                Cookies.set('token', res.data.token);

                if (userC === 'doctor') {
                    Cookies.set('user', JSON.stringify(res.data.doctor));
                    router.push('/doctor/dashboard');
                } else {
                    Cookies.set('user', JSON.stringify(res.data.patient));
                    router.push('/patient/dashboard');
                }
            } catch (error) {
                setError((error as any).response.data.error);
            }
        },
    });



    return (
        <div>
            <Navbar />

            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <Image src={Logo} alt="Logo" height={50} width={172} />
                            {/* <img src="../../images/Logo (2).png"
                                className="w-mx-auto" /> */}
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <div className="w-full flex-1 mt-8">
                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign In with Cartesian E-mail
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={formik.handleSubmit}>
                                        <select
                                            className="w-full px-8 py-4  rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                            value={userC}
                                            onChange={(e) => setUserC(e.target.value)}
                                        >
                                            <option value="" disabled>Select role</option>
                                            <option value="doctor">Doctor</option>
                                            <option value="patient">Patient</option>
                                        </select>

                                        <input
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            className={`w-full px-8 py-4 my-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}

                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <p className="text-red-500 text-xs">{formik.errors.email}</p>
                                        ) : null}

                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="password"
                                            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <p className="text-red-500 text-xs">{formik.errors.password}</p>
                                        ) : null}
                                        {error && <p className="text-red-500 text-xs">{error}</p>}
                                        <button
                                            className="mt-5 tracking-wide font-semibold bg-color-primary text-white w-full py-4 rounded-lg hover:bg-color-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml- text-white">
                                                Sign In
                                            </span>
                                        </button>

                                    </form>

                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Don’t have an account?{" "}

                                        <Link href="/registration" className="border-b border-gray-500 border-dotted">
                                            Create an account
                                        </Link>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-color-primary text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{ backgroundImage: `url('/images/login.png')` }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
