'use client'

import AboutImg1 from "../images/about-img1.jpg"
import AboutImg2 from "../images/about_img2.jpg"
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from "next/link"

const AboutUs = () => {
    return (
        <div className="px-4 sm:px-8 lg:px-64 py-8 sm:py-12">
            <motion.div
                className="flex flex-col lg:flex-row items-center justify-between min-h-screen space-y-6 lg:space-y-0 lg:space-x-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Image Section */}
                <motion.div
                    className="relative w-full lg:w-1/2 flex justify-center lg:justify-start"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Image
                        src={AboutImg1}
                        className="w-11/12 sm:w-9/12 lg:w-1/2 rounded-3xl"
                        alt="About Us Image 1"
                    />
                    <Image
                        src={AboutImg2}
                        className="absolute right-4 top-36 w-3/4 sm:right-16 sm:top-32 sm:w-2/3 lg:right-32 lg:top-24 lg:w-1/2 rounded-3xl"
                        alt="About Us Image 2"
                    />
                </motion.div>

                {/* Text Section */}
                <motion.div
                    className="w-full lg:w-1/2 text-center lg:text-left px-4 pt-24 lg:mt-0"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="py-2 text-lg sm:text-xl font-dm-sans font-bold text-color-secondary leading-tight">
                        | About Us
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-work-sans text-color-black leading-tight">
                        The Great Place of Medical Hospital Center.
                    </h1>
                    <p className="py-4 text-sm sm:text-base lg:text-lg font-dm-sans leading-relaxed">
                        At Online Doctor, we are committed to delivering top-notch healthcare services with a patient-first approach. Our dedicated team of experienced professionals strives to provide personalized and compassionate care to every individual who walks through our doors. With state-of-the-art facilities and a comprehensive range of medical services, we ensure our patients receive the highest standard of care.
                    </p>
                    <div className="font-dm-sans sm:text-base lg:text-xl">
                        <div className="flex justify-start items-center gap-4 mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="w-6 h-6 bg-color-primary rounded-full p-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <p>24/7 Contact Our Hospital.</p>
                        </div>
                        <div className="flex justify-start items-center gap-4 mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="w-6 h-6 bg-color-primary rounded-full p-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <p>24 hours Open Our Hospital.</p>
                        </div>
                        <div className="flex justify-start items-center gap-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="w-6 h-6 bg-color-primary rounded-full p-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <p>Emergency Contact Our Phone Number.</p>
                        </div>
                    </div>
                    <Link href="/about"><motion.button
                        className="btn rounded-full bg-color-primary text-color-white text-sm sm:text-base mt-4 px-6 py-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Discover More
                    </motion.button></Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default AboutUs;
