'use client';

import FaqImg from "../images/faq-img.jpg";
import Image from 'next/image';
import { motion } from 'framer-motion';

const FAQ = () => {
    const faqs = [
        {
            title: "What is Accessibility?",
            content: "Accessibility ensures that everyone, including people with disabilities, can use your website."
        },
        {
            title: "Why Use Focusable Elements?",
            content: "Focusable elements improve user experience by allowing keyboard navigation."
        },
        {
            title: "Best Practices for Collapsible Content",
            content: "Ensure that content is easily accessible and can be navigated with a keyboard."
        },
        {
            title: "How to Enhance User Experience?",
            content: "Use clear labels, adequate spacing, and appropriate colors to enhance readability."
        },
        {
            title: "Additional Resources",
            content: "Check out web accessibility guidelines like WCAG for more information."
        },
    ];

    return (
        <div className="px-4 lg:px-64 py-24">
            <div className="text-center mb-8">
                <p className="py-4 text-xl font-dm-sans font-bold text-color-secondary leading-tight">
                    | FAQ
                </p>
                <h1 className="text-4xl lg:text-5xl font-semibold font-work-sans text-color-black leading-tight">
                    Frequently Asked Questions
                </h1>
            </div>

            <motion.div
                className="flex flex-col lg:flex-row-reverse items-center justify-between space-y-6 lg:space-y-0 lg:space-x-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="relative w-full lg:w-1/2 flex justify-center"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Image
                        src={FaqImg}
                        className="w-full lg:w-10/12 rounded-3xl"
                        alt="About Us Img"
                    />
                </motion.div>

                <motion.div
                    className="w-full lg:w-1/2 text-center lg:text-left px-4"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {faqs.map((faq, index) => (
                        <div key={index} tabIndex={0} className="collapse collapse-plus bg-color-third border my-5 ">
                            <div className="collapse-title text-xl font-medium font-work-sans text-color-black">{faq.title}</div>
                            <div className="collapse-content">
                                <p className="font-dm-sans text-color-black">{faq.content}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default FAQ;
