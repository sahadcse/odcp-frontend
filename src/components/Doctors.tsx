'use client'

import { motion } from 'framer-motion'
import Link from 'next/link';
import DoctorsCardCarousel from './DoctorsCardCarousel';

const Doctors = () => {
    return (
        <div className="relative bg-gradient-to-b from-blue-50 to-white">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" 
                     style={{
                         backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)',
                         backgroundSize: '32px 32px'
                     }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div 
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium tracking-wide mb-4">
                        OUR TEAM
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Meet Our Expert Doctors
                    </h2>
                    <p className="text-lg text-gray-600 mb-12">
                        Experienced healthcare professionals dedicated to providing you with the best medical care
                    </p>
                </motion.div>

                <div className="my-12">
                    <DoctorsCardCarousel />
                </div>

                <div className="text-center">
                    <Link href="/doctor">
                        <motion.button 
                            className="inline-flex items-center px-8 py-3 rounded-full bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Doctors
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Doctors;