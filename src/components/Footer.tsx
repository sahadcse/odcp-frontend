import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const sections = [
        {
            title: "Medical Services",
            links: [
                { name: "Primary Care", href: "#" },
                { name: "Specialty Clinics", href: "#" },
                { name: "Emergency Care", href: "#" },
                { name: "Surgical Services", href: "#" },
                { name: "Diagnostic Imaging", href: "#" },
            ],
        },
        {
            title: "Patient Resources",
            links: [
                { name: "Patient Portal", href: "#" },
                { name: "Billing & Insurance", href: "#" },
                { name: "Health Education", href: "#" },
                { name: "FAQs", href: "#" },
            ],
        },
        {
            title: "About Us",
            links: [
                { name: "Our Mission", href: "#" },
                { name: "Meet Our Team", href: "#" },
                { name: "News & Events", href: "#" },
                { name: "Careers", href: "#" },
            ],
        },
        {
            title: "Contact Information",
            content: (
                <div className="text-[#9CBDBD]">
                    <p className="mt-2">Love Road, Section-2 Mirpur.</p>
                    <p>Dhaka, 1216</p>
                    <p className="mt-4">
                        Phone:{" "}
                        <a href="tel:+1234567890" className="link link-hover ">
                            01746669174
                        </a>
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:info@odcp.com" className="link link-hover">
                            info@odcp.com
                        </a>
                    </p>
                </div>
            ),
        },
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, href: "#" },
        { icon: <FaTwitter />, href: "#" },
        { icon: <FaLinkedinIn />, href: "#" },
        { icon: <FaInstagram />, href: "#" },
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-3">
                        <Image 
                            src="/images/Logo-secondary.png" 
                            alt="Logo" 
                            width={172} 
                            height={50}
                            className="mb-6" 
                        />
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Providing compassionate care and expert medical services for every stage of life.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center 
                                             transition-colors duration-300 hover:bg-blue-600"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {sections.slice(0, 3).map((section, index) => (
                            <div key={index}>
                                <h6 className="text-lg font-bold mb-6 text-white">{section.title}</h6>
                                {section.links && (
                                    <ul className="space-y-3">
                                        {section.links.map((link, idx) => (
                                            <li key={idx}>
                                                <a 
                                                    href={link.href} 
                                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-3">
                        <h6 className="text-lg font-bold mb-6">Stay Updated</h6>
                        <div className="mb-6">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full px-4 py-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="w-full mt-3 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
                                Subscribe
                            </button>
                        </div>
                        {sections[3].content}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Daktar Bari. All Rights Reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
