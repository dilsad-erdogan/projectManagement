"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const page = () => {
    const params = useParams();
    const { roleName, userId, jobId } = params;

    return (
        <div className='flex justify-center items-start gap-10 w-full max-w-[1200px] mt-2'>
            {/* Sidebar */}
            <div className="w-1/6 p-5 mt-10 h-full overflow-y-auto border-r border-black dark:border-white">
                <Sidebar roleName={roleName} userId={userId} />
            </div>

            {/* Content */}
            <div className='flex justify-center items-start w-full max-w-[1200px]'>
                <div className="w-5/6 p-5 flex flex-col justify-start overflow-y-auto">
                    {jobId}
                </div>
            </div>
        </div>
    )
}

export default page