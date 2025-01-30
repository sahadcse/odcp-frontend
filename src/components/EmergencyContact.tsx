'use client'

import HelpingImg from "../images/helpline_img.png"
import Image from 'next/image'
import { motion } from 'framer-motion'

const EmergencyContact = () => {
    return (
        <div className="px-4 lg:px-64 py-8 bg-[#eef9ff] font-dm-sans">
            <motion.div
                className="flex flex-col lg:flex-row-reverse items-center justify-between min-h-screen space-y-6 lg:space-y-0 lg:space-x-12 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="relative w-full lg:w-1/2 flex justify-center lg:justify-start"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Image src={HelpingImg} className="w-full lg:w-full rounded-3xl" alt="About Us Img" />
                </motion.div>

                <motion.div
                    className="w-full lg:w-1/2 text-center lg:text-left px-4"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="py-4 text-xl font-dm-sans font-bold text-color-secondary leading-tight">
                        | Emergency helpline
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-semibold font-work-sans text-color-black leading-tight">
                        Need Emergency Contact
                    </h1>
                    <p className="py-4 text-lg lg:text-xl font-dm-sans leading-relaxed">
                        At Online Doctor, we are committed to delivering top-notch healthcare services with a patient-first approach. Our dedicated team of experienced professionals strives to provide personalized and compassionate care to every individual who walks through our doors. With state-of-the-art facilities and a comprehensive range of medical services, we ensure our patients receive the highest standard of care.
                    </p>
                    <div className="font-dm-sans lg:text-xl">
                        <div className="flex justify-start items-center gap-5 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 bg-color-primary rounded-full p-1 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <p>
                                24/7 Contact Our Hospital.
                            </p>
                        </div>
                        <div className="flex justify-start items-center gap-5 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 bg-color-primary rounded-full p-1 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <p>
                                24 hours Open Our Hospital.
                            </p>
                        </div>
                        <div className="flex justify-start items-center gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 bg-color-primary rounded-full p-1 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <p>
                                Emergency Contact Our Phone Number.
                            </p>
                        </div>
                    </div>

                    {/* Contact details section */}
                    <div className="flex items-center gap-5 my-8 flex-col sm:flex-row">
                        <div className="bg-white w-full lg:w-80 p-5 rounded-lg">
                            <div className="flex items-center gap-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-12 bg-color-primary rounded-full p-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <div>
                                    <p>Phone Number</p>
                                    <p>+880 1678392594</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-full lg:w-80 p-5 rounded-lg">
                            <div className="flex items-center gap-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-12 bg-color-primary rounded-full p-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <div>
                                    <p>Quick Your Email</p>
                                    <p>rezwanrahim99@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default EmergencyContact;
