"use client";

import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { FaCheck, FaTimes } from "react-icons/fa";
import { useState, useEffect } from 'react';
import auctionServices from '../../../services/auction';

const Job = () => {
  const { id } = useParams();
  const router = useRouter();
  const jobs = useSelector(state => state.job.jobs);
  const users = useSelector(state => state.user.users);
  const auctions = useSelector(state => state.auction.auctions);
  const [price, setPrice] = useState('');

  // Job ve ilgili verileri bul
  const job = jobs.find(data => data._id === id);
  const customer = job ? users.find(user => user._id === job.customer_id) : null;
  const jobAuctions = auctions.filter(auction => auction.job_id === id);

  useEffect(() => {
    if (!job) {
      console.error('Job not found!');
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price) return alert('Please enter a price');
  
    try {
      // localStorage'dan kullanıcıyı al
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const developerId = storedUser?._id;
  
      if (!developerId) {
        alert('User not found. Please log in again.');
        return;
      }
  
      const newAuction = { 
        job_id: id, 
        developer_id: developerId, 
        price: parseInt(price) 
      };
  
      await auctionServices.add(newAuction);
      alert('Offer submitted successfully!');
      setPrice('');
      router.refresh(); // Sayfayı yenile
    } catch (error) {
      alert('Failed to submit offer. Please try again.');
      console.error(error);
    }
  };  

  if (!job) return <div className="text-center p-4">Job not found</div>;

  return (
    <div className='flex flex-row justify-between p-4 gap-6'>
      {/* Left Side - Job Details */}
      <div className='flex flex-col gap-4 w-2/3 bg-white p-4 rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold'>{job.title}</h2>
        <p className='text-lg'>{customer ? `${customer.name} ${customer.surname}` : 'Unknown Customer'}</p>
        <p>{job.short_description}</p>
        <p>{job.long_description}</p>
        <p className='text-sm text-gray-600'>{job.duration}</p>
        <p className='text-sm'>${job.min_price} - ${job.max_price}</p>
        <p className='text-sm text-gray-600 flex items-center gap-2'>
          Difficulty State: {job.difficulty_state ? <FaCheck className='text-green-500' /> : <FaTimes className='text-red-500' />}
        </p>
      </div>

      {/* Right Side - Price Offer and Auctions */}
      <div className='w-1/3 bg-white p-4 rounded-xl shadow-lg flex flex-col items-center'>
        <h3 className='text-xl font-bold mb-4'>Submit Your Offer</h3>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
          <input 
            type='number' 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder={`Offer between $${job.min_price} - $${job.max_price}`} 
            className='border p-2 rounded-lg w-full' 
            min={job.min_price} 
            max={job.max_price} 
            required 
          />
          <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition'>
            Submit Offer
          </button>
        </form>

        {/* Auction List */}
        <div className='mt-6 w-full'>
          <h3 className='text-lg font-bold mb-2'>Offers</h3>
          {jobAuctions.length > 0 ? (
            <ul className='divide-y divide-gray-200'>
              {jobAuctions.map(auction => {
                const developer = users.find(user => user._id === auction.developer_id);
                return (
                  <li key={auction._id} className='py-2 flex justify-between items-center'>
                    <span>{developer ? `${developer.name} ${developer.surname}` : 'Unknown Developer'}</span>
                    <span className='font-bold'>${auction.price}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className='text-gray-500 text-sm'>No offers yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Job;