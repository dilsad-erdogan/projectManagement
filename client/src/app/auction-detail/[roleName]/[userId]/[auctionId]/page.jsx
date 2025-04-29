"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const page = () => {
  const params = useParams();
  const { roleName, userId, auctionId } = params;
  const auctions = useSelector(state => state.auction.auctions);
  const auction = auctions.find(a => a._id === auctionId);

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
              <p><strong>Job Title:</strong> {auction.job_id}</p>
              <p><strong>Developer ID:</strong> {auction.developer_id}</p>
              <p><strong>Price:</strong> {auction.price}₺</p>
            </div>
          ) : (
            <p>Auction not found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page