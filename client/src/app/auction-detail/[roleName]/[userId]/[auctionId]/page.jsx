"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const page = () => {
  const params = useParams();
  const { roleName, userId, auctionId } = params;

  const auctions = useSelector(state => state.auction.auctions);
  const jobs = useSelector(state => state.job.jobs);

  const auction = auctions.find(a => a._id === auctionId);
  const job = auction ? jobs.find(j => j._id === auction.job_id) : null;

  return (
    <div className='flex justify-center items-start gap-10 w-full max-w-[1200px] mt-2'>
      {/* Sidebar */}
      <div className="w-1/6 p-5 mt-10 h-full overflow-y-auto border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {/* Content */}
      <div className='flex justify-center items-start w-full max-w-[1200px]'>
        <div className="w-5/6 p-5 flex flex-col justify-start overflow-y-auto">
          {auction ? (
            <div className="p-5 border rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">Auction Details</h2>
              <p><strong>Price:</strong> {auction.price}₺</p>

              {job ? (
                <>
                  <h3 className="text-xl font-semibold mt-6 mb-2">Job Details</h3>
                  <p><strong>Title:</strong> {job.title}</p>
                  <p><strong>Short Description:</strong> {job.short_description}</p>
                  <p><strong>Long Description:</strong> {job.long_description}</p>
                  <p><strong>Price Range:</strong> {job.min_price}₺ - {job.max_price}₺</p>
                  <p><strong>Duration:</strong> {job.duration}</p>
                </>
              ) : (
                <p>Job details not found.</p>
              )}
            </div>
          ) : (
            <p>Auction not found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page;