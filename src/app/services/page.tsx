import Link from "next/link";
import Image from "next/image";
import styles from "./services.module.css"; // Importing CSS module
import ImgFile from "../../images/breadcrumb_bg.jpg";
import service1 from "../../images/service-1.jpg";
import service2 from "../../images/service-2.jpg";
import service3 from "../../images/service-3.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const ServicesPage = () => {
    return (
        <>
            <Navbar />
            <div>
                <div className={`${styles.ourTeamTopContainer} relative`}>
                    <Image
                        src={ImgFile}
                        alt="Breadcrumb background"
                        layout="fill"
                        objectFit="cover"
                        quality={75}
                        className="absolute z-[-1]"
                    />
                    <div className={`${styles.containerEffect} absolute inset-0`} />
                    <div className="absolute inset-0 flex flex-col justify-center items-center h-full">
                        <ul className="flex items-center space-x-4 text-black">
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
                                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                                <Link href="">Our Services</Link>
                            </li>
                        </ul>
                        <h1 className="text-4xl font-bold text-black mt-4">Our Services</h1>
                    </div>

                </div>

                <section className="grid lg:grid-cols-3 grid-cols-1 gap-16 item-self-center justify-self-center py-16">
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-5 pt-5">
                            <Image
                                src={service1}
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-work-sans text-color-black text-2xl">
                                Online Monitoring
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline bg-color-primary text-white p-4">Read More</div>

                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-5 pt-5">
                            <Image
                                src={service2}
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-work-sans text-color-black text-2xl">
                                Holter Heart Surgery
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline bg-color-primary text-white p-4">Read More</div>

                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-5 pt-5">
                            <Image
                                src={service3}
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-work-sans text-color-black text-2xl">
                                Diagnose & Research
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-start ">
                                <div className="badge badge-outline bg-color-primary text-white p-4">Read More</div>

                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-5 pt-5">
                            <Image
                                src={service2}
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-work-sans text-color-black text-2xl">
                                Online Monitoring
                            </h2>
                            <p className='font-dm-sans'>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline bg-color-primary text-white p-4">Read More</div>

                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-5 pt-5">
                            <Image
                                src={service1}
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-work-sans text-color-black text-2xl">
                                Online Monitoring
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline bg-color-primary text-white p-4">Read More</div>

                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-5 pt-5">
                            <Image
                                src={service2}
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-work-sans text-color-black text-2xl">
                                Holter Heart Surgery
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline bg-color-primary text-white p-4">Read More</div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>

    );
};

export default ServicesPage;
