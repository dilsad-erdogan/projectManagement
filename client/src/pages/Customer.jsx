"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Customer = ({ roleName, userId }) => {
  const router = useRouter();
  const jobs = useSelector(state => state.job.jobs);
  const [userJobs, setUserJobs] = useState([]);

  useEffect(() => {
    if (jobs.length > 0) {
      const filteredJobs = jobs.filter(job => job.customer_id === userId);
      setUserJobs(filteredJobs);
    }
  }, [jobs, userId]);

  return (
    <div className="flex flex-col gap-10 items-start justify-start mt-10 max-w-3xl mx-auto">
      <button onClick={() => router.push(`/open-job/${roleName}/${userId}`)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Open Job</button>

      {/* Job List */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {userJobs.length === 0 ? (
          <p className="text-gray-600">You haven't opened any jobs yet.</p>
        ) : (
          userJobs.map((job) => (
            <div key={job._id} className="border rounded shadow p-4 cursor-pointer" onClick={() => router.push(`/jobs/${roleName}/${userId}/${job._id}`)}>
              <h3 className="text-xl font-semibold text-green-700">{job.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{job.short_description}</p>
              <p className="text-sm text-gray-500 mt-2">Price Range: {job.min_price} - {job.max_price}₺</p>
              <p className="text-sm text-gray-500">Estimated Duration: {job.duration}</p>
              <p className={`text-sm mt-1 ${job.difficulty_state ? 'text-red-500' : 'text-blue-500'}`}>
                Difficulty: {job.difficulty_state ? 'Difficult' : 'Easy'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Customer;