"use client";
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';

const baseURl = process.env.NEXT_PUBLIC_API_URL;

// Define the structure of social links
interface SocialLinks {
    twitter: string;
    linkedin: string;
}

// Define the structure of the form data
interface FormData {
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    bio: string;
    address: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    specialization: string;
    qualifications: string[];
    experience_years: string;
    license_number: string;
    consultation_fee: string;
    availability: { day: string; time_slots: string }[];
    languages_spoken: string[];
    hospital_affiliations: { name: string; address: { street: string; city: string; state: string; postal_code: string; country: string } }[];
    awards_and_recognitions: string[];
    consent_form_signed: boolean;
    terms_accepted: boolean;
    social_links: SocialLinks;
}



const DoctorRegistrationForm = () => {
    // Initialize form data state
    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        email: '',
        password: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        bio: '',
        address: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        specialization: '',
        experience_years: '',
        license_number: '',
        consultation_fee: '',
        social_links: {
            twitter: '',
            linkedin: ''
        },
        consent_form_signed: false,
        terms_accepted: false,

        qualifications: [],
        availability: [],
        languages_spoken: [],
        hospital_affiliations: [],
        awards_and_recognitions: [],
    });

    const [qualification, setQualification] = useState<string>('');
    const [dAvailability, setDAvailability] = useState<{ day: string; time_slots: string }[]>([{ day: '', time_slots: '' }]);
    const [languagesSpoken, setLanguagesSpoken] = useState<string[]>(['']);
    const [hospitalAffiliations, setHospitalAffiliations] = useState<{ name: string; address: { street: string; city: string; state: string; postal_code: string; country: string } }[]>([{ name: '', address: { street: '', city: '', state: '', postal_code: '', country: '' } }]);
    const [awardsAndRecognitions, setAwardsAndRecognitions] = useState<string[]>(['']);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();
    const router = useRouter();
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (name.includes('social_links')) {
            const socialName = name.split('.')[1];
            setFormData({ ...formData, social_links: { ...formData.social_links, [socialName]: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        for (const key in formData) {
            if (typeof formData[key as keyof FormData] === 'string' && (formData[key as keyof FormData] as string).trim() === '') {
                newErrors[key] = `Please fill the ${key.replace('_', ' ')} field.`;
            }
            if (typeof formData[key as keyof FormData] === 'boolean' && !formData[key as keyof FormData]) {
                newErrors[key] = `Please accept the ${key.replace('_', ' ')}.`;
            }
            if (Array.isArray(formData[key as keyof FormData]) && (formData[key as keyof FormData] as any[]).length === 0) {
                newErrors[key] = `Please fill the ${key.replace('_', ' ')} field.`;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const renderInputField = (label: string, name: string, type: string = 'text', placeholder: string = '') => (
        <div className="form-control flex-1">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder || label}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="input input-bordered"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
        </div>
    );

    const renderTextAreaField = (label: string, name: string, placeholder: string = '') => (
        <div className="form-control flex-1">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <textarea
                name={name}
                placeholder={placeholder || label}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="textarea textarea-bordered h-10"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
        </div>
    );

    const renderSelectField = (label: string, name: string, options: { value: string, label: string }[]) => (
        <div className="form-control flex-1">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="select select-bordered"
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
        </div>
    );


    const addQualification = () => {
        const updatedQualifications = [...formData.qualifications, qualification];
        setFormData({ ...formData, qualifications: updatedQualifications });
        console.log("quali: ", updatedQualifications);
        setQualification('');
    };

    const handleRemoveQualification = (index: number) => {
        const updatedQualifications = formData.qualifications.filter((_, i) => i !== index);
        setFormData({ ...formData, qualifications: updatedQualifications });
    };

    const addAvailability = () => {
        const updateAvailability = [...formData.availability, dAvailability[0]];
        setFormData({ ...formData, availability: updateAvailability });
        setDAvailability([{ day: '', time_slots: '' }]);
    }

    const handleRemoveAvailability = (index: number) => {
        const updatedAvailability = formData.availability.filter((_, i) => i !== index);
        setFormData({ ...formData, availability: updatedAvailability });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${baseURl}/api/users/doctor/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }


                const data = await response.json();
                dispatch(login({ data: data, role: 'doctor' }));
                Cookies.set('token', data.token);
                Cookies.set('user', JSON.stringify(data.doctor));
                router.push('/doctor/dashboard');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full md:w-7/10 p-4 mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
                {renderInputField('Full Name', 'full_name')}
                {renderInputField('Email', 'email', 'email')}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
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
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                {renderInputField('Phone Number', 'phone_number')}
                {renderInputField('Date of Birth', 'date_of_birth', 'date')}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                {renderSelectField('Gender', 'gender', [
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' }
                ])}
                {renderTextAreaField('Bio', 'bio')}
            </div>
            {renderInputField('Address', 'address')}
            <div className="flex flex-col md:flex-row gap-4">
                {renderInputField('Street', 'street')}
                {renderInputField('City', 'city')}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                {renderInputField('State', 'state')}
                {renderInputField('Postal Code', 'postal_code')}
            </div>
            {renderInputField('Country', 'country')}
            {renderInputField('Specialization', 'specialization')}
            {renderInputField('Years of Experience', 'experience_years')}
            {renderInputField('License Number', 'license_number')}
            {renderInputField('Consultation Fee', 'consultation_fee')}

            {/* Qualifications */}
            <div className="form-control flex-1">
                <label className="label">
                    <span className="label-text">Qualifications</span>
                </label>
                <div className="flex justify-between mb-3 flex-col gap-2 md:flex-row">
                    <input
                        type="text"
                        name="qualifications"
                        placeholder="Qualifications"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="input input-bordered"
                    />
                    <button type="button" onClick={addQualification} className="btn btn-sm btn-primary mt-2">Add Qualification</button>
                </div>
                <div className="flex">
                    <ul className="flex gap-4 flex-wrap">
                        {formData.qualifications.map((qualification, index) => (
                            <li key={index} className=' list-none border-2 px-2 border-purple-600'>
                                <span className=' mr-3'>{qualification}</span>
                                <span className='bg-red-800 px-2 text-white cursor-pointer' onClick={() => handleRemoveQualification(index)}>X</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Availability */}
            <div className="form-control flex-1">
                <label className="label">
                    <span className="label-text">Availability</span>
                </label>
                <div className="flex justify-between mb-3 flex-col gap-2 md:flex-row">
                    <input
                        type="text"
                        name="availability.day"
                        placeholder="Day"
                        value={dAvailability[0].day}
                        onChange={(e) => setDAvailability([{ ...dAvailability[0], day: e.target.value }])}
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="availability.time_slots"
                        placeholder="time_slots"
                        value={dAvailability[0].time_slots}
                        onChange={(e) => setDAvailability([{ ...dAvailability[0], time_slots: e.target.value }])}
                        className="input input-bordered"
                    />
                    <button type="button" onClick={addAvailability} className="btn btn-sm btn-primary mt-2">Add Availability</button>
                </div>
                <div className="flex">
                    <ul className="flex gap-4 flex-wrap">
                        {formData.availability.map((slot, index) => (
                            <li key={index} className='list-none border-2 px-2 border-purple-600'>
                                <span className='mr-3'>{slot.day} - {slot.time_slots}</span>
                                <span className='bg-red-800 px-2 text-white cursor-pointer' onClick={() => handleRemoveAvailability(index)}>X</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
            </div>

            {/* Languages Spoken */}
            <div className="form-control flex-1">
                <label className="label">
                    <span className="label-text">Languages Spoken</span>
                </label>
                <div className="flex justify-between mb-3 flex-col gap-2 md:flex-row">
                    <input
                        type="text"
                        name="languages_spoken"
                        placeholder="Languages Spoken"
                        value={languagesSpoken[0]}
                        onChange={(e) => setLanguagesSpoken([e.target.value])}
                        className="input input-bordered"
                    />
                    <button type="button" onClick={() => {
                        setFormData({ ...formData, languages_spoken: [...formData.languages_spoken, languagesSpoken[0]] });
                        setLanguagesSpoken(['']);
                    }} className="btn btn-sm btn-primary mt-2">Add Language</button>
                </div>
                <div className="flex">
                    <ul className="flex gap-4 flex-wrap">
                        {formData.languages_spoken.map((language, index) => (
                            <li key={index} className='list-none border-2 px-2 border-purple-600'>
                                <span className='mr-3'>{language}</span>
                                <span className='bg-red-800 px-2 text-white cursor-pointer' onClick={() => {
                                    const updatedLanguages = formData.languages_spoken.filter((_, i) => i !== index);
                                    setFormData({ ...formData, languages_spoken: updatedLanguages });
                                }}>X</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {errors.languages_spoken && <p className="text-red-500 text-sm">{errors.languages_spoken}</p>}
            </div>

            {/* Hospital Affiliations */}
            <div className="form-control flex-1">
                <label className="label">
                    <span className="label-text">Hospital Affiliations</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="hospital_affiliations.name"
                        placeholder="Hospital Name"
                        value={hospitalAffiliations[0].name}
                        onChange={(e) => setHospitalAffiliations([{ ...hospitalAffiliations[0], name: e.target.value }])}
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="hospital_affiliations.address.street"
                        placeholder="Street"
                        value={hospitalAffiliations[0].address.street}
                        onChange={(e) => setHospitalAffiliations([{ ...hospitalAffiliations[0], address: { ...hospitalAffiliations[0].address, street: e.target.value } }])}
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="hospital_affiliations.address.city"
                        placeholder="City"
                        value={hospitalAffiliations[0].address.city}
                        onChange={(e) => setHospitalAffiliations([{ ...hospitalAffiliations[0], address: { ...hospitalAffiliations[0].address, city: e.target.value } }])}
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="hospital_affiliations.address.state"
                        placeholder="State"
                        value={hospitalAffiliations[0].address.state}
                        onChange={(e) => setHospitalAffiliations([{ ...hospitalAffiliations[0], address: { ...hospitalAffiliations[0].address, state: e.target.value } }])}
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="hospital_affiliations.address.postal_code"
                        placeholder="Postal Code"
                        value={hospitalAffiliations[0].address.postal_code}
                        onChange={(e) => setHospitalAffiliations([{ ...hospitalAffiliations[0], address: { ...hospitalAffiliations[0].address, postal_code: e.target.value } }])}
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="hospital_affiliations.address.country"
                        placeholder="Country"
                        value={hospitalAffiliations[0].address.country}
                        onChange={(e) => setHospitalAffiliations([{ ...hospitalAffiliations[0], address: { ...hospitalAffiliations[0].address, country: e.target.value } }])}
                        className="input input-bordered"
                    />
                </div>
                <button type="button" onClick={() => {
                    setFormData({ ...formData, hospital_affiliations: [...formData.hospital_affiliations, hospitalAffiliations[0]] });
                    setHospitalAffiliations([{ name: '', address: { street: '', city: '', state: '', postal_code: '', country: '' } }]);
                }} className="btn btn-sm btn-primary mt-2">Add Hospital</button>
                <div className="flex mt-3">
                    <ul className="flex gap-4 flex-wrap">
                        {formData.hospital_affiliations.map((hospital, index) => (
                            <li key={index} className='list-none border-2 px-2 border-purple-600'>
                                <span className='mr-3'>{hospital.name}, {hospital.address.street}, {hospital.address.city}, {hospital.address.state}, {hospital.address.postal_code}, {hospital.address.country}</span>
                                <span className='bg-red-800 px-2 text-white cursor-pointer' onClick={() => {
                                    const updatedHospitals = formData.hospital_affiliations.filter((_, i) => i !== index);
                                    setFormData({ ...formData, hospital_affiliations: updatedHospitals });
                                }}>X</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {errors.hospital_affiliations && <p className="text-red-500 text-sm">{errors.hospital_affiliations}</p>}
            </div>

            {/* Awards and Recognitions */}
            <div className="form-control flex-1">
                <label className="label">
                    <span className="label-text">Awards and Recognitions</span>
                </label>
                <div className="flex justify-between mb-3 flex-col gap-2 md:flex-row">
                    <input
                        type="text"
                        name="awards_and_recognitions"
                        placeholder="Awards and Recognitions"
                        value={awardsAndRecognitions[0]}
                        onChange={(e) => setAwardsAndRecognitions([e.target.value])}
                        className="input input-bordered"
                    />
                    <button type="button" onClick={() => {
                        setFormData({ ...formData, awards_and_recognitions: [...formData.awards_and_recognitions, awardsAndRecognitions[0]] });
                        setAwardsAndRecognitions(['']);
                    }} className="btn btn-sm btn-primary mt-2">Add Award</button>
                </div>
                <div className="flex">
                    <ul className="flex gap-4 flex-wrap">
                        {formData.awards_and_recognitions.map((award, index) => (
                            <li key={index} className='list-none border-2 px-2 border-purple-600'>
                                <span className='mr-3'>{award}</span>
                                <span className='bg-red-800 px-2 text-white cursor-pointer' onClick={() => {
                                    const updatedAwards = formData.awards_and_recognitions.filter((_, i) => i !== index);
                                    setFormData({ ...formData, awards_and_recognitions: updatedAwards });
                                }}>X</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {errors.awards_and_recognitions && <p className="text-red-500 text-sm">{errors.awards_and_recognitions}</p>}
            </div>


            <div className="flex flex-col md:flex-row gap-4">
                {renderInputField('Twitter', 'social_links.twitter')}
                {renderInputField('LinkedIn', 'social_links.linkedin')}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="form-control flex-1">
                    <label className="cursor-pointer label">
                        <span className="label-text">Consent Form Signed</span>
                        <input type="checkbox" name="consent_form_signed" checked={formData.consent_form_signed} onChange={handleChange} className="checkbox checkbox-primary" />
                    </label>
                    {errors.consent_form_signed && <p className="text-red-500 text-sm">{errors.consent_form_signed}</p>}
                </div>
                <div className="form-control flex-1">
                    <label className="cursor-pointer label">
                        <span className="label-text">Terms Accepted</span>
                        <input type="checkbox" name="terms_accepted" checked={formData.terms_accepted} onChange={handleChange} className="checkbox checkbox-primary" />
                    </label>
                    {errors.terms_accepted && <p className="text-red-500 text-sm">{errors.terms_accepted}</p>}
                </div>
            </div>
            <button type="submit" className="btn btn-success w-full md:w-auto">Submit</button>
        </form>
    );
};

export default DoctorRegistrationForm;
