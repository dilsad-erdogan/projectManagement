import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Developer = ({ userId }) => {
  console.log("userId:", userId);
  // Auctions
  const auctions = useSelector(state => state.auction.auctions);
  const myAuctions = auctions.filter(auction => auction.developer_id === userId);

  // Period
  const periods = useSelector(state => state.period.periods);
  const myPeriods = periods.filter(period => period.developer_id === userId);

  //Agreement
  const agreements = useSelector(state => state.agreement.agreements);
  const myAgreements = agreements.filter(agreement => agreement.developer_id === userId);

  // Job
  const jobs = useSelector(state => state.job.jobs);
  const myJobIdsFromAgreements = myAgreements.map(a => a.job_id);
  const myJobsFromAgreements = jobs.filter(job => myJobIdsFromAgreements.includes(job._id));

  useEffect(() => {
    console.log("userId:", userId);
    console.log("Auctions from store:", auctions);
    console.log("Periods from store:", periods);
    console.log("Agreements from store:", agreements);
    console.log("myAuctions:", myAuctions);
    console.log("myPeriods:", myPeriods);
    console.log("myAgreements:", myAgreements);
    console.log("myJobsFromAgreements:", myJobsFromAgreements);
  }, [auctions, jobs, agreements, userId]);

  myAuctions.filter(auction => {
    console.log("auction.developer_id:", auction.developer_id, "userId:", userId);
    return auction.developer_id === userId;
  });

  return (
    <div className="flex justify-center mt-10">
      job developer
    </div>
  )
}

export default Developer