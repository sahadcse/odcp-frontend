"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorRegistrationForm from "@/components/Register/DoctorRegistrationForm";
import PatientRegistrationForm from "@/components/Register/PatientRegistrationForm";

const roleRedirects = {
  doctor: "/doctor/dashboard",
  patient: "/patient/dashboard",
};

const RegistrationPage = () => {
  const [error, setError] = useState(null);
  const [role, setRole] = useState<"doctor" | "patient" | "">("");

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col w-full">
            <div className="text-center">
              <h1 className="text-2xl mt-3 font-bold">Registration</h1>
            </div>
            <div className="card w-full md:w-4/5 lg:w-3/5 border shadow-2xl bg-base-100">
              <div className="card-body p-4 md:p-8">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="form-control flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                  <label className="label">
                    <span className="label-text text-lg">I am a</span>
                  </label>
                  <select
                    className="select select-bordered text-lg w-full md:w-auto"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as keyof typeof roleRedirects)
                    }
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
                <div className="form-control mt-6 flex">
                  {role === "doctor" ? (
                    <DoctorRegistrationForm />
                  ) : role === "patient" ? (
                    <PatientRegistrationForm />
                  ) : null}
                </div>
                <div className="text-center md:text-left">
                  Already have an account?{" "}
                  <Link href="/login" className="text-secondary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegistrationPage;
