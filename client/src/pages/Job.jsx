import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaCheck, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import auctionServices from '../services/auction';

const Job = () => {
  const { id } = useParams();
  const jobs = useSelector(state => state.job.jobs);
  const job = jobs.find(data => data._id === id);
  const users = useSelector(state => state.user.users);
  const customer = users.find(user => user._id === job.customer_id);
  const auctions = useSelector(state => state.auction.auctions);
  const jobAuctions = auctions.filter(auction => auction.job_id === id);
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAuction = { job_id: id, developer_id: "67d35eebb05eacaecf05d407", price: parseInt(price) };
      await auctionServices.add(newAuction);
      alert('Offer submitted successfully!');
      setPrice('');
      window.location.reload(); // Refresh to show updated offers
    } catch (error) {
      alert('Failed to submit offer. Please try again.');
    }
  };

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
          <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder={`Offer between $${job.min_price} - $${job.max_price}`} className='border p-2 rounded-lg w-full' min={job.min_price} max={job.max_price} required />
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