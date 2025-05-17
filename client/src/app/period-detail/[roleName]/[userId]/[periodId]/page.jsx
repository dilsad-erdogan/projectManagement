"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import periodServices from '@/services/period';

const page = () => {
  const params = useParams();
  const { roleName, userId, periodId } = params;

  const periods = useSelector(state => state.period.periods);
  const jobs = useSelector(state => state.job.jobs);

  const period = periods.find(a => a._id === periodId);
  const job = period ? jobs.find(j => j._id === period.job_id) : null;

  const [editedRevised, setEditedRevised] = useState(period?.revised || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateRevised = async () => {
    try {
      await periodServices.updateRevised(period._id, { revised: editedRevised });
      setIsEditing(false);
    } catch (err) {
      console.error('Revision update error:', err);
    }
  };

  const handleApproveRevised = async () => {
    try {
      await periodServices.updateContract(period._id, { contract: period.revised });
      await periodServices.updateRevised(period._id, { revised: "" });
      await periodServices.updateRevisedState(period._id, { revised_state: false });
    } catch (err) {
      console.error('Approve revision error:', err);
    }
  };

  return (
    <div className='flex justify-center items-start gap-10 w-full max-w-[1200px] mt-2'>
      {/* Sidebar */}
      <div className="w-1/6 p-5 mt-10 h-full overflow-y-auto border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {/* Content */}
      <div className='flex justify-center items-start w-full max-w-[1200px]'>
        <div className="w-5/6 p-5 flex flex-col justify-start overflow-y-auto">
          {period ? (
            <div className="p-5 border rounded-2xl cursor-pointer">
              <h2 className="text-2xl font-bold mb-4">Period Details</h2>
              <p><strong>Price:</strong> {period.price}₺</p>
              <p><strong>Approval State:</strong> {period.approval_state ? (<span>True</span>) : (<span>False</span>)}</p>
              <p><strong>Contract:</strong> {period.contract}</p>

              {job ? (
                <>
                  <h3 className="text-xl font-semibold mt-6 mb-2">Job Details</h3>
                  <p><strong>Title:</strong> {job.title}</p>
                  <p><strong>Short Description:</strong> {job.short_description}</p>
                  <p><strong>Long Description:</strong> {job.long_description}</p>
                  <p><strong>Price Range:</strong> {job.min_price}₺ - {job.max_price}₺</p>
                  <p><strong>Duration:</strong> {job.duration}</p>
                </>
              ) : (
                <p>Job details not found.</p>
              )}

              {period.revised_state && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Revision Requested</h3>

                  {isEditing ? (
                    <div>
                      <textarea
                        className="w-full h-32 p-2 border rounded"
                        value={editedRevised}
                        onChange={(e) => setEditedRevised(e.target.value)}
                      />
                      <div className="mt-2 flex gap-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleUpdateRevised}>
                          Save Revision
                        </button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setIsEditing(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="whitespace-pre-wrap border p-2 rounded">{period.revised}</p>
                      <div className="mt-2 flex gap-2">
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => setIsEditing(true)}>
                          Edit Revision
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleApproveRevised}>
                          Approve Revision
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p>Period not found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page