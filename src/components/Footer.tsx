import Image from "next/image";

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
                    <p className="mt-2">123 Medical Way, Suite 100</p>
                    <p>City, State, ZIP Code</p>
                    <p className="mt-4">
                        Phone:{" "}
                        <a href="tel:+1234567890" className="link link-hover ">
                            01678392594
                        </a>
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:info@medicalsite.com" className="link link-hover">
                            info@medicalsite.com
                        </a>
                    </p>
                </div>
            ),
        },
    ];

    return (
        <footer className=" bg-color-primary text-white">
            <div className="footer  text-base-content px-4 lg:px-64 py-28 font-dm-sans text-xl">
                <aside>
                    <Image src="/images/Logo-secondary.png" alt="Logo" width={172} height={50} />
                    <p className="text-[#9CBDBD]">Providing compassionate care and expert medical services for every stage of life.</p>

                </aside>
                {sections.map((section, index) => (
                    <nav key={index} >
                        <h6 className="footer-title text-white">{section.title}</h6>
                        {section.links ? (
                            section.links.map((link, idx) => (
                                <a key={idx} href={link.href} className="link link-hover text-[#9CBDBD]">
                                    {link.name}
                                </a>
                            ))
                        ) : (
                            section.content
                        )}
                    </nav>
                ))}

            </div>

            <p className="py-4 text-center">
                © {new Date().getFullYear()} Daktar Bari. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
