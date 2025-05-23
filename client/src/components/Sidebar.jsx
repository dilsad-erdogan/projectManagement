"use client";

import React from 'react';
import { MdDeveloperMode  } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { logout } from "@/redux/userSlice";
import { useDispatch } from 'react-redux';

const Sidebar = ({ roleName, userId }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
        window.location.href = '/';
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center gap-5" onClick={() => router.push(`/profile/${roleName}/${userId}`)}>
                <FaUserAlt className="text-2xl font-bold" />
                <div className="text-2xl">Profile</div>
            </div>

            <div className="flex items-center gap-5" onClick={() => router.push(`/jobs/${roleName}/${userId}`)}>
                <MdDeveloperMode  className="text-2xl font-bold" />
                <div className="text-2xl">Jobs</div>
            </div>

            <div className="flex gap-2 items-center text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full w-full text-sm p-2 mt-4 px-5 me-2" onClick={handleLogout}>
                <FiLogOut className="text-2xl font-bold" />
                <div className="text-xl">Logout</div>
            </div>
        </div>
    )
}

export default Sidebar