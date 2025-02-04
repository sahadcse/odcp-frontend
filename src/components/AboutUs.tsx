'use client'

import AboutImg1 from "../images/about-img1.jpg"
import AboutImg2 from "../images/about_img2.jpg"
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from "next/link"

const AboutUs = () => {

    const SvgIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-4 h-4 bg-color-primary rounded-full p-1"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
    
    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 lg:gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Image Section */}
                <motion.div
                    className="relative grid grid-cols-2 gap-4"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Image
                        src={AboutImg1}
                        className="rounded-lg shadow-lg w-full h-[300px] object-cover"
                        alt="About Us Image 1"
                    />
                    <Image
                        src={AboutImg2}
                        className="rounded-lg shadow-lg w-full h-[300px] object-cover mt-8 md:-ml-36 md:mt-36"
                        alt="About Us Image 2"
                    />
                </motion.div>

                {/* Text Section */}
                <motion.div
                    className=""
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="py-2 text-lg sm:text-xl font-dm-sans font-bold text-color-secondary leading-tight">
                    About Us
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-semibold font-work-sans text-color-black leading-tight">
                        Providing Quality Healthcare Services
                    </h1>
                    <p className="py-4 text-sm sm:text-base lg:text-lg font-dm-sans leading-relaxed text-justify">
                        At Online Doctor, we are committed to delivering top-notch healthcare services with a patient-first approach. Our dedicated team of experienced professionals strives to provide personalized and compassionate care to every individual who walks through our doors. With state-of-the-art facilities and a comprehensive range of medical services, we ensure our patients receive the highest standard of care.
                    </p>
                    <div className="font-dm-sans sm:text-base flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <SvgIcon />
                            <p>Comprehensive Medical Services</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <SvgIcon />
                            <p>Experienced Healthcare Professionals</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <SvgIcon />
                            <p>Personalized Patient Care</p>
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
