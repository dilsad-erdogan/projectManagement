"use client";

import Sidebar from '@/components/Sidebar';
import Customer from '@/pages/Customer';
import Developer from '@/pages/Developer';
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {
  const params = useParams();
  const { roleName, userId } = params;

  return (
    <div className='flex justify-center items-start gap-10 w-full max-w-[1200px] mt-2'>
      {/* Sidebar */}
      <div className="w-1/6 p-5 mt-10 h-full overflow-y-auto border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {/* Content */}
      <div className='flex justify-center items-start w-full max-w-[1200px]'>
        <div className="w-5/6 p-5 flex flex-col justify-start overflow-y-auto">
          {roleName === "Customer" ? (<Customer roleName={roleName} userId={userId} />) : (<Developer roleName={roleName} userId={userId} />)}
        </div>
      </div>
    </div>
  )
}

export default Page;