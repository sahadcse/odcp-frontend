'use client';
import DashboardHeroNav from '@/components/DoctorHero/DashboardHeroNav';
import DoctorLayout from '@/components/DoctorLayout';
import { AvilabilityData } from "@/data/avilabilityData";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeader } from '@/utils';
import withAuth from '@/common/WithAuth';

const AvailabilityTable = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const getAvilabilityData = async () => {
            try {
                const data = await AvilabilityData();
                setData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        };

        getAvilabilityData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BACKEND_API_URL}/api/users/doctor/availability/${id}/delete`, {
                headers: authHeader(),
            });
            setData(data.filter(item => item._id !== id));
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    const handleEdit = (id) => {
        const item = data.find(item => item._id === id);
        setCurrentItem(item);
        setShowModal(true);
    };

    const handleModalToggle = () => {
        setShowModal(!showModal);
        setCurrentItem(null); // Reset for new item
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentItem._id) {
                // Update existing item
                const response = await axios.put(`${BACKEND_API_URL}/api/users/doctor/availability/${currentItem._id}/update`, {availability:[{
                    day: currentItem.day,
                    time_slots: currentItem.time_slots.split(',').map((slot) => slot.trim()),
                }]}, {
                    headers: authHeader(),
                });
                setData(data.map(item => (item._id === currentItem._id ? response.data : item)));
            } else {
                // Create new item
                const response = await axios.post(`${BACKEND_API_URL}/api/users/doctor/availability/create`, {availability:[{
                    day: currentItem.day,
                    time_slots: currentItem.time_slots.split(',').map((slot) => slot.trim()),
                }]}, {
                    headers: authHeader(),
                });
                setData([...data, response.data]);
            }
            handleModalToggle();
        } catch (err) {
            console.error('Error submitting form:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DoctorLayout>
            <DashboardHeroNav headName={`Dashboard`} />
            <div className="container mx-auto py-8">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
                    onClick={handleModalToggle}
                >
                    Add New
                </button>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">
                                {currentItem?._id ? 'Edit Item' : 'Add New Item'}
                            </h2>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Day</label>
                                    <input
                                        type="text"
                                        name="day"
                                        value={currentItem?.day || ''}
                                        onChange={handleFormChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Time Slots</label>
                                    <input
                                        type="text"
                                        name="time_slots"
                                        value={currentItem?.time_slots || ''}
                                        onChange={handleFormChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        placeholder="Enter comma-separated values, e.g., 43, 45"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded mr-2"
                                        onClick={handleModalToggle}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Table */}
                <table className="min-w-full table-auto border-collapse bg-white shadow rounded-lg p-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Sl</th>
                            <th className="border px-4 py-2">Day</th>
                            <th className="border px-4 py-2">Time Slots</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id} className="text-center">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{item.day}</td>
                                <td className="border px-4 py-2">
                                    {item.time_slots?.join(', ')}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded mr-2"
                                        onClick={() => handleEdit(item._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DoctorLayout>
    );
};

export default withAuth(AvailabilityTable,['doctor']);
