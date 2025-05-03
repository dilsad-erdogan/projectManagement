"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const page = () => {
  const params = useParams();
  const { roleName, userId, jobId } = params;

  const jobs = useSelector(state => state.job.jobs);
  const users = useSelector(state => state.user.users);

  const job = jobs.find(j => j._id === jobId);
  const owner = job ? users.find(u => u._id === job.customer_id) : null;

  return (
    <div className='flex justify-center items-start gap-10 w-full max-w-[1200px] mt-2'>
      {/* Sidebar */}
      <div className="w-1/6 p-5 mt-10 h-full overflow-y-auto border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {/* Content */}
      <div className='flex justify-center items-start w-full max-w-[1200px]'>
        <div className="w-5/6 p-5 flex flex-col justify-start overflow-y-auto">
          {job ? (
            <div className="p-5 border rounded-2xl cursor-pointer">
              <h2 className="text-2xl font-bold mb-4">Job Details</h2>
              <p><strong>Owner:</strong> {owner ? `${owner.name} ${owner.surname}` : job.customer_id}</p>
              <p><strong>Title:</strong> {job.title}</p>
              <p><strong>Short Description:</strong> {job.short_description}</p>
              <p><strong>Long Description:</strong> {job.long_description}</p>
              <p><strong>Price Range:</strong> {job.min_price}₺ - {job.max_price}₺</p>
              <p><strong>Duration:</strong> {job.duration}</p>
              <p><strong>Starting State:</strong> {job.starting_state ? "True" : "False"}</p>
              <p><strong>Completion State:</strong> {job.completion_state ? "True" : "False"}</p>
              <p><strong>Difficulty State:</strong> {job.difficulty_state ? "True" : "False"}</p>
            </div>
          ) : (
            <p>Job not found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page;