'use client'

import { motion } from 'framer-motion'
import Link from 'next/link';
import DoctorsCardCarousel from './DoctorsCardCarousel';


const Doctors = () => {

    return (
        <div className="" >
            <div className="px-4 lg:px-64 py-24 text-center" style={{ backgroundColor: "#ffffff9c" }}>
                <div className="text-center">
                    <p className="py-4 text-xl font-dm-sans font-bold text-color-secondary leading-tight">
                        | our team
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-semibold font-work-sans text-color-black leading-tight">
                        Meet Our expert doctor
                    </h1>
                </div>

                <div className="my-12">
                    <DoctorsCardCarousel />
                </div>
                <Link href="/doctor"><motion.button className="btn rounded-full bg-color-primary text-color-white text-base mt-4 lg:w-48"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    View More
                </motion.button></Link>
            </div>
        </div >


    )
}

export default Doctors;