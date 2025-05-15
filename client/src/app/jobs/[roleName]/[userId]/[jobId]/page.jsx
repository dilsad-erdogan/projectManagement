"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import jobServices from "@/services/job";
import auctionServices from "@/services/auction";
import userServices from "@/services/user";
import Sidebar from '@/components/Sidebar';

const Page = () => {
    const { roleName, userId, jobId } = useParams();
    const [job, setJob] = useState(null);
    const [auctions, setAuctions] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await jobServices.byId(jobId);
                setJob(data.data);
            } catch (error) {
                console.error("Failed to fetch job:", error);
            }
        };

        if (jobId) fetchJob();
    }, [jobId]);

    // Auction ve User çek
    useEffect(() => {
        const fetchAuctionsAndUsers = async () => {
            try {
                const allAuctions = await auctionServices.get();
                const allUsers = await userServices.get();

                const relatedAuctions = allAuctions.data.filter(a => a.job_id === jobId);
                const sortedAuctions = relatedAuctions.sort((a, b) => a.price - b.price);

                setAuctions(sortedAuctions);
                setUsers(allUsers.data);
            } catch (error) {
                console.error("Failed to fetch auctions or users:", error);
            }
        };

        if (job && !job.starting_state) {
            fetchAuctionsAndUsers();
        }
    }, [job, jobId]);

    const handleSelectAuction = async (auctionId) => {
        try {
            await auctionServices.updateApproval(auctionId, { approval_state: true });
            await jobServices.updateStartingState(jobId, { starting_state: true });
            setMessage("The auction was successfully approved and the work was started.");
        } catch (error) {
            console.error("The auction could not be confirmed.:", error);
            setMessage("The auction could not be confirmed.");
        }
    };

    const getDeveloperName = (developerId) => {
        const developer = users.find(user => user._id === developerId);
        return developer ? `${developer.name} ${developer.surname}` : developerId;
    };

    if (!job) return <p className="p-4">Loading...</p>;

    return (
        <div className='flex justify-center items-start gap-10 w-full max-w-[1200px] mt-2'>
            {/* Sidebar */}
            <div className="w-1/6 p-5 mt-10 h-full overflow-y-auto border-r border-black dark:border-white">
                <Sidebar roleName={roleName} userId={userId} />
            </div>

            {/* Content */}
            <div className='flex justify-center items-start w-full max-w-[1200px]'>
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
                    <p className="text-gray-600 mb-2">{job.short_description}</p>
                    <p className="text-gray-700 mb-4">{job.long_description}</p>
                    <p className="text-sm text-gray-500">Min Price: {job.min_price}₺</p>
                    <p className="text-sm text-gray-500">Max Price: {job.max_price}₺</p>
                    <p className="text-sm text-gray-500">Duration: {job.duration}</p>
                    <p className="text-sm text-gray-500">Difficulty: {job.difficulty_state ? "Difficult" : "Easy"}</p>

                    {/* Auctions */}
                    {!job.starting_state && auctions.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Auctions</h2>
                            <ul className="space-y-4">
                                {auctions.map((auction) => (
                                    <li key={auction._id} className="border p-4 rounded shadow-sm flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-700">Developer ID: {getDeveloperName(auction.developer_id)}</p>
                                            <p className="text-sm text-gray-700">Price: {auction.price}₺</p>
                                        </div>
                                        <button onClick={() => handleSelectAuction(auction._id)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Seç</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {message && <p className="mt-4 text-green-600">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Page;