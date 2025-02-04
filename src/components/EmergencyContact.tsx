"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HelpingImg from "../images/helpline_img.png";

const EmergencyContact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef9ff] to-white font-dm-sans">
      <div className="w-[90%] mx-auto py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="order-2 lg:order-1 space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-blue-100 text-color-secondary rounded-full text-sm font-semibold">
                Emergency Helpline
              </span>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                24/7 Emergency{" "}
                <span className="text-color-primary">Medical Support</span>
              </h1>
              <p className=" text-gray-600 leading-relaxed text-justify">
                Our dedicated emergency response team is available round the
                clock to provide immediate medical assistance. Don't hesitate to
                reach out in case of any medical emergency.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {/* Phone Number */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-color-primary p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Emergency Hotline
                    </p>
                    <a href="tel:+8801746669174" className="text-color-primary font-bold">
                      +880 1746669174
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-color-primary p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-color-primary font-bold">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-color-primary p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="">
                    <p className="font-semibold text-gray-900">G-mail Support</p>
                    <a href="mailto:sahaduzzaman.cse@gmail.com" className="text-color-primary font-bold break-all">
                      sahaduzzaman.cse@
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Working Hours */}
              {/* <motion.div
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 my-auto">
                  <div className="bg-color-primary p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Working Hours</p>
                    <p className="text-color-primary font-bold">
                      24/7 Available
                    </p>
                  </div>
                </div>
              </motion.div> */}
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 w-full"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src={HelpingImg}
              alt="Emergency Contact"
              className="w-[80%] h-auto  mx-auto rounded-3xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyContact;
