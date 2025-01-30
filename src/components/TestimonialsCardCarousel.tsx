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
            spaceBetween={20} // Smaller space between slides
            slidesPerView={3} // Default to 3 slides per view
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1, // 1 slide on mobile
                    spaceBetween: 10, // Reduced space on mobile
                },
                640: {
                    slidesPerView: 2, // 2 slides on tablet
                    spaceBetween: 15, // Adjust space for tablets
                },
                1024: {
                    slidesPerView: 3, // 3 slides on desktop
                    spaceBetween: 30, // More space on desktop
                },
            }}
        >
            {data.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                    <div className="card bg-base-100 w-full shadow-xl p-6 text-work-sans">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={index < 3 ? "currentColor" : "none"}
                                    stroke={index >= 3 ? "currentColor" : "none"}
                                    className="w-6 h-6 text-amber-400"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                        </div>
                        <p className="my-4 text-sm sm:text-base">{testimonial.testimonial}</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 relative rounded-full overflow-hidden">
                                <Image
                                    src={"http://graph.facebook.com/v2.5/" + getRandomInt() + "/picture?height=200&height=200"}
                                    alt={testimonial.name}
                                    width={48}
                                    height={48}
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">{testimonial.name}</h2>
                                <p className="text-sm text-gray-600">{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
