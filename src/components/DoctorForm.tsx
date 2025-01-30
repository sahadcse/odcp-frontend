"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { authHeader } from "@/utils";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import LoadingSpinner from "./LoadingSpinner";

const DoctorForm = ({ existingUser }) => {
  const [initialValues, setInitialValues] = useState(null);
  const [previewImage, setPreviewImage] = useState({
    file: null,
    initialStatus: false,
  });

  const { push } = useRouter();

  const isUpdate = !!existingUser;

  useEffect(() => {
    if (existingUser) {
      setInitialValues({
        name: existingUser.name || "",
        email: existingUser.email || "",
        password: "",
        role: existingUser.role || "",
        contactInfo: {
          phone: existingUser.contactInfo?.phone || "",
          address: existingUser.contactInfo?.address || "",
        },
        // profilePicture: null,
        specialization: existingUser.specialization || "",
        availability: existingUser.availability || "",
      });
      setPreviewImage({ file: existingUser.profilePicture, initialStatus: true });
    } else {
      setInitialValues({
        name: "",
        email: "",
        password: "",
        role: "",
        contactInfo: {
          phone: "",
          address: "",
        },
        // profilePicture: null,
        specialization: "",
        availability: "",
      });
    }
  }, [existingUser]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: isUpdate
      ? Yup.string().nullable()
      : Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
    contactInfo: Yup.object({
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
    }),
    // profilePicture: isUpdate
    //   ? Yup.mixed().nullable()
    //   : Yup.mixed().required("A profile picture is required"),
    specialization: Yup.string().required("Specialization is required"),
    availability: Yup.string().required("Availability is required"),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    if (values.password) formData.append("password", values.password);
    formData.append("role", values.role);
    formData.append("contactInfo[phone]", values.contactInfo.phone);
    formData.append("contactInfo[address]", values.contactInfo.address);
    formData.append("specialization", values.specialization);
    formData.append("availability", values.availability);

    if (values.profilePicture) {
      formData.append("profilePicture", values.profilePicture);
    }

    try {
      if (isUpdate) {
        const response = await axios.put(
          `https://room-booking-and-management-system.vercel.app/api/users/${existingUser._id}`,
          { ...values, profilePicture: values.profilePicture || existingUser.profilePicture },
          { headers: authHeader(true) }
        );

        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "User updated successfully!",
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          });
          push("/admin/users/all");
        }
      } else {
        const response = await axios.post(
          "https://odcp-backend-production.up.railway.app/api/users/register",
          { ...values }
        );

        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "User created successfully!",
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          });
          push("/admin/doctors/all");
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handlePictureChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("profilePicture", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage({ file: reader.result, initialStatus: false });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!initialValues) {
    return <LoadingSpinner />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col space-y-4 w-full font-work-sans">
          <Field name="name" type="text" placeholder="Name" className="input" />
          <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />

          <Field name="email" type="email" placeholder="Email" className="input" />
          <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />

          {!isUpdate && (
            <>
              <Field name="password" type="password" placeholder="Password" className="input" />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
            </>
          )}

          <Field name="role" as="select" className="input">
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
          </Field>
          <ErrorMessage name="role" component="div" className="text-red-600 text-sm" />

          <div>
            <Field name="contactInfo.phone" type="text" placeholder="Phone" className="input" />
            <ErrorMessage name="contactInfo.phone" component="div" className="text-red-600 text-sm" />

            <Field name="contactInfo.address" type="text" placeholder="Address" className="input ms-4" />
            <ErrorMessage name="contactInfo.address" component="div" className="text-red-600 text-sm" />
          </div>

          <Field
            name="specialization"
            type="text"
            placeholder="Specialization"
            className="input"
          />
          <ErrorMessage name="specialization" component="div" className="text-red-600 text-sm" />

          <Field
            name="availability"
            type="text"
            placeholder="Availability (e.g., Monday-Friday, 12AM-9PM)"
            className="input"
          />
          <ErrorMessage name="availability" component="div" className="text-red-600 text-sm" />

          <div>
            {previewImage.file && (
              <img
                src={previewImage.initialStatus ? previewImage.file : previewImage.file}
                alt="Preview"
                className="w-full max-w-md"
              />
            )}
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={(event) => handlePictureChange(event, setFieldValue)}
              className="file-input"
            />
            <ErrorMessage name="profilePicture" component="div" className="text-red-600 text-sm" />
          </div>

          <button type="submit" className="btn btn-active">
            {isUpdate ? "Update User" : "Create User"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DoctorForm;
