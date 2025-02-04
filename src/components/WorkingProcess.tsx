"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
    {
        name: 'Fill The Form',
        description: 'Start by filling out our simple form to provide essential details about your medical needs.',
        icon: "01",
        bg: "bg-color-secondary"
    },
    {
        name: 'Book An Appointment',
        description: 'Easily schedule an appointment with our experts at your convenience.',
        icon: "02",
        bg: "bg-color-primary"
    },
    {
        name: 'Check-Ups',
        description: 'Receive thorough check-ups from our qualified medical professionals.',
        icon: "03",
        bg: "bg-color-check-up"
    },
    {
        name: 'Get Reports',
        description: 'Access detailed medical reports quickly and securely.',
        icon: "04",
        bg: "bg-color-report"
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

interface Feature {
    name: string;
    description: string;
    icon: string;
    bg: string;
}

const FeatureItem = ({ feature }: { feature: Feature }) => (
    <motion.div 
        className="relative pl-16"
        variants={itemVariants}
    >
        <dt className="text-lg font-semibold leading-7 text-gray-900">
            <div className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full me-4 work-sans text-color-black ${feature.bg}`}>
                <h1 className="text-white text-center text-2xl">{feature.icon}</h1>
            </div>
            {feature.name}
        </dt>
        <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
    </motion.div>
);

const WorkingProcess = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div 
            ref={ref} 
            className="py-20 sm:py-28 bg-[url('../images/work_bg.jpg')] bg-cover bg-center"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div 
                    className="mx-auto max-w-2xl lg:text-center"
                    variants={itemVariants}
                >
                    <p className="py-4 text-lg font-dm-sans font-bold text-color-secondary leading-snug">
                        How We Work
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-work-sans text-color-black leading-tight">
                        Our Working Process
                    </h1>
                </motion.div>

                <motion.div 
                    className="mx-auto mt-14 max-w-2xl sm:mt-18 lg:mt-20 lg:max-w-4xl"
                    variants={containerVariants}
                >
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-14">
                        {features.map((feature) => (
                            <FeatureItem key={feature.name} feature={feature} />
                        ))}
                    </dl>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WorkingProcess;
