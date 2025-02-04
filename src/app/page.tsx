import AboutUs from "@/components/AboutUs";
import Appointment from "@/components/Appointment";
import Doctors from "@/components/Doctors";
import EmergencyContact from "@/components/EmergencyContact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Service from "@/components/Service";
import Testimonial from "@/components/Testimonials";
import WorkingProcess from "@/components/WorkingProcess";

export default function Home() {
  return (
    <div className="font-dm-sans">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-12">
        {/* Add padding to avoid content being hidden behind the fixed navbar */}
        <Hero />
        <AboutUs />
        <Service />
        <FAQ />
        <WorkingProcess />
        <Appointment />
        <EmergencyContact />
        <Doctors />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
}
