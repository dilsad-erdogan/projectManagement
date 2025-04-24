"use client";

import Sidebar from '@/components/Sidebar';
import Customer from '@/pages/Customer';
import Developer from '@/pages/Developer';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
  const params = useParams();
  const { roleName, userId } = params;

  return (
    <div className='flex justify-center items-center gap-10 w-full max-w-[1200px] mt-2'>
      {/* Sidebar */}
      <div className="w-1/6 p-5 overflow-y-auto border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {/* Content */}
      <div className='flex justify-center items-center w-full max-w-[1200px]'>
        <div className="w-5/6 p-5 flex flex-col justify-center overflow-y-auto">
          {roleName === "customer" ? (<Customer />) : (<Developer />)}
        </div>
      </div>
    </div>
  )
}

export default page