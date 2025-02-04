'use client'

import BannerImg from "../images/home-banner-tow.png"
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from "next/link"

const Hero = () => {

  return (
    <div className="bg-[url('../images/banner_bg.jpg')]  bg-cover bg-center py-12 lg:py-24">
      <motion.div
        className="max-w-[80%] grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className=""
        >
          <div className="">
            <Image src={BannerImg} className="w-96 h-auto" alt="Banner Image" priority />
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          className=""
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          
          <p className="py-4 text-lg sm:text-xl font-dm-sans font-bold text-color-secondary leading-tight">
          Welcome to Online Doctor <span className="">Consultation</span> Platform -ODCP
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold font-work-sans text-color-black leading-tight">
            Your Health Is Our Priority
          </h1>
          <p className="py-4 text-sm sm:text-lg lg:text-xl font-dm-sans leading-relaxed text-justify">
            Get the best medical consultation from the comfort of your home. Our team of experienced doctors are always ready to help you. 'We Care For You' is not just a slogan, it's our promise to you.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link href="/doctor"><motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn rounded-full bg-color-primary text-color-white text-sm sm:text-base mt-4 px-6 py-2"
            >
              Consult Now
            </motion.button></Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero;
