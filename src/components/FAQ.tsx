'use client';

import FaqImg from "../images/faq-img.jpg";
import Image from 'next/image';
import { motion } from 'framer-motion';

const FAQ = () => {
    const faqs = [
        {
            title: "How does online doctor consultation work?",
            content: "Our platform connects you with licensed doctors for virtual consultations through video calls, chat, or phone. You can discuss your symptoms, get diagnoses, and receive prescriptions when appropriate."
        },
        {
            title: "Is my medical information secure?",
            content: "Yes, we follow strict HIPAA guidelines and use encrypted connections to ensure your medical information remains private and secure."
        },
        {
            title: "What types of conditions can be treated online?",
            content: "Common conditions like cold, flu, allergies, skin issues, and minor infections can be treated. However, emergency conditions require immediate in-person care."
        },
        {
            title: "How do I get my prescriptions?",
            content: "If prescribed, medications can be sent electronically to your preferred pharmacy. You can pick up your prescriptions at your convenience."
        },
        {
            title: "What are the consultation fees?",
            content: "Consultation fees vary based on the type of specialist and duration. We accept most major insurance plans, and you can see the exact costs before booking."
        },
    ];

    return (
        <div className="w-[90%] flex flex-col items-center mx-auto my-16">
            <div className="text-center mb-8">
                <p className="py-4 text-xl font-dm-sans font-bold text-color-secondary leading-tight">
                    FAQ
                </p>
                <h1 className="text-4xl font-semibold font-work-sans text-color-black leading-tight">
                    Frequently Asked Questions
                </h1>
            </div>

            <motion.div
                className="w-[80%] lg:w-[90%] flex flex-col lg:flex-row items-center justify-between lg:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="w-full lg:w-1/2 mb-8 lg:mb-0"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Image
                        src={FaqImg}
                        className="rounded-xl"
                        alt="About Us Img"
                    />
                </motion.div>

                <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <details 
                                className="collapse collapse-plus bg-white border border-color-secondary rounded-lg my-4 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <summary className="collapse-title text-lg font-work-sans text-color-black font-semibold py-4 px-6">
                                    {faq.title}
                                </summary>
                                <div className="collapse-content bg-color-third">
                                    <p className="font-dm-sans text-color-black py-4 px-2 leading-relaxed text-justify">
                                        {faq.content}
                                    </p>
                                </div>
                            </details>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default FAQ;
