"use client";
import React from 'react'
import { useSelector } from 'react-redux';
import JobCard from "../components/JobCard";

const Main = () => {
  const jobs = useSelector(state => state.job.jobs);

  return (
    <div className='flex-1 justify-center items-center mt-16'>
      <div className='flex flex-col p-2 gap-5'>
        {jobs.map((job) => (
          <div key={job._id} className="bg-white w-full p-4 rounded-lg shadow-md transition duration-200 transform hover:scale-y-125 cursor-pointer">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main