"use client";

import React from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; 

const JobCard = ({ job }) => {
    const router = useRouter();
    const users = useSelector(state => state.user.users);
    const customer = users.find(user => user._id === job.customer_id);

    return (
        <div className='p-1 m-1' onClick={() => router.push(`/job/${job._id}`)}>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-bold'>{job.title}</h2>
                    <p>{job.short_description}</p>
                    <p className='text-sm text-gray-600'>{job.duration}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-lg'>{customer ? (customer.name)+" "+(customer.surname) : 'Unknown Customer'}</p>
                    <p className='text-sm'>${job.min_price} - ${job.max_price}</p>
                    <p className='text-sm text-gray-600 flex items-center gap-2'>Difficulty State: {job.difficulty_state ? (<FaCheck />) : (<FaTimes />)}</p>
                </div>
            </div>
        </div>
    )
}

export default JobCard;