import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import service1 from "../images/service-1.jpg";
import service2 from "../images/service-2.jpg";
import service3 from "../images/service-3.jpg";
import Image from 'next/image';

export const ServiceCardCarousel = () => {
    const services = [
        {
            title: "Cardiology",
            description:
                "Comprehensive heart care and treatments, including ECG, stress tests, and advanced cardiac surgery.",
            image: service1,
        },
        {
            title: "Orthopedics",
            description:
                "Expert care for bone and joint issues, including fractures, arthritis, and joint replacement surgeries.",
            image: service2,
        },
        {
            title: "Pediatrics",
            description:
                "Compassionate care for children, from routine check-ups to immunizations and specialized treatments.",
            image: service3,
        },
        {
            title: "Dental Care",
            description:
                "State-of-the-art dental services including cleanings, fillings, root canals, and cosmetic dentistry.",
            image: service1,
        },
        {
            title: "Dermatology",
            description:
                "Advanced skin care services for conditions like acne, eczema, psoriasis, and cosmetic treatments.",
            image: service3,
        },
    ];

    return (
        <Swiper
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            }}
        >
            {services.map((service, index) => (
                <SwiperSlide key={index}>
                    <div className="rounded-xl bg-base-100 mx-auto max-w-sm">
                        <figure className="px-5 pt-5">
                            <Image
                                src={service.image}
                                alt={service.title}
                                className="rounded-xl"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-work-sans text-color-black text-xl md:text-2xl">
                                {service.title}
                            </h2>
                            <p className="font-dm-sans text-sm md:text-base">
                                {service.description}
                            </p>
                            <div className="card-actions justify-start ">
                                <div className="badge badge-outline cursor-pointer">Read More</div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
