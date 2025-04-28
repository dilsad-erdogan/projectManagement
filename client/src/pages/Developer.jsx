import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; 

const Developer = ({ userId }) => {
  const router = useRouter();

  // Auctions
  const auctions = useSelector(state => state.auction.auctions);
  const myAuctions = auctions.filter(auction => auction.developer_id === userId);

  // Period
  const periods = useSelector(state => state.period.periods);
  const myPeriods = periods.filter(period => period.developer_id === userId);

  // Agreement
  const agreements = useSelector(state => state.agreement.agreements);
  const myAgreements = agreements.filter(agreement => agreement.developer_id === userId);

  // Job
  const jobs = useSelector(state => state.job.jobs);
  const myJobIdsFromAgreements = myAgreements.map(a => a.job_id);
  const myJobsFromAgreements = jobs.filter(job => myJobIdsFromAgreements.includes(job._id));

  return (
    <div className="flex flex-col gap-10 justify-center mt-10 max-w-3xl mx-auto">
      {/* Auctions section */}
      <div className='p-5 border rounded-2xl text-start'>
        <h2 className='text-2xl font-bold mb-4'>Auctions I attended</h2>
        {myAuctions.length > 0 ? (
          myAuctions.map((auction) => (
            <div key={auction._id} className='p-4 mb-2 border rounded-xl cursor-pointer hover:shadow-lg hover:bg-gray-100 transition' onClick={() => router.push(`/auction-detail/${auction._id}`)}>
              <p><strong>Job Title:</strong> {auction.job_id}</p>
              <p><strong>Price:</strong> {auction.price}₺</p>
            </div>
          ))
        ) : (
          <p>No auctions attended yet.</p>
        )}
      </div>

      {/* Periods section */}
      <div className='p-5 border rounded-2xl text-start'>
        <h2 className='text-2xl font-bold mb-4'>My project processes</h2>
        {myPeriods.length > 0 ? (
          myPeriods.map((period) => (
            <div key={period._id} className='p-4 mb-2 border rounded-xl cursor-pointer hover:shadow-lg hover:bg-gray-100 transition' onClick={() => router.push(`/period-detail/${period._id}`)}>
              <p><strong>Job Title:</strong> {period.job_id}</p>
              <p className="break-words"><strong>Contract:</strong> {period.contract}</p>
              <p><strong>Price:</strong> {period.price}</p>
              <p><strong>Revised State:</strong> {period.revised_state ? (<span>True</span>) : (<span>False</span>)}</p>
              <p className="break-words"><strong>Revised:</strong> {period.revised}</p>
            </div>
          ))
        ) : (
          <p>No project processes available.</p>
        )}
      </div>

      {/* Jobs section */}
      <div className='p-5 border rounded-2xl text-start'>
        <h2 className='text-2xl font-bold mb-4'>The jobs I got</h2>
        {myJobsFromAgreements.length > 0 ? (
          myJobsFromAgreements.map((job) => (
            <div key={job._id} className='p-4 mb-2 border rounded-xl cursor-pointer hover:shadow-lg hover:bg-gray-100 transition' onClick={() => router.push(`/job-detail/${job._id}`)}>
              <p><strong>Title:</strong> {job.title}</p>
              <p><strong>Short Description:</strong> {job.short_description}</p>
              <p><strong>Long Description:</strong> {job.long_description}</p>
              <p><strong>Price Range:</strong> {job.min_price}₺ - {job.max_price}₺</p>
              <p><strong>Duration:</strong> {job.duration}</p>
            </div>
          ))
        ) : (
          <p>No jobs acquired yet.</p>
        )}
      </div>
    </div>
  )
}

export default Developer;