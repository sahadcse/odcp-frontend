import Link from "next/link";
import Image from "next/image";
import styles from "./about.module.css"; // Importing CSS module
import ImgFile from "../../images/breadcrumb_bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    name: "SAHAD",
    role: "Lead Developer",
    area: "Total Backend, Partially Frontend",
    skills: ["Full Stack Developer", "MERN Stack"],
    connect: "https://www.linkedin.com/in/sahaduzzaman-cse/",
    img: "https://avatars.githubusercontent.com/u/67305816?v=4",
  },
  {
    name: "Rezwan",
    role: "Frontend Developer",
    area: "Frontend, Design",
    skills: ["NextJS", "React.js", "Figma", "Tailwind CSS"],
    connect: "https://www.linkedin.com/in/rezwan-rahim/",
    img: "https://avatars.githubusercontent.com/u/97209868?v=4",
  },
];

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* Page Header */}
        <div
          className={`${styles.ourTeamTopContainer} relative max-h-[150px] md:max-h-[250px]`}
        >
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
                <Link href="/">Home</Link>
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
                <Link href="">About Us</Link>
              </li>
            </ul>
            <h1 className="text-4xl font-bold text-black mt-4">About Us</h1>
          </div>
        </div>

        {/* Main content container */}
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Introduction Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Introduction
              </h2>
              <p className="text-gray-600 mb-4">
                The{" "}
                <strong>
                  Online Doctor Consultation Platform (ODCP) / DAKTAR_BARI
                </strong>{" "}
                is a web-based system designed to connect patients with doctors
                for remote medical consultations. It provides an efficient and
                secure way for patients to seek medical advice, schedule
                appointments, and receive prescriptions online.
              </p>
              <p className="text-gray-600 mb-4">
                ODCP benefits both doctors and patients by offering a seamless
                telemedicine experience. It addresses the growing need for
                remote healthcare solutions in modern healthcare systems.
              </p>
            </section>

            {/* Flex container for Project and Technical Info */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Project Information Column */}
              <div className="lg:w-[60%] space-y-8">
                {/* Project Information Section */}
                <section className="border-l-4 border-blue-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Project Information
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Development Timeline
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Project Start: 20-Nov-2024</li>
                        <li>Phase 1 Completion: 15-Jan-2025</li>
                        <li>Beta Testing: 22-Jan-2025</li>
                        <li>Production Release: 30-Jan-2025</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Project Scope
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>User base: 10,000+ patients and doctors</li>
                        <li>Supported specialties: 20+</li>
                        <li>Geographic coverage: World Wide</li>
                        <li>Language support: English & Bengali</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Features Section */}
                <section className="border-l-4 border-green-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Features & Functionality
                  </h2>
                  <div className="grid gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        User Management
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Registration & Login</li>
                        <li>Appointment Booking</li>
                        <li>Medical Report Upload</li>
                        <li>Doctor Availability Management</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Appointment & Consultation
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Search for Doctors</li>
                        <li>Real-Time Status Updates</li>
                        <li>Appointment Approval/Rejection</li>
                        <li>Upload Require Document and files</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Medical Records
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Secure Storage</li>
                        <li>View & Download Reports</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Communication
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Real-Time Chat</li>
                        <li>Video Consultations</li>
                        <li>Appointment Notifications</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Prescription Management
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>AI-Assisted Prescriptions</li>
                        <li>Download Prescriptions</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Workflow Section */}
                <section className="border-l-4 border-purple-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Workflow Overview
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-purple-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        User Registration & Authentication
                      </h3>
                      <p className="text-gray-600">
                        Patients and doctors create accounts and log in securely
                        using JWT-based authentication.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-purple-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Booking & Consultation Process
                      </h3>
                      <p className="text-gray-600">
                        Patients search for doctors, book appointments, and
                        consult via chat or video call.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-purple-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Medical Record Handling
                      </h3>
                      <p className="text-gray-600">
                        Doctors generate prescriptions, and patients can access
                        and download their records securely.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Future Enhancements Section */}
                <section className="border-l-4 border-yellow-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Future Enhancements
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-yellow-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        AI-Powered Prescriptions
                      </h3>
                      <p className="text-gray-600">
                        Smart recommendations for doctors to enhance diagnosis
                        accuracy.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-yellow-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Payment Integration
                      </h3>
                      <p className="text-gray-600">
                        Secure online payment options for consultations.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-yellow-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Mobile App Development
                      </h3>
                      <p className="text-gray-600">
                        Native apps for Android & iOS for better accessibility.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Technical Information Column */}
              <div className="lg:w-[40%] space-y-8">
                {/* Technical Info Section */}
                <section className="border-l-4 border-orange-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Technical Information
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-orange-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Architecture
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Microservices-based architecture</li>
                        <li>RESTful API design</li>
                        <li>WebSocket integration for real-time features</li>
                        <li>Cloud-native deployment</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-orange-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Development Practices
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Agile methodology</li>
                        <li>Test-driven development</li>
                        <li>Continuous Integration/Deployment</li>
                        <li>Code review practices</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Stack Section */}
                <section className="border-l-4 border-red-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Technology Stack
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-red-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Frontend
                      </h3>
                      <p className="text-gray-600">
                        Next.js, React.js, TypeScript, Tailwind CSS
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-red-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Backend
                      </h3>
                      <p className="text-gray-600">
                        Node.js, Express.js, MongoDB, Socket.IO
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-red-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Database
                      </h3>
                      <p className="text-gray-600">MongoDB Atlas</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-red-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Integrations
                      </h3>
                      <p className="text-gray-600">
                        Cloudinary, WebRTC, Socket.IO
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-red-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Cloud & DevOps
                      </h3>
                      <p className="text-gray-600">
                        Microsoft Azure, CI/CD Pipeline, Netlify, GitHub
                      </p>
                    </div>
                  </div>
                </section>

                {/* Security Section */}
                <section className="border-l-4 border-indigo-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Security & Team
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Security
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Data Encryption</li>
                        <li>Role-Based Access Control</li>
                        <li>JWT Authentication</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Project Contributer
                      </h3>
                      <div className="">
                        {teamMembers.map((member) => (
                          <div
                            key={member.name}
                            className="flex items-center space-x-4 mb-4"
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 uppercase">
                                {member.name}
                              </h4>
                              <div className="flex">
                                <p className="text-gray-600">{member.role}</p>
                                <span className="mx-2 text-gray-400">|</span>
                                <a href={member.connect} target="_blank">
                                  <svg className="w-6 h-6 text-blue-600 hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
