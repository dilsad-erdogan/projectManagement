"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

const Customer = ({ roleName, userId }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 items-start justify-start mt-10 max-w-3xl mx-auto">
      <button onClick={() => router.push(`/open-job/${roleName}/${userId}`)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Open Job</button>
    </div>
  )
}

export default Customer