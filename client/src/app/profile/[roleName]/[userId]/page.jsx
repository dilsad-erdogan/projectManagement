"use client";

import React from "react";
import { useParams } from "next/navigation";
import Developer from "../../../../pages/Developer";
import Customer from "../../../../pages/Customer";
import Sidebar from "@/components/Sidebar";

const Profile = () => {
  const params = useParams();
  const { roleName, userId } = params;

  return (
    <div className='flex justify-center items-center gap-10 w-full max-w-[1200px] mt-10'>
      {/* Sidebar */}
      <div className="w-1/6 p-5 overflow-y-auto border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {roleName === "Developer" ? (
        <Developer userId={userId} />
      ) : (
        <Customer userId={userId} />
      )}
    </div>
  );
};

export default Profile;