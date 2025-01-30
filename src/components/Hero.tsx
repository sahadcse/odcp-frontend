'use client'

import BannerImg from "../images/home-banner-tow.png"
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from "next/link"

const Hero = () => {

  return (
    <div className="bg-[url('../images/banner_bg.jpg')] bg-cover bg-center sm:pt-16 sm:pb-20">
      <motion.div
        className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between min-h-screen px-4 sm:px-8 lg:px-48 space-y-6 lg:space-y-0 lg:space-x-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="w-11/12 sm:w-9/12 lg:w-auto">
            <Image src={BannerImg} className="w-full" alt="Banner Image" priority />
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left px-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="py-4 text-lg sm:text-xl font-dm-sans font-bold text-color-secondary leading-tight">
            | Welcome to Online Doctor
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-work-sans text-color-black leading-tight">
            Complete Health Solution Online Doctor
          </h1>
          <p className="py-4 text-sm sm:text-lg lg:text-xl font-dm-sans leading-relaxed">
            We are dedicated to providing the best care for your well-being. At Online Doctor, we ensure you receive the attention and support you deserve on your journey to better health.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link href="/doctor"><motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn rounded-full bg-color-primary text-color-white text-sm sm:text-base mt-4 px-6 py-2"
            >
              Meet A Doctor
            </motion.button></Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero;
