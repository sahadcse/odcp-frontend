"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Cookies = require("js-cookie");
import AdminLayout from "@/components/Admin/AdminLayout";
import withAuth from "@/common/WithAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    recipient: "",
    recipientType: "Patient",
    title: "",
    message: "",
    link: "",
    type: "System",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastOpacity, setToastOpacity] = useState<number>(1);

  useEffect(() => {
    if (toastMessage) {
      setToastOpacity(1);
      const timer = setTimeout(() => {
        setToastOpacity(0);
        setTimeout(() => {
          setToastMessage(null);
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  interface FormData {
    recipient: string;
    recipientType: string;
    title: string;
    message: string;
    link?: string;
    type: string;
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `${baseURL}/api/admins/admin/notifications`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToastMessage("Notification sent successfully!");
      setFormData({
        recipient: "",
        recipientType: "Patient",
        title: "",
        message: "",
        link: "",
        type: "System",
      });
      console.log("Notification sent:", response.data);
    } catch (error) {
      setToastMessage("Error sending notification.");
      console.error("Error sending notification:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <AdminLayout>
      {toastMessage && (
        <div
          className="fixed top-6 right-4 bg-blue-500 text-white p-4 rounded-md shadow-md transition-opacity duration-500"
          style={{ opacity: toastOpacity }}
        >
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md grid grid-cols-2 gap-4">
        <h2 className="col-span-2 text-2xl font-bold mb-6">Send Notification</h2>
        <div className="col-span-2 md:col-span-1 mb-4">
          <label className="block text-gray-700">Recipient</label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="col-span-2 md:col-span-1 mb-4">
          <label className="block text-gray-700">Recipient Type</label>
          <select
            name="recipientType"
            value={formData.recipientType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>
        <div className="col-span-2 mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="col-span-2 mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="col-span-2 md:col-span-1 mb-4">
          <label className="block text-gray-700">Link (optional)</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="col-span-2 md:col-span-1 mb-4">
          <label className="block text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Appointment">Appointment</option>
            <option value="Consultation">Consultation</option>
            <option value="System">System</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>
        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Send Notification
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default withAuth(NotificationForm,['admin']);
