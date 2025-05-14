"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useParams } from 'next/navigation';
import jobServices from '@/services/job';

const Page = () => {
    const params = useParams();
    const { roleName, userId } = params;

    const [formData, setFormData] = useState({
        customer_id: userId,
        title: '',
        short_description: '',
        long_description: '',
        min_price: '',
        max_price: '',
        duration: '',
        difficulty_state: '',
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...formData,
                customer_id: userId,
                min_price: Number(formData.min_price),
                max_price: Number(formData.max_price),
                difficulty_state: formData.difficulty_state === "true"
            };

            await jobServices.add(dataToSend);

            setMessage("Job successfully created!");
            setFormData({
                title: '',
                short_description: '',
                long_description: '',
                min_price: '',
                max_price: '',
                duration: '',
                difficulty_state: '',
            });
        } catch (err) {
            console.error(err);
            setMessage("Failed to create job.");
        }
    };

  return (
    <div className='flex flex-col lg:flex-row justify-center items-start gap-10 w-full max-w-[1200px] mt-2 mx-auto'>
      {/* Sidebar */}
      <div className="w-full lg:w-1/6 p-5 mt-10 border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {/* Content */}
      <div className='w-full lg:w-5/6 p-5'>
        <h2 className="text-2xl font-bold mb-4">Open a New Job</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" className="border p-2 rounded" required />
            <input type="text" name="short_description" value={formData.short_description} onChange={handleChange} placeholder="Short Description" className="border p-2 rounded" required />
            <textarea name="long_description" value={formData.long_description} onChange={handleChange} placeholder="Long Description" className="border p-2 rounded" rows={5} required />
            <div className="flex flex-col sm:flex-row gap-4">
                <input type="number" name="min_price" value={formData.min_price} onChange={handleChange} placeholder="Minimum Price" className="border p-2 rounded w-full" required />
                <input type="number" name="max_price" value={formData.max_price} onChange={handleChange} placeholder="Maximum Price" className="border p-2 rounded w-full" required />
            </div>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Estimated Duration (e.g., 2 weeks)" className="border p-2 rounded" required />
            <input type="text" name="difficulty_state" value={formData.difficulty_state} onChange={handleChange} placeholder="Difficulty State" className="border p-2 rounded" required />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Submit Job</button>
            {message && <p className="text-sm text-blue-600 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Page;