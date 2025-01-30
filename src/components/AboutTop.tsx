import Image from "next/image";
import Link from "next/link";
import im from "@/images/breadcrumb_bg.jpg";

const AboutTop = () => {
    return <div className="ourTeam-top-container service-3">
        <div className="container-effect"></div>
        <div className="absolute left-0 right-0  flex flex-col justify-center items-center h-full">
            <ul className="flex text-white">
                <li>
                    <Link href="/">Home</Link>
                </li>

                <li className="mx-2">
                    <Link href="">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>

                        Our Team
                    </Link>
                </li>
            </ul>
            <h1 className="test text-4xl font-bold ">Our Team</h1>
            <Image src={im} className="w-full lg:w-9/12" alt="Banner Img" />
        </div>
    </div>

}

export default AboutTop;