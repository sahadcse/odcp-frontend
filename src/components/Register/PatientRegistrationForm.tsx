"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Cookies from "js-cookie";

const baseURl = process.env.NEXT_PUBLIC_API_URL;

const PatientRegistrationForm = () => {
  interface FormData {
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    blood_group: string;
    height: {
      feet: string;
      inches: string;
    };
    weight: {
      value: string;
      unit: string;
    };
    emergency_contact: {
      name: string;
      phone_number: string;
      relationship: string;
    };
    terms_accepted: boolean;
    consent_form_signed: boolean;
    address: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  }

  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    height: { feet: "", inches: "" },
    weight: { value: "", unit: "" },
    emergency_contact: { name: "", phone_number: "", relationship: "" },
    terms_accepted: false,
    consent_form_signed: false,
    address: {
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (
      name.includes("height") ||
      name.includes("weight") ||
      name.includes("emergency_contact") ||
      name.includes("address")
    ) {
      const [category, field] = name.split(".");
      setFormData({
        ...formData,
        [category]: {
          ...(formData[category as keyof FormData] as any),
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.full_name) newErrors.full_name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone Number is required";
    if (!formData.date_of_birth)
      newErrors.date_of_birth = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.blood_group)
      newErrors.blood_group = "Blood Group is required";
    if (!formData.height.feet)
      newErrors["height.feet"] = "Height (Feet) is required";
    if (!formData.height.inches)
      newErrors["height.inches"] = "Height (Inches) is required";
    if (!formData.weight.value)
      newErrors["weight.value"] = "Weight is required";
    if (!formData.weight.unit)
      newErrors["weight.unit"] = "Weight Unit is required";
    if (!formData.emergency_contact.name)
      newErrors["emergency_contact.name"] =
        "Emergency Contact Name is required";
    if (!formData.emergency_contact.phone_number)
      newErrors["emergency_contact.phone_number"] =
        "Emergency Contact Phone Number is required";
    if (!formData.emergency_contact.relationship)
      newErrors["emergency_contact.relationship"] =
        "Emergency Contact Relationship is required";
    if (!formData.terms_accepted)
      newErrors.terms_accepted = "You must accept the terms";
    if (!formData.consent_form_signed)
      newErrors.consent_form_signed = "You must sign the consent form";
    if (!formData.address.street)
      newErrors["address.street"] = "Street is required";
    if (!formData.address.city) newErrors["address.city"] = "City is required";
    if (!formData.address.state)
      newErrors["address.state"] = "State is required";
    if (!formData.address.postal_code)
      newErrors["address.postal_code"] = "Postal Code is required";
    if (!formData.address.country)
      newErrors["address.country"] = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(
        `${baseURl}/api/users/patient/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      Cookies.set("token", data.token);
      Cookies.set("user", JSON.stringify(data.patient));
      window.location.href = "/patient/dashboard";
      console.log("Form submitted successfully:", data);

      // Reset form after successful submission
      setFormData({
        full_name: "",
        email: "",
        password: "",
        phone_number: "",
        date_of_birth: "",
        gender: "",
        blood_group: "",
        height: { feet: "", inches: "" },
        weight: { value: "", unit: "" },
        emergency_contact: { name: "", phone_number: "", relationship: "" },
        terms_accepted: false,
        consent_form_signed: false,
        address: {
          street: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="space-y-4 w-7/10 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Section */}
        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors.full_name && (
              <span className="text-red-500">{errors.full_name}</span>
            )}
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        {/* Phone Number and Date of Birth Section */}
        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors.phone_number && (
              <span className="text-red-500">{errors.phone_number}</span>
            )}
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input
              type="date"
              name="date_of_birth"
              placeholder="Date of Birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors.date_of_birth && (
              <span className="text-red-500">{errors.date_of_birth}</span>
            )}
          </div>
        </div>

        {/* Gender and Blood Group Section */}
        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender}</span>
            )}
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.blood_group && (
              <span className="text-red-500">{errors.blood_group}</span>
            )}
          </div>
        </div>

        {/* Height Section */}
        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Height (Feet)</span>
            </label>
            <input
              type="text"
              name="height.feet"
              placeholder="Height (Feet)"
              value={formData.height.feet}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["height.feet"] && (
              <span className="text-red-500">{errors["height.feet"]}</span>
            )}
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Height (Inches)</span>
            </label>
            <input
              type="text"
              name="height.inches"
              placeholder="Height (Inches)"
              value={formData.height.inches}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["height.inches"] && (
              <span className="text-red-500">{errors["height.inches"]}</span>
            )}
          </div>
        </div>

        {/* Weight Section */}
        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Weight</span>
            </label>
            <input
              type="text"
              name="weight.value"
              placeholder="Weight"
              value={formData.weight.value}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["weight.value"] && (
              <span className="text-red-500">{errors["weight.value"]}</span>
            )}
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Weight Unit</span>
            </label>
            <input
              type="text"
              name="weight.unit"
              placeholder="Weight Unit"
              value={formData.weight.unit}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["weight.unit"] && (
              <span className="text-red-500">{errors["weight.unit"]}</span>
            )}
          </div>
        </div>

        {/* Address Section */}
        <h3 className="text-lg font-semibold">Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Street</span>
            </label>
            <input
              type="text"
              name="address.street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["address.street"] && (
              <span className="text-red-500">{errors["address.street"]}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["address.city"] && (
              <span className="text-red-500">{errors["address.city"]}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">State</span>
            </label>
            <input
              type="text"
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["address.state"] && (
              <span className="text-red-500">{errors["address.state"]}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Postal Code</span>
            </label>
            <input
              type="text"
              name="address.postal_code"
              placeholder="Postal Code"
              value={formData.address.postal_code}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["address.postal_code"] && (
              <span className="text-red-500">
                {errors["address.postal_code"]}
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              type="text"
              name="address.country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["address.country"] && (
              <span className="text-red-500">{errors["address.country"]}</span>
            )}
          </div>
        </div>

        {/* Emergency Contact Section */}
        <h3 className="text-lg font-semibold">Emergency Contact</h3>
        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Emergency Contact Name</span>
            </label>
            <input
              type="text"
              name="emergency_contact.name"
              placeholder="Emergency Contact Name"
              value={formData.emergency_contact.name}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["emergency_contact.name"] && (
              <span className="text-red-500">
                {errors["emergency_contact.name"]}
              </span>
            )}
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Emergency Contact Phone Number</span>
            </label>
            <input
              type="text"
              name="emergency_contact.phone_number"
              placeholder="Emergency Contact Phone Number"
              value={formData.emergency_contact.phone_number}
              onChange={handleChange}
              className="input input-bordered"
            />
            {errors["emergency_contact.phone_number"] && (
              <span className="text-red-500">
                {errors["emergency_contact.phone_number"]}
              </span>
            )}
          </div>
        </div>

        {/* Emergency Contact Relationship Section */}
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Emergency Contact Relationship</span>
          </label>
          <input
            type="text"
            name="emergency_contact.relationship"
            placeholder="Emergency Contact Relationship"
            value={formData.emergency_contact.relationship}
            onChange={handleChange}
            className="input input-bordered"
          />
          {errors["emergency_contact.relationship"] && (
            <span className="text-red-500">
              {errors["emergency_contact.relationship"]}
            </span>
          )}
        </div>

        {/* Terms Accepted and Consent Form Signed Section */}
        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="cursor-pointer label">
              <span className="label-text">Terms Accepted</span>
              <input
                type="checkbox"
                name="terms_accepted"
                checked={formData.terms_accepted}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
            </label>
            {errors.terms_accepted && (
              <span className="text-red-500">{errors.terms_accepted}</span>
            )}
          </div>
          <div className="form-control flex-1">
            <label className="cursor-pointer label">
              <span className="label-text">Consent Form Signed</span>
              <input
                type="checkbox"
                name="consent_form_signed"
                checked={formData.consent_form_signed}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
            </label>
            {errors.consent_form_signed && (
              <span className="text-red-500">{errors.consent_form_signed}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistrationForm;
