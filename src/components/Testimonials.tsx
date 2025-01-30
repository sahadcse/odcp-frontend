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
        <div className="" >
            <div className="px-4 lg:px-64 py-24" style={{ backgroundColor: "#ffffff9c" }}>
                <div className="text-center">
                    <p className="py-4 text-xl font-dm-sans font-bold text-color-primary leading-tight">
                        | Testimonials
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-semibold font-work-sans text-color-black leading-tight">
                        What Our Client Says
                    </h1>
                </div>

                <div className="my-12">
                    <TestimonialCardCarousel data={testimonials} />
                </div>
            </div>
        </div >


    )
}

export default Testimonial;