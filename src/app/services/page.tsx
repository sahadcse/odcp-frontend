import Link from "next/link";
import Image from "next/image";
import styles from "./services.module.css";
import ImgFile from "../../images/breadcrumb_bg.jpg";
import service1 from "../../images/service-1.jpg";
import service2 from "../../images/service-2.jpg";
import service3 from "../../images/service-3.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Service card interface
interface ServiceCardProps {
  image: any;
  title: string;
  description: string;
}

// Service card component
const ServiceCard = ({ image, title, description }: ServiceCardProps) => (
  <div className="card bg-base-100 shadow-xl transition-transform duration-300 hover:scale-105 w-full max-w-sm mx-auto">
    <figure className="px-4 pt-4">
      <Image
        src={image}
        alt={title}
        className="rounded-xl w-full h-[200px] object-cover"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title font-work-sans text-color-black text-2xl">
        {title}
      </h2>
      <p className="font-dm-sans text-gray-600">{description}</p>
      <div className="card-actions justify-start">
        <button className="badge badge-outline bg-color-primary text-white p-4 hover:bg-color-primary/80 transition-colors">
          Read More
        </button>
      </div>
    </div>
  </div>
);

// Services data
const servicesData = [
  {
    image: service1,
    title: "Online Monitoring",
    description:
      "24/7 virtual health monitoring with real-time updates and expert care.",
  },
  {
    image: service2,
    title: "Holter Heart Surgery",
    description:
      "Advanced cardiac procedures with state-of-the-art monitoring equipment.",
  },
  {
    image: service3,
    title: "Diagnose & Research",
    description:
      "Comprehensive diagnostic services backed by cutting-edge research.",
  },
  {
    image: service1,
    title: "Telemedicine Consultations",
    description:
      "Get medical advice from the comfort of your home through our telemedicine services.",
  },
  {
    image: service2,
    title: "Pediatric Care",
    description:
      "Specialized healthcare services for children, ensuring their well-being and healthy development.",
  },
  {
    image: service3,
    title: "Mental Health Support",
    description:
      "Comprehensive mental health services including therapy and counseling sessions.",
  },
];

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className={`${styles.ourTeamTopContainer} relative h-[300px]`}>
          <Image
            src={ImgFile}
            alt="Breadcrumb background"
            layout="fill"
            objectFit="cover"
            quality={75}
            className="absolute z-[-1]"
          />
          <div className={`${styles.containerEffect} absolute inset-0`} />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <ul className="flex items-center space-x-4 text-black">
              <li>
                <Link
                  href="/about"
                  className="hover:text-color-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Our Services</span>
              </li>
            </ul>
            <h1 className="text-4xl font-bold text-black mt-4">Our Services</h1>
          </div>
        </div>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
