import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

interface ITestimonia {
    id: number;
    name: string;
    title: string;
    testimonial: string;
    image: string;
}

interface TestimonialCardCarouselProps {
    data: ITestimonia[];
}

export const TestimonialCardCarousel = ({ data }: TestimonialCardCarouselProps) => {
    function getRandomInt() {
        return Math.floor(Math.random() * (10000 - 5)) + 4;
    }
    return (
        <Swiper
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active bg-primary',
            }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 25 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="py-8 px-4"
        >
            {data.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                    <div className="card bg-gradient-to-r from-white via-gray-100 to-white backdrop-blur-sm bg-opacity-90 w-full h-64 lg:h-72 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl rounded-2xl p-6 text-work-sans border border-gray-100">
                        <div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={index < 4 ? "url(#grad1)" : "none"}
                                        stroke={index >= 4 ? "currentColor" : "none"}
                                        className="w-5 h-5 text-yellow-400"
                                    >
                                        <defs>
                                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: "#ffdd00", stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: "#ffab00", stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <div className="relative mb-6">
                                <svg className="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-x-4 -translate-y-4 opacity-50"
                                    fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                                </svg>
                                <p className="my-4 text-sm sm:text-base text-gray-600 italic font-light">
                                    {testimonial.testimonial}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="w-12 h-12 relative rounded-full overflow-hidden ring-2 ring-primary ring-offset-2">
                                <Image
                                    src={"http://graph.facebook.com/v2.5/" + getRandomInt() + "/picture?height=200&height=200"}
                                    alt={testimonial.name}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{testimonial.name}</h2>
                                <p className="text-sm text-primary font-medium">{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
