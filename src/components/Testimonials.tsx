'use client'

import { TestimonialCardCarousel } from "./TestimonialsCardCarousel";

const Testimonial = () => {
    const testimonials = [
        {
            id: 1,
            name: "Rezwan Rahim",
            title: "Patient",
            testimonial: "This platform has transformed our workflow, improving efficiency and team collaboration. Highly recommended!",
            image: "https://rezwan-rahim.web.app/static/media/profile.821f5e54547ab118ba77.jpg",
        },
        {
            id: 2,
            name: "Jane Smith",
            title: "Patient",
            testimonial: "Amazing service and user experience! Our productivity has skyrocketed since we started using this app.",
            image: "https://example.com/images/jane.jpg",
        },
        {
            id: 3,
            name: "Alice Johnson",
            title: "Patient",
            testimonial: "I appreciate the support and constant updates. This platform always has new features that benefit us.",
            image: "https://example.com/images/alice.jpg",
        },
        {
            id: 4,
            name: "Mark Williams",
            title: "Patient",
            testimonial: "I love how easy it is to navigate and use. It saves me so much time on a daily basis!",
            image: "https://example.com/images/mark.jpg",
        },
        {
            id: 5,
            name: "Sophia Brown",
            title: "Patient",
            testimonial: "Exceptional platform with fantastic tools that have streamlined our data analysis processes.",
            image: "https://example.com/images/sophia.jpg",
        },
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-400">
            {/* Decorative elements */}
            {/* <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}

            <div className="relative px-4 lg:px-56 py-24">
                <div className="text-center space-y-6">
                    <p className="inline-block py-2 px-4 rounded-full bg-blue-50 text-xl font-dm-sans font-bold text-blue-600">
                        Testimonials
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-semibold font-work-sans text-gray-800 leading-tight">
                        What Our <span className="text-blue-600">Clients</span> Say
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Discover why our patients trust us with their healthcare needs
                    </p>
                </div>

                <div className="my-16">
                    <TestimonialCardCarousel data={testimonials} />
                </div>
            </div>
        </div>
    )
}

export default Testimonial;